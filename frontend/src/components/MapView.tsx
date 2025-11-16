// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


type Point = {
  latitude: number;
  longitude: number;
  [key: string]: any;
};

export default function MapView({ points = [] }: { points?: Point[] }) {
  console.log("MapView points prop:", points);
  return (
    <MapContainer center={[20, 77]} zoom={4} style={{ height: "75vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />


      {points.map((point, idx) => (
        <Marker key={idx} position={[point.lat, point.lng]}>
          <Popup>
            <b>{point.name}</b><br/>
            Employees: {point.employees}<br/>
            Branches: {point.branches}
            </Popup>
        </Marker>
      ))}

      {points.filter((p) => p.latitude && p.longitude).map((p, i) => (
        <Marker key={i} position={[p.latitude, p.longitude]}>
          <Popup>
            {Object.entries(p).map(([key, value]) => {
              if (key === "latitude" || key === "longitude") return null;
              if (value === null || value === undefined || value === "") return null;
              if (typeof value === "number") {
                if (key === "confidence") {
                  value = value.toFixed(2);
                }
              }
              return (
                <div key={key}>
                  <b>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:</b> {value.toString()}
                </div>
              );
            })}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
