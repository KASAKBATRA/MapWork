import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Point {
  name: string;
  lat: number;
  lng: number;
  employees?: number;
  branches?: number;
  health_score?: number;
}

interface WorldMapProps {
  points: Point[];
  clustering?: boolean;
  legend?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ points, clustering = true, legend = "density" }) => {
  return (
    <div className="bg-[#1E293B] rounded-xl p-6 border border-[#164E63] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Global Workforce Distribution</h3>
      <MapContainer 
        center={[20, 77]} 
        zoom={4} 
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {points.map((point, idx) => (
          <Marker key={idx} position={[point.lat, point.lng]}>
            <Popup>
              <div className="text-[#0F172A]">
                <b className="text-lg">{point.name}</b><br/>
                {point.employees && <span>Employees: {point.employees}</span>}<br/>
                {point.branches && <span>Branches: {point.branches}</span>}<br/>
                {point.health_score && <span>Health Score: {point.health_score.toFixed(1)}</span>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {legend === "density" && (
        <div className="mt-4 flex items-center justify-center text-sm text-[#94A3B8]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#06B6D4] rounded-full"></div>
            <span>Low Density</span>
            <div className="w-4 h-4 bg-[#0891B2] rounded-full"></div>
            <span>Medium Density</span>
            <div className="w-5 h-5 bg-[#0E7490] rounded-full"></div>
            <span>High Density</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
