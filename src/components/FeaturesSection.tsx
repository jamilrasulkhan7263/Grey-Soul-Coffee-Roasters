import React from 'react';
import { Flame, Compass, Check, ArrowRight, Coffee, Sparkles } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  accentColor: string;
}

export const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: 'direct-trade',
      title: 'Direct-Trade Indian Estates',
      tagline: 'Terroir & Transparency',
      description:
        'We bypass middlemen to partner directly with generational coffee planters in Chikmagalur, Coorg, and the Shevaroy Hills, paying above Fairtrade price premiums for meticulous hand-sorting.',
      icon: <Coffee className="w-6 h-6 text-[#D4A373]" />,
      accentColor: '#D4A373',
      highlights: [
        'Single-estate Arabicas (Bababudangiri, Kodagu, Yercaud)',
        'Full traceability from harvest elevation to roast curve',
        'Direct planter partnerships & sustainable farm equity',
      ],
    },
    {
      id: 'micro-roasting',
      title: 'Artisanal Small-Batch Roasting',
      tagline: '5kg–12kg Cast-Iron Drum',
      description:
        'Every single estate lot has an idiosyncratic heat appetite. We roast in micro-batches in Bandra West, fine-tuning rate-of-rise curves to illuminate fruit sweetness and floral complexity rather than bitterness.',
      icon: <Flame className="w-6 h-6 text-[#D4A373]" />,
      accentColor: '#D4A373',
      highlights: [
        'Terroir-focused light and medium roast profiles',
        'Daily cupping protocol to guarantee SCA 86+ standards',
        'Roasted fresh weekly with roast dates stamped on every bag',
      ],
    },
    {
      id: 'tasting-room',
      title: 'Bandra West Tasting Bar & Bakes',
      tagline: 'Slow Brew & Bakery Pairings',
      description:
        'Conceived for the mindful coffee lover. Experience slow-dripped V60s, Aeropress flights, draft Cascara nitro cold brews, and house-pressed garlic thecha sourdough toasties.',
      icon: <Sparkles className="w-6 h-6 text-[#D4A373]" />,
      accentColor: '#D4A373',
      highlights: [
        'Manual Aeropress, V60 & Kalita Wave bar',
        'Draft nitro cold brew & roasted citrus espresso tonics',
        'Fresh daily sourdough toasties, croissants & chunky cookies',
      ],
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373]">
              The Grey Soul Standard
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAEDCD] tracking-tight mb-4 text-balance">
            Rooted in Soil, <span className="text-[#D4A373]">Perfected in the Roaster</span>
          </h2>
          <p className="font-sans-body text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed">
            Three core pillars define our Bandra West roastery: direct-trade estate origin, small-batch roast profiling, and slow coffee hospitality.
          </p>
        </div>

        {/* Asymmetrical 3-Column Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-[#2B2B2B] border border-[#D4A373]/25 p-8 sm:p-10 rounded-[2.5rem] flex flex-col justify-between group relative overflow-hidden shadow-xl ${
                index === 1
                  ? 'md:-translate-y-3 border-[#D4A373]/45 shadow-[0_25px_60px_-15px_rgba(212,163,115,0.18)]'
                  : index === 0
                  ? 'md:rounded-tl-[3.5rem]'
                  : 'md:rounded-br-[3.5rem]'
              }`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, #D4A373, #FAEDCD)',
                  opacity: index === 1 ? 1 : 0.4,
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] flex items-center justify-center shadow-inner border border-[#D4A373]/30 group-hover:scale-105 group-hover:border-[#D4A373]/60 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-tech uppercase tracking-[0.2em] font-bold text-[#D4A373]">
                    {feature.tagline}
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-bold text-[#FAEDCD] mb-3 group-hover:text-[#D4A373] transition-colors tracking-tight">
                  {feature.title}
                </h3>

                <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/75 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#FAEDCD]/90">
                      <div className="w-4 h-4 rounded-full bg-[#D4A373]/20 flex items-center justify-center shrink-0 border border-[#D4A373]/30">
                        <Check className="w-2.5 h-2.5 text-[#D4A373]" />
                      </div>
                      <span className="font-sans-body">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#D4A373]/15 flex items-center justify-between text-xs font-semibold text-[#FAEDCD]">
                <span className="text-[#FAEDCD]/50 font-tech uppercase tracking-wider text-[11px]">
                  Bandra West Roastery
                </span>
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-[#D4A373] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Learn More <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
