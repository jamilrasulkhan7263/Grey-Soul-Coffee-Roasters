import React, { useState } from 'react';
import { CartItem } from '../types/cafe';
import {
  MessageCircle,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Coffee,
  CheckCircle,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

interface WhatsAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const WhatsAppDrawer: React.FC<WhatsAppDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway' | 'Bean Delivery'>('Dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [grindOption, setGrindOption] = useState<'Whole Beans' | 'Pour-Over V60' | 'Aeropress' | 'Espresso' | 'French Press'>('Whole Beans');
  const [specialNote, setSpecialNote] = useState('');

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const hasSpecialtyBeans = cart.some((ci) => ci.item.category === 'Specialty Beans');

  const handleSendToWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsText = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} (${ci.item.category}) — ₹${ci.item.price * ci.quantity}`
      )
      .join('\n');

    let msg = `*☕ GREY SOUL COFFEE ROASTERS — BANDRA WEST ORDER*\n`;
    msg += `*Order Line:* +91-93220-36559\n`;
    msg += `*Hours:* Daily 08:00 AM – 10:00 PM\n`;
    msg += `*Location:* Bandra West, Mumbai, Maharashtra\n`;
    msg += `--------------------------------\n`;
    msg += `*Customer:* ${customerName.trim() || 'Guest'}\n`;
    msg += `*Order Type:* ${orderType}${
      orderType === 'Dine-in' && tableNumber ? ` (Table/Counter ${tableNumber})` : ''
    }\n`;

    if (hasSpecialtyBeans) {
      msg += `*Grind Preference:* ${grindOption}\n`;
    }

    msg += `\n*Items & Beans Selected:*\n${itemsText}\n\n`;
    msg += `*Subtotal:* ₹${subtotal} (Incl. all taxes)\n`;

    if (specialNote.trim()) {
      msg += `*Special Instructions:* ${specialNote.trim()}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `Please confirm my order and prep time at Grey Soul Bandra West!`;

    const encoded = encodeURIComponent(msg);
    // Direct pre-filled orders to +919322036559
    window.open(`https://wa.me/919322036559?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Bottom-Right WhatsApp Quick-Order Action Button */}
      <aside aria-label="WhatsApp quick order actions" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={isOpen ? onClose : onOpen}
          className="btn-tactile relative px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_15px_35px_rgba(37,211,102,0.35)] hover:shadow-[0_20px_45px_rgba(37,211,102,0.45)] transition-all duration-300 flex items-center gap-3 border-2 border-[#D4A373] group cursor-pointer"
          aria-label="Open WhatsApp quick-order drawer"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-white" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-3 -right-3 min-w-[22px] h-5 px-1 bg-[#1E1E1E] text-[#D4A373] font-tech text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#D4A373] shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-headline font-black uppercase tracking-wider leading-none">
              Order via WhatsApp
            </span>
            <span className="text-[10px] text-white/90 font-tech font-semibold mt-0.5">
              +91-93220-36559
            </span>
          </div>
        </button>
      </aside>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-300"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 max-w-full w-full sm:max-w-md bg-[#1E1E1E] text-[#FAEDCD] z-50 shadow-2xl flex flex-col border-l border-[#D4A373]/30 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D4A373]/20 bg-[#2B2B2B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E1E1E] text-[#D4A373] flex items-center justify-center border border-[#D4A373]/40">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold text-[#FAEDCD]">
                WhatsApp Quick Order
              </h2>
              <p className="text-[11px] font-tech text-[#D4A373]">
                Grey Soul Coffee Roasters · Bandra West
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#FAEDCD]/60 hover:text-[#FAEDCD] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Official Order Details Banner */}
          <div className="p-3.5 rounded-2xl bg-[#2B2B2B] border border-[#D4A373]/25 text-xs font-tech space-y-1">
            <div className="flex items-center gap-2 text-[#D4A373]">
              <Clock className="w-3.5 h-3.5" />
              <span>Roastery &amp; Bar: Open Daily 08:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-[#FAEDCD]/75">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bandra West, Mumbai · Direct Line: +91-93220-36559</span>
            </div>
          </div>

          {/* Cart Item List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 bg-[#2B2B2B]/60 rounded-3xl p-6 border border-[#D4A373]/20">
              <Coffee className="w-12 h-12 text-[#D4A373]/40 mx-auto mb-3" />
              <h3 className="font-headline text-base font-bold text-[#FAEDCD] mb-1">
                Your order draft is empty
              </h3>
              <p className="text-xs text-[#FAEDCD]/60 max-w-xs mx-auto mb-4">
                Explore our estate whole beans, manual brew filters, aeropress brews, or fresh bakes to build your WhatsApp order.
              </p>
              <button
                onClick={onClose}
                className="btn-tactile px-5 py-2.5 rounded-xl bg-[#D4A373] text-[#1E1E1E] text-xs font-headline font-bold uppercase tracking-wider cursor-pointer"
              >
                Browse Menu &amp; Beans
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-tech text-[#FAEDCD]/70 pb-1">
                <span>Selected Items ({totalItemsCount})</span>
                <button
                  onClick={onClearCart}
                  className="text-red-400 hover:text-red-300 cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {cart.map((ci) => (
                <div
                  key={ci.item.id}
                  className="p-3.5 rounded-2xl bg-[#2B2B2B] border border-[#D4A373]/20 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{ci.item.emoji}</span>
                      <h4 className="font-headline text-xs font-bold text-[#FAEDCD] truncate">
                        {ci.item.name}
                      </h4>
                    </div>
                    <div className="text-[11px] font-tech text-[#D4A373] mt-0.5">
                      ₹{ci.item.price} each · {ci.item.category}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-[#1E1E1E] rounded-xl px-2 py-1 border border-[#D4A373]/25">
                    <button
                      onClick={() => onUpdateQuantity(ci.item.id, -1)}
                      className="text-[#FAEDCD]/60 hover:text-[#FAEDCD] p-1 cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-tech font-bold text-[#FAEDCD] min-w-[16px] text-center">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(ci.item.id, 1)}
                      className="text-[#FAEDCD]/60 hover:text-[#FAEDCD] p-1 cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(ci.item.id)}
                    className="text-[#FAEDCD]/40 hover:text-red-400 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Customer Customization Form */}
          {cart.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#D4A373]/20">
              <div>
                <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sakshi / Aryan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2B2B2B] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 border border-[#D4A373]/25 focus:outline-none focus:ring-1 focus:ring-[#D4A373]"
                />
              </div>

              {/* Order Type */}
              <div>
                <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-1.5">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Dine-in', 'Takeaway', 'Bean Delivery'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-2 px-2 rounded-xl text-xs font-tech font-bold transition-all cursor-pointer ${
                        orderType === type
                          ? 'bg-[#D4A373] text-[#1E1E1E]'
                          : 'bg-[#2B2B2B] text-[#FAEDCD]/70 hover:bg-[#333333]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Option if Specialty Beans present */}
              {hasSpecialtyBeans && (
                <div>
                  <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-[#D4A373] mb-1.5">
                    Bean Grind Preference
                  </label>
                  <select
                    value={grindOption}
                    onChange={(e) => setGrindOption(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#2B2B2B] text-xs text-[#FAEDCD] border border-[#D4A373]/30 focus:outline-none cursor-pointer"
                  >
                    <option value="Whole Beans">Whole Beans (Recommended for freshness)</option>
                    <option value="Pour-Over V60">V60 / Kalita Filter Grind</option>
                    <option value="Aeropress">Aeropress Grind</option>
                    <option value="Espresso">Fine Espresso Grind</option>
                    <option value="French Press">Coarse French Press / Cold Brew</option>
                  </select>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-[#FAEDCD]/80 mb-1.5">
                  Special Notes / Brewing Request
                </label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Extra hot oat milk, whole beans unground..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2B2B2B] text-xs text-[#FAEDCD] placeholder:text-[#FAEDCD]/30 border border-[#D4A373]/25 focus:outline-none focus:ring-1 focus:ring-[#D4A373] resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer & WhatsApp Trigger */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#D4A373]/20 bg-[#2B2B2B] space-y-4">
            <div className="flex items-center justify-between font-headline">
              <span className="text-xs uppercase tracking-wider text-[#FAEDCD]/70">Subtotal</span>
              <span className="text-xl font-extrabold text-[#D4A373]">₹{subtotal}</span>
            </div>

            <button
              onClick={handleSendToWhatsApp}
              className="btn-tactile w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-400/30"
            >
              <Send className="w-4 h-4" />
              <span>Send Pre-Filled Order to +919322036559</span>
            </button>

            <p className="text-[10px] font-tech text-center text-[#FAEDCD]/50">
              Opens WhatsApp chat with Grey Soul Coffee Roasters (Bandra West).
            </p>
          </div>
        )}
      </div>
    </>
  );
};
