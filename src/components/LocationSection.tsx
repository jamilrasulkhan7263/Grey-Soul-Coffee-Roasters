import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Wifi,
  Sparkles,
  Car,
  Dog,
  ExternalLink,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState<{
    isOpen: boolean;
    statusText: string;
    subText: string;
    currentTimeStr: string;
  }>({
    isOpen: false,
    statusText: 'Checking...',
    subText: '',
    currentTimeStr: '',
  });

  // Calculate live store status based on local system time (08:00 AM to 10:00 PM Monday-Sunday)
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 8 * 60; // 08:00 AM (480 mins)
      const closeMinutes = 22 * 60; // 10:00 PM (1320 mins)

      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      const timeFormatter = new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });

      const currentTimeStr = timeFormatter.format(now);

      if (isOpen) {
        setStoreStatus({
          isOpen: true,
          statusText: 'Open Now',
          subText: 'Closes at 10:00 PM tonight',
          currentTimeStr,
        });
      } else {
        const opensNext =
          currentMinutes < openMinutes
            ? 'Opens today at 08:00 AM'
            : 'Opens tomorrow at 08:00 AM';
        setStoreStatus({
          isOpen: false,
          statusText: 'Closed Now',
          subText: opensNext,
          currentTimeStr,
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="location" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Grey Soul Roastery &amp; Tasting Room
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAEDCD] tracking-tight mb-4">
            Visit Us in Bandra{' '}
            <span className="font-editorial italic font-normal text-[#D4A373]">
              West
            </span>
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed font-normal">
            Located in the vibrant cultural heart of Bandra West, Mumbai. Join us for morning manual pour-overs, freshly baked croissants, and direct-trade estate beans.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Live Status Badge, Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-10 border border-[#D4A373]/25 shadow-xl">
            <div>
              {/* Dynamic Live Status Indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E1E1E] border border-[#D4A373]/30 mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    storeStatus.isOpen ? 'bg-[#25D366] animate-pulse' : 'bg-red-400'
                  }`}
                />
                <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]">
                  {storeStatus.statusText} · {storeStatus.subText}
                </span>
              </div>

              <h3 className="font-headline text-2xl font-bold text-[#FAEDCD] mb-4">
                Grey Soul Coffee Roasters
              </h3>

              {/* Contact Details List */}
              <div className="space-y-4 text-xs sm:text-sm text-[#FAEDCD]/85 font-sans-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#FAEDCD]">Roastery &amp; Tasting Room</strong>
                    <span>Bandra West, Mumbai, Maharashtra 400050</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#FAEDCD]">Operating Hours</strong>
                    <span>Monday – Sunday: 08:00 AM – 10:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#FAEDCD]">Phone / Order Line</strong>
                    <a href="tel:+919322036559" className="text-[#D4A373] hover:underline font-tech font-bold">
                      +91-93220-36559
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#FAEDCD]">Direct Contact Email</strong>
                    <a href="mailto:sakshi@greysoul.coffee" className="text-[#D4A373] hover:underline">
                      sakshi@greysoul.coffee
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Roastery Amenities */}
            <div className="pt-6 border-t border-[#D4A373]/15">
              <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-[#D4A373] block mb-3">
                Space Amenities
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#FAEDCD]/75 font-tech">
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>300 Mbps Fiber WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dog className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Pet-Friendly Verandah</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Valet Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Slow Pour-Over Bar</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="btn-tactile flex-1 py-3 px-4 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm text-center border border-[#D4A373]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:+919322036559"
                className="btn-tactile py-3 px-4 rounded-2xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/30 font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#252525]"
                title="Call Order Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Minimalist Bandra West Map Card */}
          <div className="lg:col-span-7 bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-10 border border-[#D4A373]/25 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Map Grid Graphics */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-[#1E1E1E] border border-[#D4A373]/20 overflow-hidden flex items-center justify-center">
              {/* Architectural Grid lines */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #D4A373 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Stylized street lines */}
              <svg className="absolute inset-0 w-full h-full text-[#D4A373]/15" xmlns="http://www.w3.org/2000/svg">
                <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="20%" y1="10%" x2="20%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="currentColor" strokeWidth="3" />
                <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="currentColor" strokeWidth="3" />
                <path d="M 15% 85% Q 45% 45% 85% 35%" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>

              {/* Pinpoint Radar Pulse */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#D4A373]/20 animate-ping absolute inset-0" />
                  <div className="w-12 h-12 rounded-full bg-[#D4A373] text-[#1E1E1E] flex items-center justify-center shadow-lg relative border-2 border-[#1E1E1E]">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 rounded-2xl bg-[#2B2B2B]/95 border border-[#D4A373]/40 shadow-xl backdrop-blur-md text-center">
                  <span className="font-headline font-bold text-xs text-[#FAEDCD] block">
                    Grey Soul Coffee Roasters
                  </span>
                  <span className="text-[10px] font-tech text-[#D4A373] uppercase tracking-wider block">
                    Bandra West, Mumbai
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Travel Proximities */}
            <div className="mt-6 pt-6 border-t border-[#D4A373]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-tech text-[#FAEDCD]/80">
              <div className="p-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/20">
                <span className="text-[#D4A373] font-bold block mb-0.5">Linking Road</span>
                <span>3 mins walking distance</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/20">
                <span className="text-[#D4A373] font-bold block mb-0.5">Bandra Station</span>
                <span>8 mins cab ride</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/20">
                <span className="text-[#D4A373] font-bold block mb-0.5">Carter Road</span>
                <span>5 mins to promenade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
