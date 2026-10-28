import React from 'react';
import { Award, Flame, Coffee, Sprout } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2B2B2B] rounded-[2.8rem] p-8 sm:p-12 lg:p-16 border border-[#D4A373]/25 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
                  Direct-Trade South Indian Estates
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAEDCD] tracking-tight leading-[1.12]">
                Sourced at the Farm Gate,{' '}
                <span className="font-editorial italic font-normal text-[#D4A373]">
                  Micro-Roasted in Bandra
                </span>
              </h2>

              <p className="text-[#FAEDCD]/85 text-sm sm:text-base leading-relaxed font-sans-body">
                At <strong>Grey Soul Coffee Roasters</strong>, we believe great coffee starts with genuine respect for origin. We bypass brokers to forge direct, multi-harvest partnerships with generational estate planters across South India: the high Bababudangiri ridges of <strong>Chikmagalur</strong>, the biodynamic rainforest slopes of <strong>Coorg</strong>, and the misty high-altitude red clay hills of <strong>Shevaroys</strong>.
              </p>

              <p className="text-[#FAEDCD]/85 text-sm sm:text-base leading-relaxed font-sans-body">
                In our Bandra West roastery, every harvest is treated as a distinct micro-lot. Using precision cast-iron drum roasters, our roasters craft individualized heat curves that reveal natural orange blossom, wildflower honey, and deep baker’s cocoa rather than scorched uniformity.
              </p>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D4A373]/15">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Coffee className="w-4 h-4 text-[#D4A373]" />
                    <h4 className="text-xs font-bold text-[#FAEDCD] uppercase tracking-wider font-tech">Chikmagalur</h4>
                  </div>
                  <p className="text-xs text-[#FAEDCD]/65 font-editorial italic">Birthplace Arabicas &amp; rich body</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sprout className="w-4 h-4 text-[#D4A373]" />
                    <h4 className="text-xs font-bold text-[#FAEDCD] uppercase tracking-wider font-tech">Coorg</h4>
                  </div>
                  <p className="text-xs text-[#FAEDCD]/65 font-editorial italic">Honey &amp; anaerobic micro-lots</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-[#D4A373]" />
                    <h4 className="text-xs font-bold text-[#FAEDCD] uppercase tracking-wider font-tech">Shevaroys</h4>
                  </div>
                  <p className="text-xs text-[#FAEDCD]/65 font-editorial italic">High elevation florals &amp; citrus</p>
                </div>
              </div>
            </div>

            {/* Bespoke Quote Card with Asymmetric Styling */}
            <div className="lg:col-span-5">
              <div className="bg-[#1E1E1E] rounded-[2.5rem] rounded-tr-[4.5rem] p-8 sm:p-10 border border-[#D4A373]/30 shadow-2xl relative group hover:border-[#D4A373]/60 transition-colors">
                <Flame className="w-8 h-8 text-[#D4A373] mb-6" />
                <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#FAEDCD] font-normal leading-relaxed mb-6">
                  “We don’t roast coffee to a dark, bitter silhouette. We roast to reveal the rain, the soil, the elevation, and the generational hands that nurtured every single cherry.”
                </blockquote>
                <div className="pt-4 border-t border-[#D4A373]/15 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#FAEDCD]">Head Roaster &amp; Sourcing Team</h4>
                    <p className="text-xs text-[#FAEDCD]/60 font-tech">Grey Soul Coffee Roasters · Bandra West</p>
                  </div>
                  <span className="font-tech text-xs font-bold px-3 py-1 rounded-full bg-[#2B2B2B] text-[#D4A373] border border-[#D4A373]/40">
                    Bandra West
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
