import pandas as pd, numpy as np, re, joblib, os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

def normalize(s: str) -> str:
    if s is None: return ""
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9\s,.\-/()|]+", " ", s)  # keep basics
    s = re.sub(r"\s+", " ", s)
    return s

# 1) Load your master file
df = pd.read_excel("world_locations.xlsx")  # needs columns: City, State, Country, Latitude, Longitude

# 2) Build query string and clean
for col in ["City","State","Country"]:
    if col not in df.columns: df[col] = ""
df[["City","State","Country"]] = df[["City","State","Country"]].fillna("")
df["q"] = (df["City"] + "|" + df["State"] + "|" + df["Country"]).map(normalize)

# 3) Vectorizer (char n-grams are robust to typos)
vec = TfidfVectorizer(analyzer="char", ngram_range=(3,5), min_df=2)
X = vec.fit_transform(df["q"])

# 4) NearestNeighbors index on vectors
nn = NearestNeighbors(n_neighbors=5, metric="cosine")
nn.fit(X)

# 5) Save artifacts
os.makedirs("artifacts", exist_ok=True)
joblib.dump(vec, "artifacts/tfidf.pkl")
joblib.dump(nn,  "artifacts/nn.pkl")
df[["q","City","State","Country","Latitude","Longitude"]].to_parquet("artifacts/index.parquet", index=False)

print("Artifacts saved in artifacts/")
