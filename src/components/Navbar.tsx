import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

export type AppPage = 'home' | 'menu' | 'story' | 'experience' | 'contact';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  cartCount: number;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenCart,
  cartCount,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeStatus, setStoreStatus] = useState<{
    isOpen: boolean;
    label: string;
  }>({
    isOpen: false,
    label: 'Checking status...',
  });

  // Dynamic store status (08:00 AM – 10:00 PM Daily)
  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 8 * 60; // 08:00 AM
      const closeMinutes = 22 * 60; // 10:00 PM

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        setStoreStatus({
          isOpen: true,
          label: 'Open Now · 08:00 AM – 10:00 PM',
        });
      } else {
        setStoreStatus({
          isOpen: false,
          label: 'Closed Now · Opens at 08:00 AM',
        });
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' as const, href: '#home' },
    { label: 'Menu & Retail Beans', page: 'menu' as const, href: '#menu' },
    { label: 'Roasting & Estates', page: 'story' as const, href: '#story' },
    { label: 'Tasting Room Vibe', page: 'experience' as const, href: '#experience' },
    { label: 'Reserve & Contact', page: 'contact' as const, href: '#reservation' },
  ];

  const handleLinkClick = (link: (typeof navLinks)[0]) => {
    setMobileMenuOpen(false);
    if (link.page !== currentPage) {
      onNavigate(link.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Editorial Ticker Badge */}
      <div className="bg-[#181818] text-[#FAEDCD] py-2 px-4 text-center border-b border-[#D4A373]/20 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-tech tracking-wider">
          <div className="hidden sm:flex items-center gap-2 text-[#FAEDCD]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
            <span>GREY SOUL COFFEE ROASTERS · BANDRA WEST, MUMBAI</span>
          </div>

          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 font-bold text-[#D4A373]">
            <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Roastery &amp; Tasting Room Open Daily: 08:00 AM – 10:00 PM</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-tech text-[#FAEDCD]/70">
            <span className="text-[#D4A373] font-semibold">Direct Trade:</span>
            <span>Chikmagalur · Coorg · Shevaroys</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Glassmorphic Navbar */}
      <nav className="sticky top-0 z-40 bg-[#1E1E1E]/95 backdrop-blur-xl border-b border-[#D4A373]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo Lockup */}
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left cursor-pointer group"
              aria-label="Grey Soul Coffee Roasters Home"
            >
              <MaisonLogo badgeSize={42} />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-headline tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-[#2B2B2B] text-[#D4A373] font-bold border border-[#D4A373]/30 shadow-sm'
                        : 'text-[#FAEDCD]/75 hover:text-[#FAEDCD] hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* WhatsApp Quick Order Cart Button */}
              <button
                onClick={onOpenCart}
                className="btn-tactile relative px-4 py-2.5 rounded-2xl bg-[#2B2B2B] hover:bg-[#343434] text-[#FAEDCD] border border-[#D4A373]/30 hover:border-[#D4A373]/60 transition-all flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-wider cursor-pointer shadow-sm active:scale-95"
                title="View WhatsApp order draft"
                aria-label={`View WhatsApp order draft with ${cartCount} items`}
              >
                <MessageCircle className="w-4 h-4 text-[#D4A373]" />
                <span>Order Draft</span>
                {cartCount > 0 && (
                  <span className="min-w-[20px] h-5 px-1 bg-[#D4A373] text-[#1E1E1E] font-tech text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Reserve Table CTA in Warm Roasted Amber */}
              <button
                onClick={onOpenReservation}
                className="btn-tactile px-5 py-2.5 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-[#D4A373] shadow-sm active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Table</span>
              </button>
            </div>

            {/* Mobile Menu & Cart Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-2xl bg-[#2B2B2B] text-[#FAEDCD] border border-[#D4A373]/30"
                aria-label="View WhatsApp order draft"
              >
                <MessageCircle className="w-5 h-5 text-[#D4A373]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#D4A373] text-[#1E1E1E] font-tech text-[10px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-2xl bg-[#2B2B2B] text-[#FAEDCD] border border-[#D4A373]/30 hover:bg-[#343434] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4A373]" /> : <Menu className="w-5 h-5 text-[#D4A373]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1E1E1E] border-b border-[#D4A373]/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-headline font-medium transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-between ${
                      isActive
                        ? 'bg-[#2B2B2B] text-[#D4A373] font-bold border border-[#D4A373]/30'
                        : 'text-[#FAEDCD]/80 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4A373]/70" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#D4A373]/20 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="btn-tactile w-full py-3.5 rounded-2xl bg-[#D4A373] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#D4A373]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="btn-tactile w-full py-3 rounded-2xl bg-[#2B2B2B] text-[#FAEDCD] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#D4A373]/30"
              >
                <MessageCircle className="w-4 h-4 text-[#D4A373]" />
                <span>View WhatsApp Order ({cartCount} items)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
