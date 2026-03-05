import React from 'react';

export default function AiGavelIcon({ size = 24, color = "currentColor", className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill={color} 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="ai-chip-mask">
        <rect x="0" y="0" width="64" height="64" fill="white" />
        <text x="26" y="33" fontSize="16" fontWeight="900" fontFamily="sans-serif, var(--font-inter)" fill="black" textAnchor="middle">Ai</text>
      </mask>

      <g mask="url(#ai-chip-mask)">
        {/* Chip Body */}
        <rect x="14" y="14" width="24" height="24" rx="4" />
        
        {/* Pins Left */}
        <rect x="8" y="18" width="6" height="3" rx="1.5" />
        <rect x="8" y="24.5" width="6" height="3" rx="1.5" />
        <rect x="8" y="31" width="6" height="3" rx="1.5" />
        
        {/* Pins Top */}
        <rect x="18" y="8" width="3" height="6" rx="1.5" />
        <rect x="24.5" y="8" width="3" height="6" rx="1.5" />
        <rect x="31" y="8" width="3" height="6" rx="1.5" />
        
        {/* Pins Bottom */}
        <rect x="18" y="38" width="3" height="6" rx="1.5" />
        <rect x="24.5" y="38" width="3" height="6" rx="1.5" />
      </g>

      {/* Circuit lines */}
      <path d="M 38 18 h 5 l 3 3 v 4" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="27" r="3.5" />

      <path d="M 38 25 h 5 l 4 4 v 5 l 3 3 v 4" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="43" r="3.5" />

      <path d="M 38 31 h 4" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="31" r="3.5" />
      
      {/* Gavel */}
      <g transform="translate(6, 4)">
        {/* Handle */}
        <rect x="8" y="40" width="28" height="8" rx="4" transform="rotate(-30 22 44)" fill={color} />
        {/* Head */}
        <rect x="26" y="22" width="16" height="26" rx="3" transform="rotate(-30 34 35)" fill={color} />
        <rect x="24" y="22" width="2" height="26" rx="1" transform="rotate(-30 34 35)" fill={color} />
        <rect x="42" y="22" width="2" height="26" rx="1" transform="rotate(-30 34 35)" fill={color} />
        {/* Base */}
        <rect x="28" y="52" width="22" height="6" rx="3" fill={color} />
      </g>
    </svg>
  );
}
