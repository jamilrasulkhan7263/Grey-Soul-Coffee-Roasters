import React, { useState } from 'react';
import { MenuItem } from '../types/cafe';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Leaf,
  Sparkles,
  Info,
  ShieldAlert,
  ShoppingBag,
  Award,
  Coffee,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  isAlreadyAdded?: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isAlreadyAdded,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#1E1E1E] rounded-[2.5rem] border border-[#D4A373]/30 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-300 text-[#FAEDCD]">
        {/* Header Visual */}
        <div className="relative bg-[#2B2B2B] p-6 sm:p-8 flex items-center justify-between border-b border-[#D4A373]/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1E1E] flex items-center justify-center text-3xl shadow-inner border border-[#D4A373]/30 shrink-0">
              {item.emoji}
            </div>
            <div>
              <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#D4A373] font-bold block mb-1">
                {item.category} {item.sku ? `· ${item.sku}` : ''}
              </span>
              <h3 className="font-headline text-2xl font-black text-[#FAEDCD] leading-tight tracking-tight">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-[#D4A373] text-xs font-headline font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#D4A373] mr-1" />
                  <span>{item.rating}</span>
                </div>
                <span className="text-[11px] text-[#FAEDCD]/50 font-tech">
                  ({item.reviewCount} verified ratings)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-tactile p-2 rounded-2xl bg-[#1E1E1E] hover:bg-[#252525] text-[#FAEDCD] transition-colors border border-[#D4A373]/30 shrink-0 self-start cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-sans-body">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D4A373]/15 text-xs font-tech font-bold text-[#FAEDCD]">
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.includes('Single Estate') && (
                <span className="inline-flex items-center gap-1 text-[#FAEDCD] font-bold">
                  <Coffee className="w-3.5 h-3.5 text-[#D4A373]" />
                  Single Estate
                </span>
              )}
              {item.tags.includes('Direct Trade') && (
                <span className="inline-flex items-center gap-1 text-[#D4A373]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                  Direct Trade
                </span>
              )}
              {item.tags.includes('Micro-Lot') && (
                <span className="inline-flex items-center gap-1 text-[#FAEDCD] font-bold">
                  <Flame className="w-3.5 h-3.5 text-[#D4A373]" />
                  Micro-Lot
                </span>
              )}
              {item.tags.includes('Award-Winner') && (
                <span className="inline-flex items-center gap-1 text-[#D4A373] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#D4A373]" />
                  Award-Winner
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[#FAEDCD]/60 font-tech">
              <span>{item.prepTime}</span>
              <span>•</span>
              <span>{item.calories}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-tech uppercase tracking-widest text-[#D4A373] font-bold mb-2">
              Roast Profile &amp; Tasting Description
            </h4>
            <p className="text-sm text-[#FAEDCD]/80 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>

          {/* Origin & Elevation specs */}
          {item.origin && (
            <div className="bg-[#2B2B2B] rounded-2xl p-4 border border-[#D4A373]/20 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#FAEDCD]/60 font-tech">Estate Origin:</span>
                <span className="font-semibold text-[#FAEDCD]">{item.origin}</span>
              </div>
              {item.elevation && (
                <div className="flex items-center justify-between">
                  <span className="text-[#FAEDCD]/60 font-tech">Elevation:</span>
                  <span className="font-semibold text-[#D4A373]">{item.elevation}</span>
                </div>
              )}
              {item.process && (
                <div className="flex items-center justify-between">
                  <span className="text-[#FAEDCD]/60 font-tech">Processing:</span>
                  <span className="font-semibold text-[#FAEDCD]">{item.process}</span>
                </div>
              )}
              {item.roastProfile && (
                <div className="flex items-center justify-between">
                  <span className="text-[#FAEDCD]/60 font-tech">Roast Profile:</span>
                  <span className="font-semibold text-[#D4A373]">{item.roastProfile}</span>
                </div>
              )}
            </div>
          )}

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div>
              <h4 className="text-[11px] font-tech uppercase tracking-widest text-[#D4A373] font-bold mb-2">
                Cupping Tasting Notes
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#FAEDCD]/90">
                {item.tastingNotes.map((note, idx) => (
                  <span key={note} className="inline-flex items-center gap-1.5">
                    <span>{note}</span>
                    {idx < (item.tastingNotes?.length ?? 0) - 1 && <span className="text-[#D4A373]">·</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients & Allergens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#2B2B2B] border border-[#D4A373]/20">
              <span className="font-tech uppercase tracking-wider text-[#D4A373] font-bold block mb-1">
                Ingredients
              </span>
              <ul className="text-[#FAEDCD]/80 space-y-1">
                {item.ingredients.map((ing, idx) => (
                  <li key={idx} className="truncate">• {ing}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#2B2B2B] border border-[#D4A373]/20">
              <span className="font-tech uppercase tracking-wider text-[#D4A373] font-bold block mb-1">
                Allergen Information
              </span>
              <ul className="text-[#FAEDCD]/80 space-y-1">
                {item.allergens.map((all, idx) => (
                  <li key={idx} className="truncate">• {all}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer with Quantity Controls & Add to Cart */}
        <div className="p-6 bg-[#2B2B2B] border-t border-[#D4A373]/20 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-tech uppercase tracking-wider text-[#FAEDCD]/50 block">
              Item Price
            </span>
            <span className="font-headline text-2xl font-black text-[#D4A373]">
              ₹{item.price * quantity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#1E1E1E] rounded-2xl px-3 py-1.5 border border-[#D4A373]/30">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-[#FAEDCD]/70 hover:text-[#FAEDCD] p-1 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-tech font-bold text-sm text-[#FAEDCD] min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-[#FAEDCD]/70 hover:text-[#FAEDCD] p-1 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Action Button */}
            <button
              onClick={handleAdd}
              className={`btn-tactile px-6 py-3.5 rounded-2xl font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md ${
                justAdded
                  ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]'
                  : 'bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] border border-[#D4A373]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-[#D4A373]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add ({quantity}) to Draft</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
