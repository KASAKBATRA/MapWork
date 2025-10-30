import React from "react";
import axios from "axios";

interface BackendRow {
  City: string;
  State: string;
  Country: string;
  Employees?: number;
  Branches?: number;
  latitude: number;
  longitude: number;
  confidence: number;
  match_city: string;
  match_state: string;
  match_country: string;
}

interface BackendResponse {
  count: number;
  rows: BackendRow[];
}

interface Point {
  name: string;
  lat: number;
  lng: number;
  employees?: number;
  branches?: number;
}

interface UploadPanelProps {
  onData: (points: Point[]) => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ onData }) => {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // 👇 Axios me type define kar diya
      const res = await axios.post<BackendResponse>(
        "http://localhost:8000/upload-excel",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Ab TypeScript ko pata hai res.data.rows ka type kya hai
      const parsedPoints: Point[] = res.data.rows.map((row) => ({
        name: row.City || row.match_city || "Unknown",
        lat: row.latitude,
        lng: row.longitude,
        employees: row.Employees,
        branches: row.Branches,
        country: row.Country || row.match_country || "Unknown"
      }));

      onData(parsedPoints);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} />
    </div>
  );
};

export default UploadPanel;
