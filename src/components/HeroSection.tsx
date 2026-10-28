import React from 'react';
import { ArrowDown, MessageCircle, Coffee, Flame, Award, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { HeroCoffeeCanvas } from './3d/HeroCoffeeCanvas';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderWhatsApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOrderWhatsApp,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Headline, Subtext, Asymmetrical Badges & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            {/* Header Badge: Editorial Offset Stamp */}
            <div className="flex items-center gap-2.5 mb-5 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B2B2B] border border-[#D4A373]/30 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
                <span className="text-[11px] font-tech font-bold uppercase tracking-[0.22em] text-[#D4A373]">
                  Roastery &amp; Tasting Room Open Daily: 08:00 AM – 10:00 PM
                </span>
              </div>
              <span className="text-[10px] font-tech text-[#FAEDCD]/70 uppercase tracking-widest hidden sm:inline">
                · Bandra West, Mumbai
              </span>
            </div>

            {/* Brand Heading with Tight Geometric Kerning */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#FAEDCD] leading-[1.05] mb-5 text-balance">
              GREY SOUL COFFEE ROASTERS <span className="text-[#D4A373] block sm:inline">— BANDRA WEST</span>
            </h1>

            {/* Core Value Proposition Highlight */}
            <div className="p-4 rounded-2xl bg-[#2B2B2B]/90 border-l-4 border-l-[#D4A373] border-y border-r border-[#D4A373]/20 mb-6 backdrop-blur-sm shadow-md">
              <p className="font-headline font-bold text-base sm:text-lg text-[#FAEDCD] leading-snug">
                Direct-Trade Single-Origin Indian Beans &amp; Artisanal Micro-Roasting.
              </p>
              <p className="font-editorial italic text-xs sm:text-sm text-[#FAEDCD]/75 mt-1.5">
                Every cherry traceable to generational South Indian estates in Chikmagalur, Coorg, and Shevaroys.
              </p>
            </div>

            {/* Editorial Description */}
            <p className="font-sans-body text-sm sm:text-base text-[#FAEDCD]/80 leading-relaxed mb-8 max-w-xl">
              We roast small 5kg–12kg lots on cast-iron drums in Bandra West to preserve crisp stone fruit acidity, jasmine aromatics, and rich baker’s cocoa. Poured across our manual slow-brew bar with obsessive craft.
            </p>

            {/* Human Polish CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              {/* Primary CTA in Warm Roasted Amber */}
              <button
                onClick={onExploreMenu}
                className="btn-tactile px-8 py-4 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 border border-[#D4A373] shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                <span>Explore Menu &amp; Retail Beans</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              {/* Secondary CTA in Deep Espresso */}
              <button
                onClick={onOrderWhatsApp}
                className="btn-tactile px-8 py-4 rounded-2xl bg-[#2B2B2B] hover:bg-[#343434] text-[#FAEDCD] font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] border border-[#D4A373]/30 hover:border-[#D4A373]/60 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#D4A373]" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Asymmetrical Key Highlights with Varied Heights & Offset Accents */}
            <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-[#D4A373]/20">
              {/* Card 1: Estates */}
              <div className="bg-[#2B2B2B] rounded-2xl p-4 border border-[#D4A373]/25 flex flex-col justify-between shadow-md">
                <div className="flex items-center gap-1.5 text-[#D4A373] mb-1">
                  <Coffee className="w-4 h-4 text-[#D4A373]" />
                  <span className="font-headline text-lg font-black text-[#FAEDCD]">3 Estates</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold text-[#D4A373]">Direct-Trade</div>
                  <div className="text-[10px] text-[#FAEDCD]/60 font-tech">Chikmagalur · Coorg · Shevaroys</div>
                </div>
              </div>

              {/* Card 2: Micro-Roasting (Offset slightly higher) */}
              <div className="bg-[#2B2B2B] rounded-2xl p-4 border border-[#D4A373]/40 flex flex-col justify-between sm:-translate-y-1.5 shadow-md">
                <div className="flex items-center gap-1.5 text-[#D4A373] mb-1">
                  <Flame className="w-4 h-4 text-[#D4A373]" />
                  <span className="font-headline text-lg font-black text-[#FAEDCD]">Small-Batch</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold text-[#D4A373]">Cast-Iron Drums</div>
                  <div className="text-[10px] text-[#FAEDCD]/60 font-tech">Fresh Weekly in Bandra</div>
                </div>
              </div>

              {/* Card 3: Tasting Bar */}
              <div className="bg-[#2B2B2B] rounded-2xl p-4 border border-[#D4A373]/25 flex flex-col justify-between shadow-md">
                <div className="flex items-center gap-1.5 text-[#D4A373] mb-1">
                  <Award className="w-4 h-4 text-[#D4A373]" />
                  <span className="font-headline text-lg font-black text-[#FAEDCD]">88+ SCA</span>
                </div>
                <div>
                  <div className="text-xs font-headline font-bold text-[#D4A373]">Manual Tasting Bar</div>
                  <div className="text-[10px] text-[#FAEDCD]/60 font-tech">Aeropress, V60 &amp; Tonics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-6 relative">
            <HeroCoffeeCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
