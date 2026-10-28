import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const badgeSize =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base sm:text-lg';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Deep Espresso Badge with Warm Roasted Amber Flame & Cream Accents */}
      <div
        className={`${badgeSize} rounded-2xl bg-[#2B2B2B] p-1.5 flex items-center justify-center shadow-lg border border-[#D4A373]/30 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:border-[#D4A373] group-hover:shadow-[0_0_20px_rgba(212,163,115,0.3)] shrink-0`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#D4A373]"
        >
          <circle cx="20" cy="9" r="2.8" fill="#FAEDCD" />
          <path
            d="M 13 16 C 9 20 9 26 13 30 C 17 34 20 34 20 34 C 20 34 20 28 17 22 C 15 18 13 16 13 16 Z"
            fill="#D4A373"
          />
          <path
            d="M 27 16 C 31 20 31 26 27 30 C 23 34 20 34 20 34 C 20 34 20 28 23 22 C 25 18 27 16 27 16 Z"
            fill="#FAEDCD"
            opacity="0.85"
          />
          <path
            d="M 20 13 C 18.5 19 21.5 25 20 33"
            stroke="#1E1E1E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left">
        <span
          className={`font-display font-black ${titleSize} tracking-[0.06em] text-[#FAEDCD] uppercase leading-tight transition-colors`}
        >
          GREY SOUL COFFEE ROASTERS
        </span>
        {showSubtitle && (
          <span className="text-[9px] font-tech font-bold tracking-[0.24em] text-[#D4A373] uppercase mt-0.5">
            Bandra West · Direct-Trade Micro-Roasting
          </span>
        )}
      </div>
    </div>
  );
};
