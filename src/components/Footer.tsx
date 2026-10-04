import React from 'react';
import { Phone, Instagram, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { BARBER_INFO } from '../data/barberData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#070707] border-t border-neutral-800/80 pt-16 pb-24 md:pb-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-700">
                <img src="/logo.png" alt="JQ Cuts Logo" className="w-full h-full object-cover rounded-full bg-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-lg gold-gradient-text">JQ CUTS</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                    PRESSURE MADE
                  </span>
                </div>
                <p className="text-xs text-neutral-400">Master Barber • VIP Mobile Services</p>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Delivering high-end mobile haircuts and grooming throughout Downtown, Midtown, Buckhead, Sandy Springs, Alpharetta, and all Metro Atlanta.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BARBER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-pink-500/40 text-neutral-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BARBER_INFO.phone}`}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#schedule" className="hover:text-amber-400 transition-colors">Booking Schedule & Hours</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Services & Pricing Menu</a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-amber-400 transition-colors">Atlanta Territory & Travel Rates</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">Haircut & Lineup Portfolio</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Client Reviews & Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Barber Direct Line
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BARBER_INFO.phone}`} className="text-white hover:text-amber-300 font-bold">
                  {BARBER_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={BARBER_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {BARBER_INFO.instagram}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BARBER_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BARBER_INFO.primaryArea}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-xs shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Schedule VIP Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} JQ Cuts Master Barber • Pressure Made. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Georgia Licensed Master Barber • Appointments Only
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
