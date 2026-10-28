import React, { useState, useEffect } from 'react';
import { ReservationData } from '../types/cafe';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Users,
  MapPin,
  Navigation,
  CheckCircle2,
  Coffee,
  MessageCircle,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationContactPageProps {
  onReservationConfirmed: (res: ReservationData) => void;
  onExploreMenu: () => void;
}

const TIME_SLOTS = [
  '08:00 AM',
  '09:30 AM',
  '11:00 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
  '09:00 PM',
];

export const ReservationContactPage: React.FC<ReservationContactPageProps> = ({
  onReservationConfirmed,
  onExploreMenu,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: today,
    time: '11:00 AM',
    guests: 2,
    seatingPreference: 'Slow Brew & Cupping Bar',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    data: ReservationData;
    bookingCode: string;
  } | null>(null);

  // Dynamic Open/Closed Status for Bandra West Roastery (08:00 AM - 10:00 PM Daily)
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

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 8 * 60; // 08:00 AM
      const closeMinutes = 22 * 60; // 10:00 PM

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setConfirmedBooking({
        data: { ...formData },
        bookingCode: code,
      });

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#FAEDCD', '#1E1E1E'],
      });

      onReservationConfirmed(formData);
    }, 750);
  };

  const handleShareWhatsApp = () => {
    if (!confirmedBooking) return;
    const { data, bookingCode } = confirmedBooking;
    const text = encodeURIComponent(
      `Hello Grey Soul Coffee Roasters Bandra West! I have a table reservation request:\n\n*Booking Code:* ${bookingCode}\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n${
        data.email ? `*Email:* ${data.email}\n` : ''
      }*Guests:* ${data.guests} person(s)\n*Date:* ${data.date}\n*Time:* ${data.time}\n*Preferred Seating:* ${data.seatingPreference}\n${
        data.specialRequests ? `*Special Request:* ${data.specialRequests}\n` : ''
      }\nLooking forward to tasting your direct-trade single-origin roasts!`
    );
    // WhatsApp direct booking line: +919322036559
    window.open(`https://wa.me/919322036559?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FAEDCD] pb-24 animate-in fade-in duration-300">
      {/* 1. Page Header & Introduction */}
      <section className="pt-12 pb-14 lg:pt-16 lg:pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373]">
                Reservation &amp; Official Contact · Page 5
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-[#FAEDCD] tracking-tight mb-5 leading-[1.08] text-balance">
              Reserve a Table &amp; Contact Us
            </h1>

            <p className="font-editorial italic text-base sm:text-xl text-[#FAEDCD]/85 leading-relaxed max-w-2xl mx-auto">
              Whether you are stopping by for a quiet morning V60 pour-over, an afternoon cupping flight, or an evening gathering over sourdough toasties, we hold a seat for you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container: Booking Form */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2B2B2B] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#D4A373]/25 shadow-2xl relative overflow-hidden">
            {confirmedBooking ? (
              /* Success Voucher View */
              <div className="text-center py-6 max-w-md mx-auto animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#D4A373] text-[#1E1E1E] flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(212,163,115,0.4)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-1">
                  Table Secured Successfully
                </span>
                <h3 className="font-headline text-3xl font-black text-[#FAEDCD] mb-2 tracking-tight">
                  Welcome to Grey Soul, {confirmedBooking.data.name}!
                </h3>
                <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/80 mb-6">
                  Your reservation request is registered. Send this voucher directly to our Bandra West WhatsApp order desk for instant confirmation.
                </p>

                {/* Booking Voucher Summary */}
                <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#D4A373]/25 text-left space-y-3 mb-6 shadow-inner">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4A373]/20">
                    <span className="text-[11px] font-tech text-[#FAEDCD]/60 uppercase tracking-wider font-bold">
                      Booking Reference
                    </span>
                    <span className="font-tech font-bold text-base text-[#D4A373] bg-[#2B2B2B] px-3.5 py-1 rounded-xl border border-[#D4A373]/20">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#FAEDCD]/60 block mb-0.5 font-tech">Date &amp; Time</span>
                      <span className="font-headline font-bold text-[#FAEDCD]">
                        {confirmedBooking.data.date} at {confirmedBooking.data.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#FAEDCD]/60 block mb-0.5 font-tech">Party Size</span>
                      <span className="font-bold text-[#FAEDCD]">
                        {confirmedBooking.data.guests} Guest(s)
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#FAEDCD]/60 block mb-0.5 font-tech">Seating Zone</span>
                      <span className="font-bold text-[#D4A373]">
                        {confirmedBooking.data.seatingPreference}
                      </span>
                    </div>
                    {confirmedBooking.data.specialRequests && (
                      <div className="col-span-2">
                        <span className="text-[#FAEDCD]/60 block mb-0.5 font-tech">Special Note</span>
                        <span className="text-[#FAEDCD]/85 italic">
                          "{confirmedBooking.data.specialRequests}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full sm:w-1/2 py-4 rounded-xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,163,115,0.4)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1E1E1E]" />
                    <span>Send to +919322036559</span>
                  </button>
                  <button
                    onClick={() => setConfirmedBooking(null)}
                    className="w-full sm:w-1/2 py-4 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/25 hover:bg-[#252525] hover:text-[#D4A373] text-xs sm:text-sm font-bold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95 cursor-pointer"
                  >
                    Reserve Another Table
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sakshi / Rohan"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Mobile / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91-93220-36559"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sakshi@greysoul.coffee"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                          <option key={num} value={num} className="bg-[#1E1E1E] text-[#FAEDCD]">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Reservation Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] cursor-pointer"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#1E1E1E] text-[#FAEDCD]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seating Zones */}
                <div>
                  <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-3">
                    Select Your Roastery Seating Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        title: 'Slow Brew & Cupping Bar',
                        desc: 'Front-row view of EK43 grinders and manual pour-over taps.',
                      },
                      {
                        title: 'Espresso Tasting Counter',
                        desc: 'Quick barista dialogue and seasonal single-origin flights.',
                      },
                      {
                        title: 'Bandra West Courtyard',
                        desc: 'Open-air pet-friendly patio under natural shade.',
                      },
                      {
                        title: 'Roaster Mezzanine',
                        desc: 'Quiet focus nook with high-speed fiber WiFi and power.',
                      },
                    ].map((zone) => (
                      <button
                        key={zone.title}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            seatingPreference: zone.title as any,
                          })
                        }
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer active:scale-95 ${
                          formData.seatingPreference === zone.title
                            ? 'bg-[#1E1E1E] border-[#D4A373] text-[#FAEDCD] shadow-[0_0_15px_rgba(212,163,115,0.25)]'
                            : 'bg-[#1E1E1E]/60 border-[#D4A373]/20 text-[#FAEDCD]/70 hover:bg-[#1E1E1E]'
                        }`}
                      >
                        <span className="text-xs font-bold block mb-1 text-[#D4A373]">{zone.title}</span>
                        <span className="text-[11px] text-[#FAEDCD]/70 block leading-tight">
                          {zone.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-tech font-bold text-[#FAEDCD] uppercase tracking-wider mb-2">
                    Special Requests &amp; Brewing Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. Guided single-origin cupping flight, plant-based oat milk only, quiet corner for laptop focus..."
                    className="w-full p-4 rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 text-xs sm:text-sm text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A373] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#FAEDCD]/70 font-tech">
                    <p>Direct Order &amp; Helpline: <strong className="text-[#D4A373]">+91-93220-36559</strong></p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-bold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:shadow-[0_0_25px_rgba(212,163,115,0.6)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Your Table...</span>
                      </>
                    ) : (
                      <>
                        <Coffee className="w-4 h-4" />
                        <span>Reserve Table at Grey Soul Bandra</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Official Contact & Location Details */}
      <section className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B2B2B] border border-[#D4A373]/25 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D4A373] font-tech">
              Bandra West Coordinates
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FAEDCD] mb-3">
            Location, Official Contact &amp; Hours
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed">
            Roastery &amp; Tasting Room Open Daily: 08:00 AM – 10:00 PM.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Contact Box */}
          <div className="lg:col-span-5 bg-[#2B2B2B] rounded-[2.5rem] p-8 border border-[#D4A373]/25 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              {/* Dynamic Live Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1E1E] border border-[#D4A373]/25 mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    storeStatus.isOpen ? 'bg-[#25D366] animate-pulse' : 'bg-red-400'
                  }`}
                />
                <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]">
                  {storeStatus.statusText} · {storeStatus.subText}
                </span>
              </div>

              <h3 className="font-headline text-2xl font-black text-[#FAEDCD] mb-1">
                GREY SOUL COFFEE ROASTERS
              </h3>
              <p className="text-xs font-tech text-[#D4A373] uppercase tracking-wider mb-5">
                Bandra West, Mumbai Flagship
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-[#FAEDCD]/85 font-sans-body">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E1E1E] border border-[#D4A373]/25 flex items-center justify-center text-[#D4A373] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#FAEDCD]">Location:</strong>
                    <span>Bandra West, Mumbai, Maharashtra 400050</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E1E1E] border border-[#D4A373]/25 flex items-center justify-center text-[#D4A373] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#FAEDCD]">Hours:</strong>
                    <span>Roastery &amp; Tasting Room Open Daily: 08:00 AM – 10:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E1E1E] border border-[#D4A373]/25 flex items-center justify-center text-[#D4A373] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#FAEDCD]">Phone / Order Line:</strong>
                    <a href="tel:+919322036559" className="text-[#D4A373] font-tech font-bold hover:underline">
                      +91-93220-36559
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1E1E1E] border border-[#D4A373]/25 flex items-center justify-center text-[#D4A373] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#FAEDCD]">Direct Contact Email:</strong>
                    <a href="mailto:sakshi@greysoul.coffee" className="text-[#D4A373] hover:underline">
                      sakshi@greysoul.coffee
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-[#D4A373]/20 flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=Bandra+West+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="btn-tactile flex-1 py-3.5 px-4 rounded-xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,163,115,0.3)] hover:shadow-[0_0_20px_rgba(212,163,115,0.45)] text-center transition-all duration-300 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate</span>
              </a>

              <a
                href="https://wa.me/919322036559"
                target="_blank"
                rel="noreferrer"
                className="btn-tactile py-3.5 px-4 rounded-xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/25 font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:text-[#D4A373] transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Mockup */}
          <div className="lg:col-span-7 bg-[#2B2B2B] rounded-[2.5rem] p-6 sm:p-8 border border-[#D4A373]/25 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl bg-[#1E1E1E] border border-[#D4A373]/25 overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #D4A373 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 text-center">
                <div className="w-14 h-14 rounded-full bg-[#D4A373] text-[#1E1E1E] flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(212,163,115,0.4)]">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="bg-[#2B2B2B]/95 px-5 py-2.5 rounded-2xl border border-[#D4A373]/30 shadow-2xl backdrop-blur-md">
                  <span className="font-headline font-bold text-sm text-[#FAEDCD] block">
                    GREY SOUL COFFEE ROASTERS
                  </span>
                  <span className="text-[10px] font-tech text-[#D4A373] block">
                    Bandra West, Mumbai
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D4A373]/20 flex items-center justify-between text-xs font-tech text-[#FAEDCD]/70">
              <span>Valet Parking Available</span>
              <span className="text-[#D4A373] font-bold">Crafted by JRK Agency</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
