import React from 'react';

interface LogoProps {
  className?: string;
  badgeSize?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  inverted?: boolean;
}

/**
 * Bespoke Grey Soul Coffee Roasters Brand Lockup:
 * Custom vector monogram featuring the micro-roaster flame and artisanal split bean cleft
 * embedded inside a Deep Espresso badge (#2B2B2B) with Warm Roasted Amber (#D4A373) and Cream Oat (#FAEDCD).
 */
export const MaisonLogo: React.FC<LogoProps> = ({
  className = '',
  badgeSize = 42,
  showWordmark = true,
  wordmarkClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Custom Vector Badge Monogram */}
      <svg
        width={badgeSize}
        height={badgeSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(212,163,115,0.4)]"
      >
        {/* Deep Espresso Card badge background */}
        <rect
          width="48"
          height="48"
          rx="14"
          fill="#2B2B2B"
        />

        {/* Subtle inner edge illumination border */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="13"
          stroke="rgba(250, 237, 205, 0.12)"
          strokeWidth="1.2"
        />

        {/* Warm Roasted Amber outline rim */}
        <rect
          x="0.5"
          y="0.5"
          width="47"
          height="47"
          rx="13.5"
          stroke="#D4A373"
          strokeWidth="0.8"
          strokeOpacity="0.45"
        />

        {/* Stylized flame + artisanal split bean contour */}
        <g transform="translate(10, 10)">
          {/* Left contour in Warm Roasted Amber */}
          <path
            d="M 14 3 C 8 3 4 8 4 14 C 4 20 8 25 14 25 C 13.5 21 12 17 13.5 13 C 14 10 14 6 14 3 Z"
            fill="#D4A373"
          />
          {/* Right contour in Cream Oat */}
          <path
            d="M 14 3 C 20 3 24 8 24 14 C 24 20 20 25 14 25 C 14.5 21 16 17 14.5 13 C 14 10 16 6 14 3 Z"
            fill="#FAEDCD"
            opacity="0.85"
          />
          {/* Central S-Curved Cleft */}
          <path
            d="M 14 2.5 C 11.5 8 16.5 14 13.5 24.5"
            stroke="#1E1E1E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Core Spark */}
          <circle cx="14" cy="7" r="1.8" fill="#FAEDCD" />
        </g>
      </svg>

      {/* Editorial Typographic Lockup */}
      {showWordmark && (
        <div className={`flex flex-col text-left ${wordmarkClassName}`}>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="font-headline text-base sm:text-lg font-black tracking-tight leading-none text-[#FAEDCD]"
            >
              GREY SOUL
            </span>
            <span className="text-[10px] font-tech font-bold text-[#D4A373] tracking-widest uppercase">
              BANDRA WEST
            </span>
          </div>
          <span
            className="text-[9px] tracking-[0.22em] uppercase font-tech mt-1 leading-none text-[#FAEDCD]/75 font-semibold"
          >
            Direct-Trade · Micro-Roasting
          </span>
        </div>
      )}
    </div>
  );
};
