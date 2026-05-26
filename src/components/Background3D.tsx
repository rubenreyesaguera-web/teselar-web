'use client';

import React from 'react';

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#031622] overflow-hidden pointer-events-none select-none">
      {/* 
        High-Fidelity 2D SVG Cyber Node Network. 
        Completely static and CSS-driven, yielding absolute zero JavaScript CPU execution overhead 
        and flawless 120fps scrolling speed.
      */}
      <svg 
        viewBox="0 0 1920 1080" 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes svg-pulse-large {
            0%, 100% { opacity: 0.35; r: 4px; }
            50% { opacity: 1; r: 6.5px; }
          }
          @keyframes svg-dash {
            to { stroke-dashoffset: -40; }
          }
          @keyframes svg-spin-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes svg-spin-ccw {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .pulse-dot-large {
            animation: svg-pulse-large 4.5s ease-in-out infinite;
          }
          .dash-flow {
            stroke-dasharray: 6 12;
            animation: svg-dash 25s linear infinite;
          }
          .dash-flow-fast {
            stroke-dasharray: 4 10;
            animation: svg-dash 12s linear infinite;
          }
          .spin-slow-cw {
            animation: svg-spin-cw 100s linear infinite;
          }
          .spin-slow-ccw {
            animation: svg-spin-ccw 120s linear infinite;
          }
        `}} />

        {/* 1. Connecting Network Data Cables (Data streams moving across clusters) */}
        {/* Top Left -> Center Right */}
        <path d="M 300,220 L 700,320 L 1000,250 L 1420,380" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <path d="M 300,220 L 700,320 L 1000,250 L 1420,380" fill="none" stroke="#00BFA5" strokeWidth="0.8" opacity="0.4" className="dash-flow" />

        {/* Bottom Left -> Top Left */}
        <path d="M 450,850 L 320,600 L 150,450 L 150,120" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <path d="M 450,850 L 320,600 L 150,450 L 150,120" fill="none" stroke="#00BFA5" strokeWidth="0.8" opacity="0.35" className="dash-flow-fast" />

        {/* Bottom Left -> Bottom Right */}
        <path d="M 450,850 L 800,900 L 1100,820 L 1320,820" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.2" />
        <path d="M 450,850 L 800,900 L 1100,820 L 1320,820" fill="none" stroke="#00BFA5" strokeWidth="0.8" opacity="0.35" className="dash-flow" />

        {/* Center Right -> Bottom Right */}
        <path d="M 1600,480 L 1550,680 L 1450,880" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.2" />
        <path d="M 1600,480 L 1550,680 L 1450,880" fill="none" stroke="#00BFA5" strokeWidth="0.8" opacity="0.3" className="dash-flow-fast" />

        {/* 2. Top Left Cluster (Center at 300, 220) */}
        <polygon points="150,120 300,220 420,130 280,60" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.4" />
        <line x1="150" y1="120" x2="420" y2="130" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <line x1="300" y1="220" x2="280" y2="60" stroke="#00BFA5" strokeWidth="0.6" opacity="0.45" />
        
        {/* Rotating Circular HUD */}
        <g className="spin-slow-cw" style={{ transformOrigin: '300px 220px' }}>
          <circle cx="300" cy="220" r="45" stroke="#00BFA5" strokeWidth="0.5" strokeDasharray="2 8" fill="none" opacity="0.25" />
          <circle cx="300" cy="220" r="50" stroke="#083C58" strokeWidth="0.5" strokeDasharray="10 40" fill="none" opacity="0.35" />
        </g>
        
        <circle cx="150" cy="120" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="420" cy="130" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="280" cy="60" r="3.5" fill="#00BFA5" opacity="0.7" />
        <circle cx="300" cy="220" r="5" fill="#00BFA5" filter="url(#glow-cyan)" className="pulse-dot-large" style={{ transformOrigin: '300px 220px' }} />
        <text x="315" y="224" fill="#00BFA5" fontFamily="monospace" fontSize="8" letterSpacing="1" opacity="0.45">[ SYS_NODE_01 ]</text>
        <text x="315" y="234" fill="#FFFFFF" fontFamily="monospace" fontSize="7" opacity="0.25">X: 300.22 / Y: 220.08</text>

        {/* 3. Center Right Cluster (Center at 1600, 480) */}
        <polygon points="1420,380 1600,480 1780,360 1580,240" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.4" />
        <line x1="1420" y1="380" x2="1780" y2="360" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <line x1="1600" y1="480" x2="1580" y2="240" stroke="#00BFA5" strokeWidth="0.6" opacity="0.45" />
        
        {/* Rotating Circular HUD Radar */}
        <g className="spin-slow-ccw" style={{ transformOrigin: '1600px 480px' }}>
          <circle cx="1600" cy="480" r="70" stroke="#00BFA5" strokeWidth="0.5" strokeDasharray="3 12" fill="none" opacity="0.25" />
          <circle cx="1600" cy="480" r="80" stroke="#083C58" strokeWidth="0.6" strokeDasharray="15 35" fill="none" opacity="0.35" />
        </g>
        
        <circle cx="1420" cy="380" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="1780" cy="360" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="1580" cy="240" r="3.5" fill="#00BFA5" opacity="0.7" />
        <circle cx="1600" cy="480" r="5" fill="#00BFA5" filter="url(#glow-cyan)" className="pulse-dot-large" style={{ transformOrigin: '1600px 480px' }} />
        <text x="1615" y="484" fill="#00BFA5" fontFamily="monospace" fontSize="8" letterSpacing="1" opacity="0.45">[ CORE_SYS_02 ]</text>
        <text x="1615" y="494" fill="#FFFFFF" fontFamily="monospace" fontSize="7" opacity="0.25">X: 1600.15 / Y: 480.99</text>

        {/* 4. Bottom Left Cluster (Center at 450, 850) */}
        <polygon points="320,780 450,850 580,750 400,680" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.35" />
        <line x1="320" y1="780" x2="580" y2="750" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <line x1="450" y1="850" x2="400" y2="680" stroke="#00BFA5" strokeWidth="0.6" opacity="0.4" />
        
        <g className="spin-slow-cw" style={{ transformOrigin: '450px 850px' }}>
          <circle cx="450" cy="850" r="55" stroke="#00BFA5" strokeWidth="0.5" strokeDasharray="4 10" fill="none" opacity="0.2" />
        </g>
        
        <circle cx="320" cy="780" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="580" cy="750" r="3.5" fill="#083C58" opacity="0.6" />
        <circle cx="400" cy="680" r="3" fill="#00BFA5" opacity="0.6" />
        <circle cx="450" cy="850" r="5" fill="#00BFA5" filter="url(#glow-cyan)" className="pulse-dot-large" style={{ transformOrigin: '450px 850px' }} />
        <text x="465" y="854" fill="#00BFA5" fontFamily="monospace" fontSize="8" letterSpacing="1" opacity="0.45">[ NET_NODE_03 ]</text>
        <text x="465" y="864" fill="#FFFFFF" fontFamily="monospace" fontSize="7" opacity="0.25">X: 450.77 / Y: 850.14</text>

        {/* 5. Bottom Right Cluster (Center at 1450, 880) */}
        <polygon points="1320,820 1450,880 1580,780 1400,740" fill="none" stroke="#083C58" strokeWidth="0.8" opacity="0.35" />
        <line x1="1320" y1="820" x2="1580" y2="780" stroke="#083C58" strokeWidth="0.8" opacity="0.25" />
        <line x1="1450" y1="880" x2="1400" y2="740" stroke="#00BFA5" strokeWidth="0.6" opacity="0.4" />
        
        <circle cx="1320" cy="820" r="3" fill="#083C58" opacity="0.6" />
        <circle cx="1580" cy="780" r="3.5" fill="#083C58" opacity="0.6" />
        <circle cx="1400" cy="740" r="3" fill="#00BFA5" opacity="0.6" />
        <circle cx="1450" cy="880" r="5" fill="#00BFA5" filter="url(#glow-cyan)" className="pulse-dot-large" style={{ transformOrigin: '1450px 880px' }} />
        <text x="1465" y="884" fill="#00BFA5" fontFamily="monospace" fontSize="8" letterSpacing="1" opacity="0.45">[ DATA_LINK_04 ]</text>
        <text x="1465" y="894" fill="#FFFFFF" fontFamily="monospace" fontSize="7" opacity="0.25">X: 1450.41 / Y: 880.35</text>
      </svg>

      {/* Delicate dotted HUD pattern overlay (static cached) */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-teselar-dark/10 via-teselar-dark/35 to-teselar-dark/95 pointer-events-none" />
      
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none cinematic-vignette opacity-80" />
    </div>
  );
};
