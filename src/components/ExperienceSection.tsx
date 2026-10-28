import React, { useRef } from 'react';
import { Droplet, Flame, ArrowRight, Coffee } from 'lucide-react';

interface ExperienceCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
}

const TiltExperienceCard: React.FC<ExperienceCardProps> = ({
  number,
  title,
  subtitle,
  description,
  tag,
  icon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#2B2B2B] rounded-[2.2rem] p-8 border border-[#D4A373]/25 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform flex flex-col justify-between group hover:border-[#D4A373]/50 hover:shadow-[0_0_25px_rgba(212,163,115,0.2)]"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-tech text-3xl font-bold text-[#D4A373]/70">
            {number}
          </span>
          <div className="p-3 rounded-2xl bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]/30 shadow-inner group-hover:scale-105 transition-transform">
            {icon}
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] font-tech font-bold block mb-1">
          {subtitle}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#FAEDCD] tracking-tight mb-3 group-hover:text-[#D4A373] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#FAEDCD]/75 leading-relaxed mb-6 font-normal">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#D4A373]/15 flex items-center justify-between">
        <span className="text-xs font-editorial italic text-[#FAEDCD]/75">
          {tag}
        </span>
        <span className="text-xs font-bold text-[#D4A373] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Details <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
        </span>
      </div>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const experiences: ExperienceCardProps[] = [
    {
      number: '01',
      title: 'Manual Slow Brew Counter',
      subtitle: 'Aeropress & V60 Pour-Overs',
      description:
        'Engage directly with our roasters and baristas. Watch single-estate beans ground fresh on EK43 grinders and extracted through precision paper and metal drippers.',
      tag: 'Custom Extraction',
      icon: <Coffee className="w-5 h-5 text-[#D4A373]" />,
    },
    {
      number: '02',
      title: 'Draft Cascara Nitro Tap',
      subtitle: '20-Hour Cold Extraction',
      description:
        'Cold-brewed for 20 hours and served nitrogen-infused on draft. Delivers a Guinness-like cascading crema foam with natural cacao and berry sweetness.',
      tag: 'Zero Dairy Stout Head',
      icon: <Droplet className="w-5 h-5 text-[#D4A373]" />,
    },
    {
      number: '03',
      title: 'Cast-Iron Roastery Viewing',
      subtitle: 'Small-Batch Micro-Roasts',
      description:
        'Witness small 5kg–12kg roast batches tumbling in our cast-iron drum roaster in Bandra West, filling the room with aromas of caramelizing sugars and roasted nuts.',
      tag: 'Fresh Weekly Roasts',
      icon: <Flame className="w-5 h-5 text-[#D4A373]" />,
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Bandra West Tasting Room
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAEDCD] tracking-tight mb-4">
            The Sensory Roastery{' '}
            <span className="font-editorial italic font-normal text-[#D4A373]">
              Experience
            </span>
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed font-normal">
            Immerse yourself in small-batch roasting culture. From single-origin espresso tonics to quiet focus salons and cupping rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <TiltExperienceCard key={exp.number} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};
