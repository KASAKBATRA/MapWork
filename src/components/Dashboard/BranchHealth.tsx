import React from "react";

interface BranchHealthProps {
  metric?: string;
  heatmap?: boolean;
  table?: boolean;
}

const BranchHealth: React.FC<BranchHealthProps> = ({ 
  metric = "health_score", 
  heatmap = true, 
  table = true 
}) => {
  // Mock data for demonstration
  const mockBranches = [
    { name: "New York", health_score: 87, employees: 450, growth: 12 },
    { name: "London", health_score: 92, employees: 320, growth: 8 },
    { name: "Tokyo", health_score: 78, employees: 280, growth: 15 },
    { name: "Singapore", health_score: 95, employees: 180, growth: 22 },
    { name: "Dubai", health_score: 82, employees: 150, growth: 18 },
  ];

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-[#10B981]";
    if (score >= 75) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  const getHealthBg = (score: number) => {
    if (score >= 90) return "bg-[#10B981]/20";
    if (score >= 75) return "bg-[#F59E0B]/20";
    return "bg-[#EF4444]/20";
  };

  return (
    <div className="bg-[#1E293B] rounded-xl p-6 border border-[#164E63] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Branch Health Overview</h3>
      
      {heatmap && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#94A3B8]">Health Score Distribution</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-[#EF4444]/50 rounded"></div>
              <div className="w-4 h-4 bg-[#F59E0B]/50 rounded"></div>
              <div className="w-4 h-4 bg-[#10B981]/50 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {mockBranches.map((branch, index) => (
              <div
                key={index}
                className={`h-8 rounded flex items-center justify-center text-xs font-medium ${
                  branch.health_score >= 90 
                    ? "bg-[#10B981]/50 text-[#10B981]" 
                    : branch.health_score >= 75 
                    ? "bg-[#F59E0B]/50 text-[#F59E0B]"
                    : "bg-[#EF4444]/50 text-[#EF4444]"
                }`}
                title={`${branch.name}: ${branch.health_score}`}
              >
                {branch.name.slice(0, 3)}
              </div>
            ))}
          </div>
        </div>
      )}

      {table && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#164E63]">
                <th className="text-left text-[#94A3B8] pb-2">Branch</th>
                <th className="text-right text-[#94A3B8] pb-2">Health</th>
                <th className="text-right text-[#94A3B8] pb-2">Employees</th>
                <th className="text-right text-[#94A3B8] pb-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              {mockBranches.map((branch, index) => (
                <tr key={index} className="border-b border-[#164E63]/50">
                  <td className="py-2 text-[#F1F5F9]">{branch.name}</td>
                  <td className="py-2 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthBg(branch.health_score)} ${getHealthColor(branch.health_score)}`}>
                      {branch.health_score}
                    </span>
                  </td>
                  <td className="py-2 text-right text-[#F1F5F9]">{branch.employees}</td>
                  <td className="py-2 text-right text-[#10B981]">+{branch.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BranchHealth;
