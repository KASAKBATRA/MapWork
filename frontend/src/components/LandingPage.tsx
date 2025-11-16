import React, { useState, useEffect } from 'react';
import { Globe, Plane, MapPin, Users, Building2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartNow: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartNow }) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [planePosition, setPlanePosition] = useState(0);
  
  const fullTagline = "Make Your Work Easy, Map It Smartly!";
  
  useEffect(() => {
    // Animate title fade in
    const titleTimer = setTimeout(() => setTitleVisible(true), 1000);
    
    // Typewriter effect for tagline
    const typewriterTimer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullTagline.length) {
          setTypewriterText(fullTagline.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 2000);

    // Animate plane movement
    const planeInterval = setInterval(() => {
      setPlanePosition(prev => (prev + 1) % 100);
    }, 100);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(typewriterTimer);
      clearInterval(planeInterval);
    };
  }, []);

  const workforceData = [
    { country: 'India', employees: 1200, branches: 3, position: { left: '70%', top: '60%' } },
    { country: 'China', employees: 800, branches: 2, position: { left: '75%', top: '45%' } },
    { country: 'Europe', employees: 600, branches: 4, position: { left: '50%', top: '35%' } },
    { country: 'USA', employees: 950, branches: 5, position: { left: '25%', top: '40%' } }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(6,182,212,0.1)_60deg,transparent_120deg)]"></div>
      </div>

      {/* World Map Overlay */}
      <div className="absolute inset-0 opacity-10">
        <Globe className="w-full h-full text-cyan-400" style={{ transform: 'scale(3)' }} />
      </div>

      {/* Flying Plane Animation */}
      <div 
        className="absolute top-1/2 transition-all duration-1000 ease-in-out z-10"
        style={{ 
          left: `${planePosition}%`, 
          transform: 'translateY(-50%)',
          filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.8))'
        }}
      >
        <Plane className="w-8 h-8 text-silver-400 rotate-45" />
        <div className="absolute -top-1 -left-20 w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      </div>

      {/* Workforce Markers */}
      {workforceData.map((location, index) => (
        <div
          key={location.country}
          className="absolute z-20 animate-pulse"
          style={location.position}
        >
          <div className="relative group cursor-pointer">
            <MapPin className="w-6 h-6 text-cyan-400 drop-shadow-lg" />
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-cyan-400/30">
              <div className="text-cyan-400 font-semibold text-sm">{location.country}</div>
              <div className="text-white text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                {location.employees} Employees
              </div>
              <div className="text-white text-xs flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {location.branches} Branches
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Animated Title */}
        <div className={`transition-all duration-2000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-silver-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            MapMyWork 🌍
          </h1>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 max-w-4xl leading-tight">
          Smart Workforce Mapping & Global Analytics
        </h2>

        {/* Typewriter Tagline */}
        <div className="text-xl md:text-2xl text-cyan-300 mb-12 h-8 font-light">
          {typewriterText}
          <span className="animate-pulse">|</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartNow}
          className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xl rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
        >
          <span className="flex items-center gap-3">
            🚀 Start Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-400/20">
            <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Global Mapping</h3>
            <p className="text-gray-300 text-sm">Visualize your workforce across the globe with interactive maps</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-400/20">
            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Smart Analytics</h3>
            <p className="text-gray-300 text-sm">Get insights on skills, demographics, and workforce trends</p>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-400/20">
            <Building2 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Branch Management</h3>
            <p className="text-gray-300 text-sm">Manage multiple locations and track performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;