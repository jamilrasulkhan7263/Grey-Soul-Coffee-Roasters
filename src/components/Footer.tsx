import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Heart, Check, Mail, Phone, MapPin, Clock, Flame, Sparkles } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-12 bg-[#181818] text-[#FAEDCD] relative z-10 border-t border-[#D4A373]/20 font-sans-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4A373]/20">
          {/* Brand Column with Bespoke Logo Lockup */}
          <div className="lg:col-span-5 space-y-4">
            <MaisonLogo badgeSize={42} inverted />
            <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/75 leading-relaxed max-w-sm pt-1">
              Grey Soul Coffee Roasters brings direct-trade single-origin Indian coffees from historic estates in Chikmagalur, Coorg, and Shevaroys. Roasted in artisanal small batches in Bandra West, Mumbai.
            </p>

            {/* Official Contact Badges */}
            <div className="space-y-2 pt-2 text-xs font-tech text-[#FAEDCD]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span>Bandra West, Mumbai, Maharashtra 400050</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span>Roastery &amp; Tasting Room: 08:00 AM – 10:00 PM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <a href="tel:+919322036559" className="hover:text-[#D4A373] font-bold">
                  Order Line: +91-93220-36559
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <a href="mailto:sakshi@greysoul.coffee" className="hover:text-[#D4A373] underline">
                  sakshi@greysoul.coffee
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-[#2B2B2B] hover:bg-[#D4A373] hover:text-[#1E1E1E] text-[#FAEDCD] flex items-center justify-center border border-[#D4A373]/30 transition-all shadow-xs hover:scale-105 btn-tactile"
                aria-label="Follow Grey Soul Coffee Roasters on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-[#2B2B2B] hover:bg-[#D4A373] hover:text-[#1E1E1E] text-[#FAEDCD] flex items-center justify-center border border-[#D4A373]/30 transition-all shadow-xs hover:scale-105 btn-tactile"
                aria-label="Follow Grey Soul Coffee Roasters on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-tech font-bold text-[#D4A373]">
              Bandra West Roastery
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAEDCD]/75 font-sans-body">
              <li>
                <a href="#menu" className="hover:text-[#D4A373] transition-colors">
                  Estate Whole Beans &amp; Manual Filters
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4A373] transition-colors">
                  Aeropress, Pour-Overs &amp; Nitro Brew
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4A373] transition-colors">
                  Garlic Thecha Sourdough &amp; Croissants
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#D4A373] transition-colors">
                  Chikmagalur, Coorg &amp; Shevaroys Estates
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#D4A373] transition-colors">
                  Table Reservations &amp; Slow Bar
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#D4A373] transition-colors">
                  Bandra West Location &amp; Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Box */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-tech font-bold text-[#D4A373]">
              The Roaster’s Journal
            </h4>
            <p className="font-editorial italic text-xs text-[#FAEDCD]/75 leading-relaxed">
              Subscribe for new single-estate harvest drops, invitation-only cupping sessions in Bandra, and home brewing recipes from our head roaster.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#FAEDCD]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#2B2B2B] border border-[#D4A373]/30 text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-tactile px-5 py-2.5 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] text-xs font-headline font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Subscribe'}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-[#D4A373] font-semibold block animate-in fade-in">
                  ✓ Thank you for subscribing to Grey Soul Coffee Roasters.
                </span>
              )}
            </form>

            <div className="pt-2 text-[11px] font-tech text-[#FAEDCD]/50 space-y-1">
              <p>Direct Order Line: +91-93220-36559</p>
              <p>Email: sakshi@greysoul.coffee</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Developer Credit, & Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAEDCD]/70 font-tech">
          <div>
            © {new Date().getFullYear()} GREY SOUL COFFEE ROASTERS. Bandra West, Mumbai, Maharashtra.
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end">
            {/* Required Developer Credit */}
            <span className="px-3.5 py-1.5 rounded-xl bg-[#2B2B2B] text-[#D4A373] border border-[#D4A373]/40 font-tech font-bold text-[11px] shadow-sm tracking-wide">
              Crafted by JRK Agency
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#2B2B2B] hover:bg-[#D4A373] hover:text-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/30 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              aria-label="Scroll to top of page"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-bold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
