import React, { useState } from 'react';
import { BackgroundCanvas } from './components/3d/BackgroundCanvas';
import { Navbar, AppPage } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MenuSection } from './components/MenuSection';
import { OurStorySection } from './components/OurStorySection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { WhatsAppDrawer } from './components/WhatsAppDrawer';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { MenuOrderingPage } from './pages/MenuOrderingPage';
import { AboutStoryPage } from './pages/AboutStoryPage';
import { ExperienceGalleryPage } from './pages/ExperienceGalleryPage';
import { ReservationContactPage } from './pages/ReservationContactPage';
import { CartItem, MenuItem, ReservationData } from './types/cafe';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast notification
  const addToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add item to WhatsApp order list with optional quantity
  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });

    addToast(
      `Added ${item.name} (${quantity}x)`,
      `₹${item.price * quantity} queued for Grey Soul Bandra WhatsApp checkout.`,
      'info'
    );
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Table reservation confirmed callback
  const handleReservationConfirmed = (res: ReservationData) => {
    addToast(
      'Reservation Request Logged!',
      `Table for ${res.guests} on ${res.date} at ${res.time} noted for ${res.name} at Grey Soul Coffee Roasters Bandra West.`,
      'success'
    );
  };

  // Navigate to Page 5 (Reservation & Contact)
  const handleOpenReservation = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Explore menu navigates to Page 2 (Menu & Ordering Page)
  const handleExploreMenu = () => {
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open WhatsApp order drawer
  const handleOrderWhatsApp = () => {
    setIsCartOpen(true);
  };

  // Set of added item IDs for UI feedback
  const addedItemIds = new Set(cart.map((ci) => ci.item.id));
  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#1E1E1E] text-[#FAEDCD] overflow-x-hidden selection:bg-[#D4A373]/35 selection:text-[#FAEDCD]">
      {/* Subtle ambient CSS noise/grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Full-Viewport 3D Background Canvas */}
      <BackgroundCanvas />

      {/* Floating Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sticky Navigation Bar with Notification Ticker */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Multi-Page Views (Page 1 Flagship, Page 2 Menu, Page 3 Roasting & Estates, Page 4 Vibe, Page 5 Reserve & Contact) */}
      {currentPage === 'home' ? (
        /* PAGE 1: HOME / FLAGSHIP ROASTERY PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          {/* Two-Column Hero Section with Interactive 3D Canvas */}
          <HeroSection
            onExploreMenu={handleExploreMenu}
            onOrderWhatsApp={handleOrderWhatsApp}
          />

          <div className="gradient-divider my-2" />

          {/* Features & Highlights Section in Asymmetrical Deep Espresso Cards */}
          <FeaturesSection />

          <div className="gradient-divider my-2" />

          {/* Featured Menu Preview Section with CTA to Page 2 */}
          <MenuSection
            onAddToCart={(it) => handleAddToCart(it, 1)}
            addedItemIds={addedItemIds}
          />

          {/* Banner navigating to Page 2 (Menu & Ordering Page) */}
          <section className="py-8 px-4 max-w-7xl mx-auto">
            <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A373]/25 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-2">
                  Specialty Beans, Tasting Bar &amp; Bakery Pairings
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#FAEDCD] tracking-tight text-balance">
                  Looking for our full beans, slow brew &amp; bakery catalog?
                </h3>
                <p className="font-editorial italic text-base text-[#FAEDCD]/80 mt-2 max-w-xl">
                  Explore Bababudangiri Reserve, Shevaroys Floral Pour-Over, Garlic Thecha Sourdough, and Velvet Cascara Nitro on Page 2.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl bg-[#D4A373] hover:bg-[#c39262] text-[#1E1E1E] font-headline font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:shadow-[0_0_25px_rgba(212,163,115,0.6)] shrink-0 cursor-pointer relative z-10 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95"
              >
                Go to Menu &amp; Beans (P2) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Our Story Brief */}
          <OurStorySection />

          {/* Navigation link to Page 3 */}
          <section className="py-6 px-4 max-w-7xl mx-auto">
            <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-10 border border-[#D4A373]/25 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-1">
                  Direct-Trade South Indian Estates
                </span>
                <h4 className="font-headline text-xl sm:text-2xl font-bold text-[#FAEDCD] tracking-tight">
                  Small-Batch Micro-Roasting in Bandra West
                </h4>
                <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/75 mt-1 max-w-lg">
                  Explore direct partnerships with Chikmagalur, Coorg, and Shevaroys coffee estates and our cast-iron drum roast profiles.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#1E1E1E] text-[#D4A373] hover:bg-[#252525] hover:text-[#FAEDCD] border border-[#D4A373]/30 font-headline font-bold text-xs tracking-wide shadow-sm hover:shadow-lg shrink-0 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95"
              >
                Read Roasting Story (P3) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Tasting Room Experience Section */}
          <ExperienceSection />

          {/* Banner navigating to Page 4 (Experience & Gallery) */}
          <section className="py-6 px-4 max-w-7xl mx-auto">
            <div className="bg-[#2B2B2B] rounded-[2.5rem] p-8 sm:p-10 border border-[#D4A373]/25 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-1">
                  Roastery Floor &amp; Tasting Room
                </span>
                <h4 className="font-headline text-xl sm:text-2xl font-bold text-[#FAEDCD] tracking-tight">
                  Experience the Vibe of Grey Soul Bandra West
                </h4>
                <p className="font-sans-body text-xs sm:text-sm text-[#FAEDCD]/75 mt-1 max-w-lg">
                  Explore our manual slow pour-over counter, quiet focus mezzanine, and leafy pet-friendly Bandra courtyard.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('experience');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#D4A373] text-[#1E1E1E] hover:bg-[#c39262] font-headline font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(212,163,115,0.35)] hover:shadow-[0_0_25px_rgba(212,163,115,0.5)] shrink-0 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95"
              >
                Open Roastery Vibe (P4) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Table Reservation Engine Preview */}
          <ReservationSection
            onReservationConfirmed={handleReservationConfirmed}
          />

          <div className="gradient-divider my-2" />

          {/* Live Store Status & Map Section */}
          <LocationSection />
        </main>
      ) : currentPage === 'menu' ? (
        /* PAGE 2: MENU & ORDERING PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <MenuOrderingPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            addedItemIds={addedItemIds}
          />
        </main>
      ) : currentPage === 'story' ? (
        /* PAGE 3: ABOUT & STORY PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <AboutStoryPage
            onExploreMenu={() => {
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookTable={handleOpenReservation}
          />
        </main>
      ) : currentPage === 'experience' ? (
        /* PAGE 4: EXPERIENCE & GALLERY PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <ExperienceGalleryPage
            onExploreMenu={() => {
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookTable={handleOpenReservation}
          />
        </main>
      ) : (
        /* PAGE 5: RESERVATION & CONTACT PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <ReservationContactPage
            onReservationConfirmed={handleReservationConfirmed}
            onExploreMenu={handleExploreMenu}
          />
        </main>
      )}

      {/* Floating WhatsApp Quick-Order Widget */}
      <WhatsAppDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpen={() => setIsCartOpen(true)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Minimal Dark Charcoal & Roasted Amber Footer */}
      <Footer />
    </div>
  );
}
