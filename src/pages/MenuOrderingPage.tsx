import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuItem, CartItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCardPage2 } from '../components/MenuCardPage2';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { MaisonLogo } from '../components/MaisonLogo';
import {
  Search,
  X,
  MessageCircle,
  ArrowLeft,
  Flame,
  Coffee,
  ShoppingBag,
  Clock,
  MapPin,
  Sparkles,
  Award,
} from 'lucide-react';

interface MenuOrderingPageProps {
  onBackToHome: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem, quantity?: number) => void;
  onOpenCart: () => void;
  addedItemIds: Set<string>;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Specialty Beans',
  'Tasting Bar',
  'Bakery Pairings',
];

export const MenuOrderingPage: React.FC<MenuOrderingPageProps> = ({
  onBackToHome,
  cart,
  onAddToCart,
  onOpenCart,
  addedItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<'all' | 'single-estate' | 'direct-trade' | 'micro-lot' | 'bestseller' | 'award'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartSubtotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  // Available subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'Specialty Beans') {
      return ['All', 'Estate Whole Beans', 'Manual Brew Filters', 'Dark Roast Espresso Blends'];
    }
    if (selectedCategory === 'Tasting Bar') {
      return ['All', 'Aeropress Brews', 'Pour-Overs', 'Nitro Cold Brew', 'Espresso Tonics'];
    }
    if (selectedCategory === 'Bakery Pairings') {
      return ['All', 'Sourdough Toasties', 'Almond Croissants', 'Artisanal Cookies'];
    }
    return [
      'All',
      'Estate Whole Beans',
      'Manual Brew Filters',
      'Dark Roast Espresso Blends',
      'Aeropress Brews',
      'Pour-Overs',
      'Nitro Cold Brew',
      'Espresso Tonics',
      'Sourdough Toasties',
      'Almond Croissants',
      'Artisanal Cookies',
    ];
  }, [selectedCategory]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Subcategory match
      if (selectedSubcategory !== 'All' && item.subcategory !== selectedSubcategory) {
        return false;
      }
      // Tag filter match
      if (tagFilter === 'single-estate' && !item.tags.includes('Single Estate')) {
        return false;
      }
      if (tagFilter === 'direct-trade' && !item.tags.includes('Direct Trade')) {
        return false;
      }
      if (tagFilter === 'micro-lot' && !item.tags.includes('Micro-Lot')) {
        return false;
      }
      if (tagFilter === 'bestseller' && !item.tags.includes('Bestseller')) {
        return false;
      }
      if (tagFilter === 'award' && !item.tags.includes('Award-Winner')) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchOrigin = item.origin?.toLowerCase().includes(q);
        const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(q));
        const matchIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
        const matchSub = item.subcategory?.toLowerCase().includes(q);
        return matchName || matchDesc || matchOrigin || matchNotes || matchIngredients || matchSub;
      }
      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, tagFilter]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FAEDCD] pb-24">
      {/* 1. Page Header & Live Cart Counter: Sticky top bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#1E1E1E]/95 backdrop-blur-xl border-b border-[#D4A373]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Back button & Brand */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={onBackToHome}
              className="btn-tactile p-2.5 rounded-2xl bg-[#2B2B2B] hover:bg-[#343434] text-[#FAEDCD] border border-[#D4A373]/30 transition-all flex items-center gap-1.5 text-xs font-headline font-bold uppercase tracking-wider cursor-pointer"
              title="Return to Home Flagship"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4A373]" />
              <span className="hidden sm:inline">Back to Roastery</span>
            </button>

            <MaisonLogo badgeSize={36} inverted />
          </div>

          {/* Quick Info & WhatsApp Cart Open */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-tech text-[#FAEDCD]/70 bg-[#2B2B2B] px-3.5 py-1.5 rounded-full border border-[#D4A373]/25">
              <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Bandra Tasting Room: 08:00 AM – 10:00 PM</span>
            </div>

            <button
              onClick={onOpenCart}
              className="btn-tactile px-4 py-2 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer border border-[#D4A373]"
              title="View WhatsApp order summary"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Draft</span>
              {totalCartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#1E1E1E] text-[#D4A373] text-[10px] font-tech font-black">
                  {totalCartCount} (₹{cartSubtotal})
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Kicker Banner for Menu Page 2 */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A373]/25 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373]">
                Grey Soul Coffee Roasters · Page 2 Catalog
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl font-black text-[#FAEDCD] tracking-tight mb-4 text-balance">
              Specialty Beans, Tasting Bar &amp; Bakery Pairings
            </h1>

            <p className="font-sans-body text-sm sm:text-base text-[#FAEDCD]/80 leading-relaxed mb-4">
              Explore our small-batch micro-roasted estate whole beans, manual brew filters, single-origin espresso blends, aeropress extractions, draft nitro cold brew, and freshly pressed garlic thecha sourdough toasties.
            </p>

            <div className="flex items-center gap-4 text-xs font-tech text-[#FAEDCD]/65 flex-wrap pt-2 border-t border-[#D4A373]/15">
              <span>Direct Planter Premiums</span>
              <span>•</span>
              <span>Fresh Weekly Roast Dates</span>
              <span>•</span>
              <span>Chikmagalur, Coorg &amp; Shevaroys Terroir</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Controls: Category Tabs & Subcategories */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
        <div className="bg-[#2B2B2B] rounded-[2rem] p-5 sm:p-6 shadow-xl border border-[#D4A373]/25 space-y-4">
          {/* Main Category Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory('All');
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-headline tracking-wide font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4A373] text-[#1E1E1E] shadow-sm'
                      : 'text-[#FAEDCD]/70 hover:bg-white/10 hover:text-[#FAEDCD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#FAEDCD]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beans, notes, roast, estates..."
                className="w-full pl-10 pr-8 py-2.5 rounded-full bg-[#1E1E1E] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/40 border border-[#D4A373]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAEDCD]/40 hover:text-[#FAEDCD]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Subcategories Bar (Offering breakdown) */}
          <div className="pt-3 border-t border-[#D4A373]/15 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-tech uppercase tracking-wider text-[#D4A373] font-bold shrink-0">
              Offerings:
            </span>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-tech font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]'
                    : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD] hover:bg-white/5'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Origin & Dietary Tags Bar */}
          <div className="pt-3 border-t border-[#D4A373]/15 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-tech uppercase tracking-wider text-[#D4A373] font-bold shrink-0">
              Origin Tags:
            </span>
            <button
              onClick={() => setTagFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer ${
                tagFilter === 'all'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              All Harvests
            </button>
            <button
              onClick={() => setTagFilter('single-estate')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer flex items-center gap-1 ${
                tagFilter === 'single-estate'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              <Coffee className="w-3 h-3 text-[#D4A373]" />
              Single Estate
            </button>
            <button
              onClick={() => setTagFilter('direct-trade')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer flex items-center gap-1 ${
                tagFilter === 'direct-trade'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D4A373]" />
              Direct Trade
            </button>
            <button
              onClick={() => setTagFilter('micro-lot')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer flex items-center gap-1 ${
                tagFilter === 'micro-lot'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              <Flame className="w-3 h-3 text-[#D4A373]" />
              Micro-Lot
            </button>
            <button
              onClick={() => setTagFilter('bestseller')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer ${
                tagFilter === 'bestseller'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              Bestseller
            </button>
            <button
              onClick={() => setTagFilter('award')}
              className={`px-3 py-1 rounded-full text-xs font-tech font-semibold cursor-pointer flex items-center gap-1 ${
                tagFilter === 'award'
                  ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]'
                  : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
              }`}
            >
              <Award className="w-3 h-3 text-[#D4A373]" />
              Award-Winner
            </button>
          </div>
        </div>
      </section>

      {/* 4. Menu & Retail Items Grid */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-tech text-[#FAEDCD]/70">
            Showing <strong className="text-[#D4A373]">{filteredItems.length}</strong> items in{' '}
            <span className="text-[#FAEDCD] font-semibold">{selectedCategory}</span>
            {selectedSubcategory !== 'All' && <span> · {selectedSubcategory}</span>}
          </div>

          <div className="text-xs font-tech text-[#D4A373]">
            Direct delivery &amp; pickup across Bandra West
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#2B2B2B] rounded-3xl border border-[#D4A373]/20 p-8">
            <Coffee className="w-12 h-12 text-[#D4A373]/40 mx-auto mb-3" />
            <h3 className="font-headline text-lg font-bold text-[#FAEDCD] mb-1">
              No matching offerings found
            </h3>
            <p className="text-xs text-[#FAEDCD]/60 max-w-sm mx-auto mb-4">
              We couldn’t find an exact match for your active filters or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubcategory('All');
                setSearchQuery('');
                setTagFilter('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#D4A373] text-[#1E1E1E] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <MenuCardPage2
                key={item.id}
                item={item}
                onAddToCart={(it) => onAddToCart(it, 1)}
                onSelect={(it) => setSelectedItemForModal(it)}
                isAdded={addedItemIds.has(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Item Detail Quick-View Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={onAddToCart}
        isAlreadyAdded={selectedItemForModal ? addedItemIds.has(selectedItemForModal.id) : false}
      />
    </div>
  );
};
