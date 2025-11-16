import joblib, pandas as pd, numpy as np, re
from typing import Dict

def normalize(s: str) -> str:
    if s is None: return ""
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9\s,.\-/()|]+", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s

class GeoCoder:
    def __init__(self, vec_path="artifacts/tfidf.pkl", nn_path="artifacts/nn.pkl", index_path="artifacts/index.parquet"):
        self.vec = joblib.load(vec_path)
        self.nn  = joblib.load(nn_path)
        self.idx = pd.read_parquet(index_path)

    def predict_one(self, city: str, state: str, country: str, k=5) -> Dict:
        q = normalize(f"{city}|{state}|{country}")
        v = self.vec.transform([q])
        dists, inds = self.nn.kneighbors(v, n_neighbors=k)
        rows = self.idx.iloc[inds[0]][["City","State","Country","Latitude","Longitude"]].reset_index(drop=True)
        weights = 1 - dists[0]  # cosine similarity
        # distance-weighted lat/lon
        lat = float(np.average(rows["Latitude"], weights=weights))
        lon = float(np.average(rows["Longitude"], weights=weights))
        best = rows.iloc[0].to_dict()
        confidence = float(weights[0])
        return {
            "lat": lat, "lon": lon, "confidence": confidence,
            "match_city": best["City"], "match_state": best["State"], "match_country": best["Country"]
        }
