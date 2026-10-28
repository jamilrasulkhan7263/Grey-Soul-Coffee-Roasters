import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Sun,
  Flame,
  Music,
  Laptop,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  CheckCircle2,
  Coffee,
  Heart,
  Dog,
  Clock,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { MaisonLogo } from '../components/MaisonLogo';

export type VibeCategory =
  | 'All'
  | 'Slow Pour-Over Counter'
  | 'Cast-Iron Roastery Floor'
  | 'Bandra Courtyard Patio'
  | 'Cupping Lab & Sensory Bar';

interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<VibeCategory, 'All'>;
  caption: string;
  emoji: string;
  aspect: 'tall' | 'wide' | 'square';
  lighting: string;
  soundLevel: string;
  bestTime: string;
  tag: string;
  visualColor: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  orderedItem: string;
  verified: boolean;
  avatarEmoji: string;
}

export const ExperienceGalleryPage: React.FC<{
  onExploreMenu: () => void;
  onBookTable: () => void;
}> = ({ onExploreMenu, onBookTable }) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>('All');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryItem | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const vibeCategories: { label: VibeCategory; icon: React.ReactNode; desc: string }[] = [
    { label: 'All', icon: <Sparkles className="w-4 h-4" />, desc: 'Bandra West Roastery' },
    { label: 'Slow Pour-Over Counter', icon: <Coffee className="w-4 h-4" />, desc: 'Manual V60 & Aeropress' },
    { label: 'Cast-Iron Roastery Floor', icon: <Flame className="w-4 h-4" />, desc: 'Small-batch micro-roasts' },
    { label: 'Bandra Courtyard Patio', icon: <Sun className="w-4 h-4" />, desc: 'Pet-friendly coastal breeze' },
    { label: 'Cupping Lab & Sensory Bar', icon: <Sparkles className="w-4 h-4" />, desc: 'Single-estate flights' },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Manual Slow Pour-Over Counter',
      category: 'Slow Pour-Over Counter',
      caption: 'Dedicated barista station with Mahlkönig EK43 precision grinding, gooseneck kettles, and Japanese Hario drippers for clear origin nuance.',
      emoji: '☕',
      aspect: 'wide',
      lighting: 'Focused 3000K Amber Pendants',
      soundLevel: '48 dB • Gentle Drips & Soft Acoustic Jazz',
      bestTime: '08:00 AM – 11:30 AM',
      tag: 'Pour-Over Bar',
      visualColor: '#D4A373',
    },
    {
      id: 'gal-2',
      title: 'Cast-Iron Drum Micro-Roaster',
      category: 'Cast-Iron Roastery Floor',
      caption: 'Our artisanal drum roaster tumbling 5kg to 12kg micro-lots in Bandra West, monitored live via Cropster Rate-of-Rise heat sensors.',
      emoji: '🔥',
      aspect: 'tall',
      lighting: 'Warm Workshop Radiance & Daylight',
      soundLevel: '56 dB • Roaster Tumbler Hum & Crackling Beans',
      bestTime: 'Tuesdays & Thursdays 10:00 AM',
      tag: 'Small-Batch Roasting',
      visualColor: '#2B2B2B',
    },
    {
      id: 'gal-3',
      title: 'Bandra West Courtyard Patio',
      category: 'Bandra Courtyard Patio',
      caption: 'Lush open-air verandah shaded by green foliage, terracotta planters, gentle coastal breeze, and dog-friendly wooden benches.',
      emoji: '🌿',
      aspect: 'tall',
      lighting: 'Sunlight & Warm Evening Glow',
      soundLevel: '42 dB • Rustling Leaves & Conversational Murmur',
      bestTime: '08:00 AM – 10:30 AM & 05:00 PM',
      tag: 'Pet-Friendly',
      visualColor: '#D4A373',
    },
    {
      id: 'gal-4',
      title: 'Tri-Estate Cupping Table',
      category: 'Cupping Lab & Sensory Bar',
      caption: 'Circular stone cupping bar where guests compare Chikmagalur, Coorg, and Shevaroys lots across aroma, acidity, and mouthfeel with our head roaster.',
      emoji: '✨',
      aspect: 'wide',
      lighting: 'Neutral 4000K Sensory Lighting',
      soundLevel: '50 dB • Comparative Slurping & Tasting Dialogue',
      bestTime: 'Weekends 11:00 AM',
      tag: 'Cupping Lab',
      visualColor: '#2B2B2B',
    },
    {
      id: 'gal-5',
      title: 'Nitro Cold Brew Draft Tower',
      category: 'Slow Pour-Over Counter',
      caption: 'Stainless steel draft font pouring creamy Cascara-infused nitro cold brew with a rich, Guinness-style cascading head and zero added dairy.',
      emoji: '🍺',
      aspect: 'square',
      lighting: 'Crisp Counter Light',
      soundLevel: '45 dB • Smooth Draft Hiss',
      bestTime: '12:00 PM – 04:00 PM',
      tag: 'Draft Nitro',
      visualColor: '#D4A373',
    },
    {
      id: 'gal-6',
      title: 'Quiet Work & Focus Mezzanine',
      category: 'Cupping Lab & Sensory Bar',
      caption: 'Solid dark timber communal benches with high-speed fiber outlets, tailored noise dampening, and unlimited sparkling water on tap.',
      emoji: '💻',
      aspect: 'wide',
      lighting: 'Soft Indirect Daylight',
      soundLevel: '36 dB • Silent Focus Zone',
      bestTime: '09:00 AM – 02:00 PM',
      tag: 'Focus Sanctuary',
      visualColor: '#2B2B2B',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Rohan Mehta',
      role: 'Coffee Enthusiast & Architect, Bandra West',
      rating: 5,
      date: '2 days ago',
      comment:
        'Grey Soul is arguably the cleanest roaster in Mumbai right now. Their Bababudangiri washed pour-over had incredible peach notes and zero burnt astringency. Paired with the Garlic Thecha Sourdough, it is unmatched.',
      orderedItem: 'V60 Pour-Over & Bandra Garlic Thecha Sourdough',
      verified: true,
      avatarEmoji: '☕',
    },
    {
      id: 't-2',
      name: 'Ananya Deshmukh',
      role: 'Creative Director',
      rating: 5,
      date: 'Last week',
      comment:
        'The nitro cold brew has an authentic cascading head like an Irish stout. Love sitting in the courtyard with my golden retriever in the mornings.',
      orderedItem: 'Velvet Cascara Nitro Cold Brew & Almond Croissant',
      verified: true,
      avatarEmoji: '🌿',
    },
    {
      id: 't-3',
      name: 'Kabir Varma',
      role: 'Specialty Coffee Home Brewer',
      rating: 5,
      date: '3 days ago',
      comment:
        'Bought a 250g bag of Shevaroys Red Bourbon roasted just 48 hours prior. The jasmine aromatics on my Comandante grinder and Origami dripper at home are extraordinary.',
      orderedItem: 'Shevaroy Silver Heights Whole Beans (250g)',
      verified: true,
      avatarEmoji: '🔥',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedVibe === 'All' || item.category === selectedVibe
  );

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FAEDCD] pb-24 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <section className="pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2B2B2B] rounded-[2.8rem] p-8 sm:p-14 border border-[#D4A373]/25 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373]">
                Grey Soul Coffee Roasters · Page 4 Vibe &amp; Roastery
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAEDCD] tracking-tight leading-[1.08] mb-6 text-balance">
              The Bandra West Roastery &amp; Tasting Room Vibe
            </h1>

            <p className="font-editorial italic text-lg sm:text-xl text-[#FAEDCD]/90 leading-relaxed mb-6">
              A sensory sanctuary in the heart of Bandra West designed for unhurried coffee lovers, home brewers, and remote creators.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#D4A373]/15 text-xs font-tech text-[#FAEDCD]/75">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A373]" />
                <span>Open Daily: 08:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373]" />
                <span>Bandra West, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Dog className="w-4 h-4 text-[#D4A373]" />
                <span>Pet-Friendly Patio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vibe Category Filters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="bg-[#2B2B2B] rounded-2xl p-3 border border-[#D4A373]/25 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {vibeCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedVibe(cat.label)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-headline font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                selectedVibe === cat.label
                  ? 'bg-[#D4A373] text-[#1E1E1E] shadow-sm'
                  : 'text-[#FAEDCD]/70 hover:bg-white/10 hover:text-[#FAEDCD]'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Sensory Spaces Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoModal(item)}
              className="bg-[#2B2B2B] rounded-[2.25rem] p-7 border border-[#D4A373]/25 shadow-xl hover:shadow-2xl hover:border-[#D4A373]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] flex items-center justify-center text-3xl border border-[#D4A373]/30 shadow-inner group-hover:scale-105 transition-transform">
                    {item.emoji}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1E1E1E] text-[10px] font-tech text-[#D4A373] uppercase tracking-wider border border-[#D4A373]/30">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-headline text-xl font-bold text-[#FAEDCD] mb-2 group-hover:text-[#D4A373] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAEDCD]/75 leading-relaxed mb-6 font-sans-body">
                  {item.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4A373]/15 space-y-1.5 text-xs font-tech text-[#FAEDCD]/70">
                <div className="flex items-center justify-between">
                  <span>Acoustic Level:</span>
                  <strong className="text-[#FAEDCD]">{item.soundLevel.split('•')[0]}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best Visiting Time:</span>
                  <strong className="text-[#D4A373]">{item.bestTime}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Guest Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] font-tech text-[#D4A373] uppercase tracking-wider block mb-2">
            Verified Coffee Lovers
          </span>
          <h2 className="text-3xl font-black text-[#FAEDCD]">
            Words From the Bandra Community
          </h2>
        </div>

        <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A373]/25 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1 text-[#D4A373]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-tech text-[#FAEDCD]/60">
              {testimonials[currentTestimonialIndex].date}
            </span>
          </div>

          <blockquote className="font-editorial italic text-lg sm:text-xl text-[#FAEDCD] leading-relaxed mb-6">
            “{testimonials[currentTestimonialIndex].comment}”
          </blockquote>

          <div className="pt-4 border-t border-[#D4A373]/20 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="font-headline font-bold text-sm text-[#FAEDCD]">
                {testimonials[currentTestimonialIndex].name}
              </h4>
              <p className="text-xs font-tech text-[#FAEDCD]/60">
                {testimonials[currentTestimonialIndex].role}
              </p>
              <span className="text-[11px] text-[#D4A373] font-tech block mt-0.5">
                Poured: {testimonials[currentTestimonialIndex].orderedItem}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentTestimonialIndex((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="p-2.5 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] hover:bg-[#252525] border border-[#D4A373]/30 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 text-[#D4A373]" />
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonialIndex((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-2.5 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] hover:bg-[#252525] border border-[#D4A373]/30 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 text-[#D4A373]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for space detail */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#2B2B2B] rounded-3xl p-8 max-w-lg w-full border border-[#D4A373]/30 shadow-2xl relative">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] hover:bg-[#252525] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-4xl mb-4">{activePhotoModal.emoji}</div>
            <span className="text-xs font-tech text-[#D4A373] uppercase tracking-wider block mb-1">
              {activePhotoModal.tag}
            </span>
            <h3 className="font-headline text-2xl font-bold text-[#FAEDCD] mb-3">
              {activePhotoModal.title}
            </h3>
            <p className="text-sm text-[#FAEDCD]/80 leading-relaxed mb-6">
              {activePhotoModal.caption}
            </p>
            <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#D4A373]/20 space-y-2 text-xs font-tech">
              <div className="flex justify-between">
                <span className="text-[#FAEDCD]/60">Lighting Atmosphere:</span>
                <span className="text-[#FAEDCD] font-medium">{activePhotoModal.lighting}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAEDCD]/60">Soundscape:</span>
                <span className="text-[#D4A373] font-medium">{activePhotoModal.soundLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAEDCD]/60">Optimal Visiting Hours:</span>
                <span className="text-[#FAEDCD] font-medium">{activePhotoModal.bestTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
