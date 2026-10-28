import React, { useState } from 'react';
import {
  Flame,
  Coffee,
  Sparkles,
  Award,
  ArrowRight,
  Droplets,
  Layers,
  CheckCircle2,
  Sprout,
  Sun,
  Clock,
  Compass,
  MapPin,
} from 'lucide-react';
import { MaisonLogo } from '../components/MaisonLogo';

interface CraftStep {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  icon: React.ReactNode;
  specs: {
    label: string;
    value: string;
  }[];
  deepDive: string;
  equipment: string;
}

export const AboutStoryPage: React.FC<{
  onExploreMenu: () => void;
  onBookTable: () => void;
}> = ({ onExploreMenu, onBookTable }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const estates = [
    {
      name: 'Chikmagalur',
      region: 'Bababudangiri Ranges, Karnataka',
      elevation: '1,350m – 1,480m',
      varietal: 'Selection 795 & Old Kent Arabica',
      process: 'Washed & Sun-Dried on Bamboo Racks',
      flavor: 'Milk Chocolate, Roasted Hazelnut, Orange Peel, Brown Sugar',
      description:
        'The historic birthplace of Indian coffee. Protected under dense canopies of silver oak, wild fig, and black pepper vines, the beans mature slowly under cold mountain breezes, yielding dense sugars and balanced acidity.',
    },
    {
      name: 'Coorg (Kodagu)',
      region: 'Madikeri & Virajpet Ridges, Karnataka',
      elevation: '1,200m – 1,280m',
      varietal: 'Yellow Bourbon & Catimor Micro-Lots',
      process: 'Yellow Honey & 72h Anaerobic Natural',
      flavor: 'Wild Honey, Candied Plum, Passionfruit, Golden Raisin',
      description:
        'Nestled in the lush biodiversity hotspot of the Western Ghats. Our partner estate leaves 50% sweet nectar on the parchment before slow patio sun-drying, creating extraordinary honey sweetness and juicy stone fruit complexity.',
    },
    {
      name: 'Shevaroy Hills',
      region: 'Yercaud, Eastern Ghats, Tamil Nadu',
      elevation: '1,450m – 1,550m',
      varietal: 'Red Bourbon & SLN 9',
      process: 'Extended Fermentation Washed',
      flavor: 'Jasmine Florals, Meyer Lemon, Earl Grey Tea, Cacao Nibs',
      description:
        'Exceptional elevation in mineral-rich volcanic red clay soils. Cool mist and dry sunny afternoons produce small, dense cherries with tea-like clarity, sparkling citric brightness, and enchanting jasmine aromatics.',
    },
  ];

  const craftSteps: CraftStep[] = [
    {
      id: 1,
      number: '01',
      title: 'Direct-Trade Planter Partnerships',
      subtitle: 'Chikmagalur, Coorg & Shevaroys',
      shortDesc:
        'Bypassing commercial auction houses to contract directly with generational estate planters who hand-pick only 100% ripe crimson cherries.',
      icon: <Sprout className="w-5 h-5" />,
      specs: [
        { label: 'Harvest Elevation', value: '1,200m – 1,550m' },
        { label: 'Brix Sugar Ripeness', value: '22°–24° Brix' },
        { label: 'Planter Premium', value: '+35% Above Fairtrade' },
      ],
      deepDive:
        'We visit our partner estates before every harvest season. By establishing multi-harvest purchase commitments at transparent premium prices, planters can invest in raised drying beds, slow anaerobic fermentation tanks, and composted soil health.',
      equipment: 'Selective Hand-Picking & Optical Color Sorting',
    },
    {
      id: 2,
      number: '02',
      title: 'Estate Processing & Fermentation',
      subtitle: 'Yellow Honey & Anaerobic Lots',
      shortDesc:
        'Float-sorting in spring water followed by micro-lot fermentations and 18–22 days of slow patio sun-drying on elevated African beds.',
      icon: <Sun className="w-5 h-5" />,
      specs: [
        { label: 'Drying Time', value: '18 to 22 Days' },
        { label: 'Moisture Window', value: '10.5% – 11.2%' },
        { label: 'Fermentation Style', value: 'Anaerobic & Natural Honey' },
      ],
      deepDive:
        'Coffee cherry drying is turned manually every 40 minutes under the South Indian sun. This patient drying cycle locks in the intrinsic fruit acids and prevents fermented taint, ensuring clean and bright cups in our Bandra tasting bar.',
      equipment: 'Raised African Mesh Beds & Stainless Anaerobic Tanks',
    },
    {
      id: 3,
      number: '03',
      title: 'Small-Batch Cast-Iron Roasting',
      subtitle: '5kg–12kg Drum Micro-Roasting in Bandra West',
      shortDesc:
        'We never mass-roast. Every batch is roasted in small cast-iron drums in Bandra West to preserve terroir nuances.',
      icon: <Flame className="w-5 h-5" />,
      specs: [
        { label: 'Batch Capacity', value: '5kg – 12kg Drums' },
        { label: 'Roast Philosophy', value: 'Terroir-Forward Light to Med-Dark' },
        { label: 'Turnaround', value: 'Roasted Fresh Weekly' },
      ],
      deepDive:
        'Our roasting team monitors real-time Rate-of-Rise (RoR) curves and airflow differentials. We roast each estate lot specifically for its optimal brew method: gentle, floral profiles for V60 pour-overs and deep, molasses-rich profiles for espresso blends.',
      equipment: 'Artisanal Cast-Iron Drum Roaster & Cropster Telemetry',
    },
    {
      id: 4,
      number: '04',
      title: 'Daily Sensory Cupping & Extraction',
      subtitle: 'SCA 86+ Protocol at Bandra Bar',
      shortDesc:
        'Every single roast batch undergoes blind cupping before packaging or pulling on our manual brew counter.',
      icon: <Coffee className="w-5 h-5" />,
      specs: [
        { label: 'Cupping Ratio', value: '8.25g per 150ml at 93°C' },
        { label: 'Minimum Score', value: '86+ Specialty SCA Points' },
        { label: 'Water Mineral Profile', value: '130 PPM Balanced Alkalinity' },
      ],
      deepDive:
        'Quality control is uncompromising. If a roast does not meet our strict sweetness and clean finish criteria, it never reaches our guests. Our baristas taste every origin daily to calibrate grind microns to Bandra’s atmospheric humidity.',
      equipment: 'Mahlkönig EK43 Grinder, Acaia Pearl Scales & Modbar Taps',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FAEDCD] pb-24">
      {/* 1. Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2B2B2B] rounded-[2.8rem] p-8 sm:p-14 border border-[#D4A373]/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373]">
                Grey Soul Coffee Roasters · Page 3 Heritage
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAEDCD] tracking-tight leading-[1.08] mb-6 text-balance">
              Small-Batch Micro-Roasting &amp; Direct-Trade South Indian Terroir
            </h1>

            <p className="font-editorial italic text-lg sm:text-xl text-[#FAEDCD]/90 leading-relaxed mb-6">
              “Specialty coffee in India deserves a digital and culinary stage that matches the finest roasters in Tokyo, Melbourne, and Copenhagen.”
            </p>

            <p className="font-sans-body text-sm sm:text-base text-[#FAEDCD]/80 leading-relaxed mb-8">
              Grey Soul was founded with a fierce commitment: direct farm-gate sourcing from South India’s premier coffee estates—<strong>Chikmagalur</strong>, <strong>Coorg</strong>, and the <strong>Shevaroys</strong>—and micro-roasting in small batches in Bandra West to preserve the distinctive microclimate of every ridge.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="btn-tactile px-8 py-4 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer border border-[#D4A373]"
              >
                Browse Estate Beans &amp; Brews
              </button>

              <button
                onClick={onBookTable}
                className="btn-tactile px-8 py-4 rounded-2xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/30 font-headline font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#252525]"
              >
                Book a Tasting Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct-Trade Estates Showcase (Chikmagalur, Coorg, Shevaroys) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Origin Partnerships
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FAEDCD] tracking-tight mb-4">
            Our South Indian Coffee Estates
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base">
            Every bag of Grey Soul beans is traceable to a specific mountain range, harvest lot, and processing methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {estates.map((est, idx) => (
            <div
              key={est.name}
              className="bg-[#2B2B2B] rounded-[2.5rem] p-8 border border-[#D4A373]/25 shadow-xl flex flex-col justify-between hover:border-[#D4A373]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-tech font-bold text-[#D4A373] uppercase tracking-wider">
                    Estate 0{idx + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1E1E1E] text-[10px] font-tech text-[#FAEDCD] border border-[#D4A373]/30">
                    {est.elevation}
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-black text-[#FAEDCD] mb-1">
                  {est.name}
                </h3>
                <span className="text-xs font-tech text-[#D4A373] block mb-4">
                  {est.region}
                </span>

                <p className="text-xs sm:text-sm text-[#FAEDCD]/80 leading-relaxed mb-6 font-sans-body">
                  {est.description}
                </p>

                <div className="space-y-2 text-xs font-tech text-[#FAEDCD]/85 border-t border-[#D4A373]/15 pt-4 mb-6">
                  <div>
                    <span className="text-[#FAEDCD]/50 block">Varietal:</span>
                    <strong className="text-[#FAEDCD]">{est.varietal}</strong>
                  </div>
                  <div>
                    <span className="text-[#FAEDCD]/50 block">Processing:</span>
                    <strong className="text-[#D4A373]">{est.process}</strong>
                  </div>
                  <div>
                    <span className="text-[#FAEDCD]/50 block">Flavor Signature:</span>
                    <strong className="text-[#FAEDCD]">{est.flavor}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4A373]/15 flex items-center justify-between">
                <span className="text-[11px] font-tech text-[#FAEDCD]/60">100% Direct Trade</span>
                <span className="text-xs font-bold text-[#D4A373] flex items-center gap-1">
                  Single Estate Lot <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Small-Batch Roasting Philosophy & Step-by-Step Interactive Workflow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Small-Batch Craft
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FAEDCD] tracking-tight mb-4">
            Our Micro-Roasting Philosophy
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base">
            How we translate green cherries from South Indian hills into clean, expressive specialty cups in Bandra West.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {craftSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                activeStep === step.id
                  ? 'bg-[#2B2B2B] border-[#D4A373] text-[#FAEDCD] shadow-lg'
                  : 'bg-[#1E1E1E] border-[#D4A373]/20 text-[#FAEDCD]/60 hover:bg-[#252525]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-tech text-xs font-bold text-[#D4A373]">
                  {step.number}
                </span>
                <div className={`p-1.5 rounded-lg ${activeStep === step.id ? 'bg-[#D4A373] text-[#1E1E1E]' : 'bg-[#2B2B2B] text-[#D4A373]'}`}>
                  {step.icon}
                </div>
              </div>
              <h4 className="font-headline text-xs sm:text-sm font-bold text-[#FAEDCD] leading-snug">
                {step.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Active Step Deep-Dive Card */}
        {(() => {
          const step = craftSteps.find((s) => s.id === activeStep) || craftSteps[0];
          return (
            <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A373]/30 shadow-2xl animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#1E1E1E] text-xs font-tech font-bold text-[#D4A373] border border-[#D4A373]/30">
                      Step {step.number} Protocol
                    </span>
                    <span className="text-xs font-tech text-[#FAEDCD]/60">{step.subtitle}</span>
                  </div>

                  <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#FAEDCD]">
                    {step.title}
                  </h3>

                  <p className="font-sans-body text-sm sm:text-base text-[#FAEDCD]/85 leading-relaxed">
                    {step.deepDive}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/20 text-xs font-tech">
                    <span className="text-[#D4A373] font-bold block mb-1">Equipment &amp; Standards:</span>
                    <span className="text-[#FAEDCD]/90">{step.equipment}</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#1E1E1E] rounded-3xl p-6 border border-[#D4A373]/25 space-y-4">
                  <h4 className="text-xs font-tech uppercase tracking-widest text-[#D4A373] font-bold">
                    Technical Specifications
                  </h4>

                  <div className="space-y-3">
                    {step.specs.map((sp, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs border-b border-[#D4A373]/15 pb-2">
                        <span className="text-[#FAEDCD]/60 font-tech">{sp.label}:</span>
                        <strong className="text-[#FAEDCD] font-headline">{sp.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] font-tech text-[#D4A373] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                    <span>Calibrated daily by Q-Graders in Bandra West</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. Contact & Developer Link Footer Banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2B2B2B] rounded-3xl p-8 border border-[#D4A373]/25 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-[11px] font-tech text-[#D4A373] uppercase tracking-wider block mb-1">
              Grey Soul Roastery &amp; Tasting Room
            </span>
            <h4 className="font-headline text-xl font-bold text-[#FAEDCD]">
              Ready to taste the harvest?
            </h4>
            <p className="text-xs text-[#FAEDCD]/70 mt-1">
              Visit us in Bandra West or order pre-filled single-estate beans directly via WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreMenu}
              className="btn-tactile px-6 py-3 rounded-xl bg-[#D4A373] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Order Beans
            </button>
            <button
              onClick={onBookTable}
              className="btn-tactile px-6 py-3 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/30 font-headline font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Book Counter Seat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
