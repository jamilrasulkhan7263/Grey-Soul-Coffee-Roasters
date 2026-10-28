import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { Search, X, Flame, Coffee } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  addedItemIds: Set<string>;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Specialty Beans',
  'Tasting Bar',
  'Bakery Pairings',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  addedItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState<'all' | 'single-estate' | 'direct-trade' | 'micro-lot' | 'bestseller'>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
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
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchOrigin = item.origin?.toLowerCase().includes(query);
        const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(query));
        const matchSub = item.subcategory?.toLowerCase().includes(query);
        return matchName || matchDesc || matchOrigin || matchNotes || matchSub;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, tagFilter]);

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Bandra West Catalog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAEDCD] tracking-tight mb-4">
            Specialty Beans, Tasting Bar &amp;{' '}
            <span className="font-editorial italic font-normal text-[#D4A373]">
              Bakery Pairings
            </span>
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed font-normal">
            Taste our single-origin roasts from Chikmagalur, Coorg, and Shevaroys, slow-dripped pour-overs, nitro cold brews, and warm sourdough toasties. Tap to order directly on WhatsApp.
          </p>
        </div>

        {/* Filter Controls Bar in Deep Espresso Card */}
        <div className="bg-[#2B2B2B] rounded-[2rem] p-4 sm:p-5 mb-10 shadow-xl border border-[#D4A373]/25">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap cursor-pointer active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#D4A373] text-[#1E1E1E] shadow-sm font-bold'
                      : 'text-[#FAEDCD]/70 hover:bg-white/10 hover:text-[#FAEDCD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search Bar & Origin Quick Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Origin Quick Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => setTagFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-tech font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer active:scale-95 ${
                    tagFilter === 'all'
                      ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]/60'
                      : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
                  }`}
                >
                  All Lots
                </button>
                <button
                  onClick={() => setTagFilter('single-estate')}
                  className={`px-3 py-1.5 rounded-full text-xs font-tech font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer active:scale-95 flex items-center gap-1 ${
                    tagFilter === 'single-estate'
                      ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]'
                      : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
                  }`}
                >
                  <Coffee className="w-3 h-3 text-[#D4A373]" />
                  Single Estate
                </button>
                <button
                  onClick={() => setTagFilter('micro-lot')}
                  className={`px-3 py-1.5 rounded-full text-xs font-tech font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer active:scale-95 flex items-center gap-1 ${
                    tagFilter === 'micro-lot'
                      ? 'bg-[#1E1E1E] text-[#D4A373] border border-[#D4A373]'
                      : 'text-[#FAEDCD]/60 hover:text-[#FAEDCD]'
                  }`}
                >
                  <Flame className="w-3 h-3 text-[#D4A373]" />
                  Micro-Lot
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px] sm:min-w-[240px]">
                <Search className="w-4 h-4 text-[#FAEDCD]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search beans, roast, estate..."
                  className="w-full pl-9 pr-8 py-2 rounded-full bg-[#1E1E1E] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/40 border border-[#D4A373]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#FAEDCD]/40 hover:text-[#FAEDCD]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#2B2B2B] rounded-3xl p-8 border border-[#D4A373]/20">
            <Coffee className="w-10 h-10 text-[#D4A373]/40 mx-auto mb-3" />
            <h3 className="font-headline text-lg font-bold text-[#FAEDCD] mb-1">
              No coffee or bake matches found
            </h3>
            <p className="text-xs text-[#FAEDCD]/60 max-w-sm mx-auto mb-4">
              Try modifying your search term or reset your estate and category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setTagFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider bg-[#D4A373] text-[#1E1E1E] font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.slice(0, 9).map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                isAdded={addedItemIds.has(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
