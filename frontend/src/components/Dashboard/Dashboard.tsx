import React, { useState } from "react";
import { LogOut, Globe, Users, Building2, BarChart3, Settings, LineChart, PieChart, FileBarChart2, Upload } from "lucide-react";
import { User } from "../../types/auth";
import { Link, useLocation } from "react-router-dom";
import KpiCard from "./KpiCard";
import WorldMap from "./WorldMap";
import BranchHealth from "./BranchHealth";
import Narrative from "./Narrative";
import UploadPanel from "../UploadPanel";

interface DashboardProps {
  user: User;
  onSignOut: () => void;
}

interface DashboardData {
  kpis: {
    employees_total: number;
    branches_active: number;
    countries_count: number;
    growth_pct: number;
  };
  points: Array<{
    name: string;
    lat: number;
    lng: number;
    employees?: number;
    branches?: number;
    health_score?: number;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSignOut }) => {
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleDataUpload = (points: any[]) => {
    // Process uploaded data to generate KPIs
    const employees_total = points.reduce((sum, point) => sum + (point.employees || 0), 0);
    const branches_active = points.reduce((sum, point) => sum + (point.branches || 0), 0);
    const uniqueCountries = new Set(points.map(point => point.country || point.match_country)).size;
    
    const newData: DashboardData = {
      kpis: {
        employees_total,
        branches_active,
        countries_count: uniqueCountries,
        growth_pct: 12 // This would ideally come from backend or calculation
      },
      points: points.map(point => ({
        name: point.name || point.City || point.match_city || "Unknown",
        lat: point.lat || point.latitude,
        lng: point.lng || point.longitude,
        employees: point.employees,
        branches: point.branches,
        health_score: point.health_score || Math.random() * 20 + 80 // Mock health score
      }))
    };

    setDashboardData(newData);
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <header className="bg-[#111827CC] backdrop-blur-sm border-b border-[#164E63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-[#06B6D4]" />
              <h1 className="text-2xl font-bold text-[#F1F5F9]">MapMyWork</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] hover:bg-[#0891B2] text-[#F1F5F9] rounded-lg transition-colors duration-200"
              >
                <Upload className="w-4 h-4" />
                Upload Data
              </button>
              <div className="text-right">
                <p className="text-[#F1F5F9] font-medium">{user.name}</p>
                <p className="text-[#94A3B8] text-sm">{user.company}</p>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-[#F1F5F9] rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {showUpload && (
        <div className="bg-[#1E293B] border-b border-[#164E63] p-4">
          <div className="max-w-7xl mx-auto">
            <UploadPanel onData={handleDataUpload} />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#111827CC] backdrop-blur-sm border-r border-[#164E63] min-h-screen">
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    location.pathname === "/" ? "text-[#06B6D4] bg-[#06B6D4]/10" : "text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/interactive-map"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    location.pathname === "/interactive-map" ? "text-[#06B6D4] bg-[#06B6D4]/10" : "text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10"
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link
                  to="/branch-map"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    location.pathname === "/branch-map" ? "text-[#06B6D4] bg-[#06B6D4]/10" : "text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10"
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  Branch Map
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors duration-200">
                  <PieChart className="w-5 h-5" />
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors duration-200">
                  <FileBarChart2 className="w-5 h-5" />
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#94A3B8] hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {!dashboardData ? (
              <div className="text-center py-16">
                <Upload className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">No Data Available</h3>
                <p className="text-[#94A3B8] mb-6">Upload an Excel file to visualize your workforce data</p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-6 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-[#F1F5F9] rounded-lg transition-colors duration-200"
                >
                  Upload Your First Dataset
                </button>
              </div>
            ) : (
              <>
                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <KpiCard
                    title="Total Employees"
                    value={dashboardData.kpis.employees_total}
                    delta={8}
                    icon={<Users className="w-8 h-8" />}
                  />
                  <KpiCard
                    title="Active Branches"
                    value={dashboardData.kpis.branches_active}
                    delta={4}
                    icon={<Building2 className="w-8 h-8" />}
                  />
                  <KpiCard
                    title="Countries"
                    value={dashboardData.kpis.countries_count}
                    delta={1}
                    icon={<Globe className="w-8 h-8" />}
                  />
                  <KpiCard
                    title="Growth Rate"
                    value={`${dashboardData.kpis.growth_pct}%`}
                    delta={2}
                    icon={<LineChart className="w-8 h-8" />}
                  />
                </div>

                {/* Map Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <WorldMap points={dashboardData.points} clustering={true} legend="density" />
                  <BranchHealth metric="health_score" heatmap={true} table={true} />
                </div>

                {/* Insights Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Narrative title="AI Insights" source="insights_text" />
                  <div className="bg-[#1E293B] rounded-xl p-6 border border-[#164E63] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                    <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Data Summary</h3>
                    <div className="space-y-3 text-[#94A3B8]">
                      <div className="flex justify-between">
                        <span>Total Locations:</span>
                        <span className="text-[#F1F5F9]">{dashboardData.points.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Employees per Location:</span>
                        <span className="text-[#F1F5F9]">
                          {Math.round(dashboardData.kpis.employees_total / dashboardData.points.length)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Last Updated:</span>
                        <span className="text-[#F1F5F9]">Just now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
