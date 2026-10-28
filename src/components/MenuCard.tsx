import React, { useRef } from 'react';
import { MenuItem } from '../types/cafe';
import { Plus, Check, Flame, Coffee, Sparkles } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isAdded?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart, isAdded }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
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
      className="bg-[#2B2B2B] rounded-[2.25rem] p-7 border border-[#D4A373]/25 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between group relative overflow-hidden will-change-transform hover:border-[#D4A373]/50 hover:shadow-[0_0_25px_rgba(212,163,115,0.2)]"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top subtle warm roasted amber glow line on card */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(90deg, #D4A373, #FAEDCD)',
        }}
      />

      <div>
        {/* Category & Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#D4A373] font-bold">
            {item.category}
          </span>

          <div className="flex items-center gap-2 text-[11px] font-tech font-bold text-[#FAEDCD]">
            {item.tags.includes('Single Estate') && (
              <span className="inline-flex items-center gap-1 text-[#FAEDCD] font-bold">
                <Coffee className="w-3.5 h-3.5 text-[#D4A373]" />
                Single Estate
              </span>
            )}
            {item.tags.includes('Direct Trade') && (
              <span className="inline-flex items-center gap-1 text-[#D4A373]">
                <Sparkles className="w-3 h-3 text-[#D4A373]" />
                Direct Trade
              </span>
            )}
            {item.tags.includes('Micro-Lot') && (
              <span className="inline-flex items-center gap-1 text-[#D4A373] font-bold">
                <Flame className="w-3.5 h-3.5 text-[#D4A373]" />
                Micro-Lot
              </span>
            )}
            {item.tags.includes('Bestseller') && !item.tags.includes('Single Estate') && (
              <span className="inline-flex items-center gap-1 text-[#D4A373] font-bold">
                <Flame className="w-3.5 h-3.5 text-[#D4A373]" />
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Item Title & Price */}
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-headline text-xl font-bold text-[#FAEDCD] group-hover:text-[#D4A373] transition-colors leading-snug tracking-tight">
            {item.name}
          </h3>
          <span className="font-headline text-lg font-extrabold text-[#D4A373] shrink-0">
            ₹{item.price}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/75 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Origin / Notes */}
        {item.origin && (
          <div className="text-[11px] text-[#FAEDCD]/70 font-tech mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span>Origin: {item.origin}</span>
          </div>
        )}

        {/* Tasting Notes as clean unboxed text */}
        {item.tastingNotes && item.tastingNotes.length > 0 && (
          <div className="text-[11px] font-sans-body text-[#FAEDCD]/80 mb-5 flex flex-wrap items-center gap-1.5">
            <span className="font-tech text-[10px] uppercase tracking-wider text-[#D4A373] font-semibold">
              Notes:
            </span>
            {item.tastingNotes.map((note, idx) => (
              <span key={note} className="inline-flex items-center gap-1.5 font-medium">
                <span>{note}</span>
                {idx < (item.tastingNotes?.length ?? 0) - 1 && <span className="text-[#D4A373]/50">·</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Add to WhatsApp order action */}
      <div className="pt-4 border-t border-[#D4A373]/15 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-tech text-[#FAEDCD]/50">
          {item.prepTime || 'Freshly micro-roasted'}
        </span>

        <button
          onClick={() => onAddToCart(item)}
          className={`btn-tactile px-4 py-2 rounded-2xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            isAdded
              ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373] shadow-sm'
              : 'bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] border border-[#D4A373]'
          }`}
          title="Add to WhatsApp Order list"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
