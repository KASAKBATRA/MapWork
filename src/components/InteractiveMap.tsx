import React, { useState, useEffect } from "react";
import UploadPanel from "./UploadPanel";
import MapView from "./MapView";

const InteractiveMap: React.FC = () => {
  const [points, setPoints] = useState<any[]>([]);

  useEffect(() => {
    console.log("InteractiveMap points updated:", points);
  }, [points]);

  const handlePlotClick = () => {
    // Optionally, you can trigger any logic here if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black p-4">
      <UploadPanel onData={setPoints} />
      <button
        onClick={handlePlotClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Plot Points
      </button>
      <div className="mt-6 h-[75vh]">
        <MapView points={points} />
      </div>
    </div>
  );
};

export default InteractiveMap;
