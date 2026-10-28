import React, { useState } from 'react';
import { ReservationData } from '../types/cafe';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  CheckCircle,
  MessageCircle,
  Coffee,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationSectionProps {
  onReservationConfirmed: (reservation: ReservationData) => void;
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

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationConfirmed,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setConfirmedBooking({
        data: { ...formData },
        bookingCode: code,
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#FAEDCD', '#1E1E1E'],
      });

      onReservationConfirmed(formData);
    }, 600);
  };

  const handleShareWhatsApp = () => {
    if (!confirmedBooking) return;
    const { data, bookingCode } = confirmedBooking;
    const text = encodeURIComponent(
      `Hello Grey Soul Coffee Roasters Bandra West! I have a table reservation request:\n\n*Booking Code:* ${bookingCode}\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n${data.email ? `*Email:* ${data.email}\n` : ''}*Guests:* ${data.guests} person(s)\n*Date:* ${data.date}\n*Time:* ${data.time}\n*Preferred Seating:* ${data.seatingPreference}\n${
        data.specialRequests ? `*Special Request:* ${data.specialRequests}\n` : ''
      }\nLooking forward to tasting your direct-trade single-origin roasts!`
    );
    window.open(`https://wa.me/919322036559?text=${text}`, '_blank');
  };

  return (
    <section id="reservation" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#D4A373]">
              Bandra West Tasting Room
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAEDCD] tracking-tight mb-4">
            Reserve Your Tasting Table
          </h2>
          <p className="text-[#FAEDCD]/75 text-sm sm:text-base leading-relaxed">
            Join our slow-brew bar for guided estate cuppings, aeropress flights, or an unhurried work session with single-origin espresso and sourdough toasties.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A373]/25 shadow-xl relative overflow-hidden">
          {confirmedBooking ? (
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-3xl bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto mb-5 border border-[#D4A373]/40 shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#FAEDCD] mb-3">
                We have your seat reserved, {confirmedBooking.data.name}!
              </h3>

              <div className="max-w-md mx-auto bg-[#1E1E1E] rounded-2xl p-6 border border-[#D4A373]/20 my-6 text-left space-y-2.5 font-sans-body text-xs sm:text-sm text-[#FAEDCD]/85 shadow-sm">
                <div className="flex justify-between border-b border-[#D4A373]/15 pb-2">
                  <span className="text-[#FAEDCD]/50">Booking Reference:</span>
                  <span className="font-tech font-bold text-[#D4A373]">{confirmedBooking.bookingCode}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4A373]/15 pb-2">
                  <span className="text-[#FAEDCD]/50">Date &amp; Time:</span>
                  <span className="font-semibold text-[#FAEDCD]">{confirmedBooking.data.date} at {confirmedBooking.data.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#D4A373]/15 pb-2">
                  <span className="text-[#FAEDCD]/50">Party Size:</span>
                  <span className="font-semibold text-[#FAEDCD]">{confirmedBooking.data.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAEDCD]/50">Seating Area:</span>
                  <span className="font-semibold text-[#D4A373]">{confirmedBooking.data.seatingPreference}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleShareWhatsApp}
                  className="btn-tactile px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="btn-tactile px-6 py-3.5 rounded-2xl bg-[#1E1E1E] text-[#FAEDCD] border border-[#D4A373]/30 font-headline font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#252525] active:scale-95"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91-93220-36559"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373] cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#1E1E1E] text-[#FAEDCD]">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373] cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num} className="bg-[#1E1E1E] text-[#FAEDCD]">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
                    Seating Experience
                  </label>
                  <div className="relative">
                    <Coffee className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.seatingPreference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seatingPreference: e.target.value as ReservationData['seatingPreference'],
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373] cursor-pointer"
                    >
                      <option value="Slow Brew & Cupping Bar">Slow Brew &amp; Cupping Bar</option>
                      <option value="Espresso Tasting Counter">Espresso Tasting Counter</option>
                      <option value="Bandra West Courtyard">Bandra West Courtyard</option>
                      <option value="Roaster Mezzanine">Roaster Mezzanine</option>
                      <option value="Any Available">Any Available</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-2">
                  Special Notes / Dietary / Brew Preference (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Interested in manual pour-over tasting flight, dairy-free oat milk only..."
                  className="w-full p-4 rounded-2xl bg-[#1E1E1E] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 border border-[#D4A373]/25 focus:outline-none focus:ring-2 focus:ring-[#D4A373] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-tech text-[#FAEDCD]/60">
                  Instant reservation request · Direct response via WhatsApp &amp; SMS
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tactile w-full sm:w-auto px-8 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-bold border border-[#D4A373] shadow-md active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#1E1E1E] border-t-transparent rounded-full animate-spin" />
                      <span>Securing Your Table...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Table Booking</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
