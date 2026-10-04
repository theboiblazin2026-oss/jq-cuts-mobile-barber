import React, { useState, useEffect } from 'react';
import { Phone, Instagram, Calendar, Menu, X, Scissors } from 'lucide-react';
import { BARBER_INFO } from '../data/barberData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-700 shadow-md group-hover:scale-105 transition-transform">
            <img
              src="./logo.png"
              alt="JQ Cuts Master Barber Logo"
              className="w-full h-full object-cover rounded-full bg-black"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold tracking-wider text-xl gold-gradient-text">
                JQ CUTS
              </span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30">
                Atlanta VIP
              </span>
            </div>
            <span className="text-xs text-neutral-400 tracking-widest uppercase font-medium">
              Pressure Made • Master Barber
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#schedule" className="hover:text-amber-400 transition-colors">
            Schedule & Hours
          </a>
          <a href="#services" className="hover:text-amber-400 transition-colors">
            Services & Pricing
          </a>
          <a href="#service-area" className="hover:text-amber-400 transition-colors">
            Atlanta Territory
          </a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors">
            Portfolio
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">
            Reviews
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={BARBER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-amber-400 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 px-3 py-2 rounded-full transition-all"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            <span>{BARBER_INFO.instagram}</span>
          </a>

          <a
            href={`tel:${BARBER_INFO.phone}`}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-100 hover:text-amber-300 bg-neutral-900/80 border border-amber-500/30 px-3.5 py-2 rounded-full transition-all shadow-inner"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{BARBER_INFO.phoneFormatted}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-full group bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 group-hover:from-yellow-400 group-hover:to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 font-bold tracking-wide flex items-center gap-1.5 text-black">
              <Calendar className="w-4 h-4" />
              Book House Call
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black flex items-center gap-1 shadow-md"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-amber-500/20 px-6 py-6 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3.5 text-base font-medium text-neutral-200">
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-1 hover:text-amber-400 border-b border-neutral-800/60"
            >
              <span>Booking Schedule & Hours</span>
              <span className="text-xs text-amber-400">Sun/Mon/Late Night</span>
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-1 hover:text-amber-400 border-b border-neutral-800/60"
            >
              <span>Services & Pricing</span>
              <span className="text-xs text-amber-400">View Menu</span>
            </a>
            <a
              href="#service-area"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-1 hover:text-amber-400 border-b border-neutral-800/60"
            >
              <span>Metro Atlanta Territory</span>
              <span className="text-xs text-amber-400">Travel Rates</span>
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-1 hover:text-amber-400 border-b border-neutral-800/60"
            >
              <span>Haircut Portfolio</span>
              <span className="text-xs text-amber-400">Gallery</span>
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-1 hover:text-amber-400"
            >
              <span>Client Reviews</span>
              <span className="text-xs text-amber-400">5.0 ★</span>
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={`tel:${BARBER_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call Direct: {BARBER_INFO.phoneFormatted}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Calendar className="w-4 h-4 text-black" />
              Schedule VIP Mobile Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
