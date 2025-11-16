import os, io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from geocoder import GeoCoder
from dotenv import load_dotenv

# Optional: Supabase
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="MapMyWork Geocoder")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

geocoder = GeoCoder()  # loads artifacts at startup

class RowIn(BaseModel):
    city: Optional[str] = ""
    state: Optional[str] = ""
    country: Optional[str] = ""
    employees: Optional[float] = None
    branches: Optional[float] = None
    meta: Optional[dict] = None

@app.post("/predict-rows")
def predict_rows(rows: List[RowIn]):
    out = []
    for r in rows:
        pr = geocoder.predict_one(r.city, r.state, r.country)
        item = {**r.dict(), "latitude": pr["lat"], "longitude": pr["lon"], "confidence": pr["confidence"],
                "match_city": pr["match_city"], "match_state": pr["match_state"], "match_country": pr["match_country"]}
        out.append(item)
    return {"count": len(out), "rows": out}

@app.post("/upload-excel")
async def upload_excel(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".xlsx", ".xls", ".csv")):
        raise HTTPException(status_code=400, detail="Upload .xlsx/.xls/.csv only")
    content = await file.read()
    buf = io.BytesIO(content)
    if file.filename.lower().endswith(".csv"):
        df = pd.read_csv(buf)
    else:
        df = pd.read_excel(buf)

    needed = ["City","State","Country"]
    for c in needed:
        if c not in df.columns: df[c] = ""

    # Predict
    rows_in = [RowIn(city=row["City"], state=row["State"], country=row["Country"],
                     employees=row.get("Employees"), branches=row.get("Branches"))
               for _, row in df.fillna("").iterrows()]
    result = predict_rows(rows_in)

    # Merge original data with geocoding results
    enriched_rows = []
    for original_row, geocoded_row in zip(df.fillna(" ").to_dict(orient="records"), result["rows"]):
        merged = {**original_row, **geocoded_row}
        enriched_rows.append(merged)

    # Optional: store to Supabase
    if supabase:
        # Create a table `workforce_points` beforehand in Supabase (see SQL below)
        supabase.table("workforce_points").upsert(enriched_rows).execute()

    return {"count": len(enriched_rows), "rows": enriched_rows}
