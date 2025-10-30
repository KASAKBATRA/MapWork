import React from "react";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: number | string;
  delta?: number;
  icon: React.ReactNode;
  sparkData?: number[];
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, delta, icon, sparkData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-[#1E293B] rounded-xl p-6 border border-[#164E63] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-[#94A3B8]">{title}</p>
          <p className="text-3xl font-bold text-[#F1F5F9]">{value}</p>
        </div>
        <div className="text-[#06B6D4]">{icon}</div>
      </div>
      {/* Placeholder for sparkline chart if needed */}
      {sparkData && (
        <div className="h-12">
          {/* Implement sparkline chart here if desired */}
        </div>
      )}
      {delta !== undefined && (
        <p className={`mt-2 text-sm ${delta >= 0 ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
          {delta >= 0 ? "+" : "-"}{Math.abs(delta)}%
        </p>
      )}
    </motion.div>
  );
};

export default KpiCard;
