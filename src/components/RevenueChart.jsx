import React from 'react';

export function RevenueChart() {
  const viewBoxWidth = 1100;
  const viewBoxHeight = 550;

  return (
    <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[480px] w-full">
      <div className="flex items-center justify-between mb-2 relative z-20">
        <h3 className="text-2xl font-semibold text-white tracking-wide">Revenue Trajectory</h3>
        <div className="flex items-center gap-5 text-[13px] font-semibold tracking-wide">
          <div className="flex items-center gap-2 text-[#E2E8F0]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EADDFF] border-[1.5px] border-[#12121A]"></span>
            Actual
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#4A4A5A] border-[1.5px] border-[#12121A]"></span>
            Projected
          </div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="flex-1 relative w-full h-full min-h-[350px] mt-4">
        
        {/* SVG Area */}
        <div className="absolute inset-0 z-10">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BB86FC" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#BB86FC" stopOpacity="0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Y Axis Labels (Embedded in SVG) */}
            <g fill="#94A3B8" fontSize="14" fontWeight="500">
              <text x="0" y="10">2M</text>
              <text x="0" y="130">1.5M</text>
              <text x="0" y="255">1M</text>
              <text x="0" y="380">500k</text>
              <text x="0" y="500">0</text>
            </g>

            {/* X Axis Labels (Embedded in SVG) */}
            <g fill="#94A3B8" fontSize="14" fontWeight="500" textAnchor="middle">
              <text x="50" y="540" textAnchor="start">Mar</text>
              <text x="250" y="540">Apr</text>
              <text x="450" y="540">May</text>
              <text x="650" y="540">Jun</text>
              <text x="850" y="540">Jul</text>
              <text x="1050" y="540" textAnchor="end">Aug</text>
            </g>

            {/* Horizontal Grid Lines */}
            <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1">
              <line x1="50" y1="0" x2="1050" y2="0" />
              <line x1="50" y1="125" x2="1050" y2="125" />
              <line x1="50" y1="250" x2="1050" y2="250" />
              <line x1="50" y1="375" x2="1050" y2="375" />
              <line x1="50" y1="500" x2="1050" y2="500" />
            </g>

            {/* Vertical Grid Lines */}
            <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1">
              <line x1="50" y1="0" x2="50" y2="500" />
              <line x1="250" y1="0" x2="250" y2="500" />
              <line x1="450" y1="0" x2="450" y2="500" />
              <line x1="650" y1="0" x2="650" y2="500" />
              <line x1="850" y1="0" x2="850" y2="500" />
              <line x1="1050" y1="0" x2="1050" y2="500" />
            </g>

            {/* Dark Polygonal "Projected" Background Fill */}
            <polygon 
              points="50,450 250,410 450,310 650,340 850,260 1050,240 1050,500 50,500" 
              fill="#1C1C24" 
              opacity="0.6"
            />

            {/* Purple Gradient under curve */}
            <path 
              d="M 50 400 C 150 380, 200 340, 250 340 C 350 340, 350 180, 450 180 C 550 180, 550 300, 650 300 C 750 300, 800 140, 850 140 C 900 140, 930 70, 970 70 L 970 500 L 50 500 Z" 
              fill="url(#purpleGradient)" 
            />

            {/* The Main Glowing Purple Line */}
            <path 
              d="M 50 400 C 150 380, 200 340, 250 340 C 350 340, 350 180, 450 180 C 550 180, 550 300, 650 300 C 750 300, 800 140, 850 140 C 900 140, 930 70, 970 70" 
              fill="none" 
              stroke="#BB86FC" 
              strokeWidth="5"
              filter="url(#neonGlow)"
            />

            {/* The Hollow Dots on Grid Intersections */}
            <circle cx="250" cy="340" r="7" fill="#12121A" stroke="#BB86FC" strokeWidth="4" />
            <circle cx="450" cy="180" r="7" fill="#12121A" stroke="#BB86FC" strokeWidth="4" />
            <circle cx="650" cy="300" r="7" fill="#12121A" stroke="#BB86FC" strokeWidth="4" />
            <circle cx="850" cy="140" r="7" fill="#12121A" stroke="#BB86FC" strokeWidth="4" />

            {/* Active White Highlight Dot */}
            <circle cx="970" cy="70" r="5" fill="#ffffff" filter="url(#neonGlow)" />

            {/* Downward White Arrow / Projected Line */}
            <path d="M 990 70 Q 1000 120 1010 130" fill="none" stroke="#ffffff" strokeWidth="3" />
            <polygon points="1003,125 1018,125 1012,135" fill="#ffffff" />

            {/* The Custom Tooltip Rectangle */}
            <g transform="translate(910, 10)">
              <rect x="-30" y="0" width="80" height="46" rx="4" fill="#252530" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
              <text x="10" y="22" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">₹1.8M</text>
              <text x="10" y="38" fill="#94A3B8" fontSize="11" textAnchor="middle">Aug 24</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
