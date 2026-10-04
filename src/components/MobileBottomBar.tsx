import React from 'react';
import { Phone, MessageSquare, Calendar, Instagram, Scissors } from 'lucide-react';
import { BARBER_INFO } from '../data/barberData';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-amber-500/20 px-3 py-2 pb-safe shadow-2xl">
      <div className="flex items-center justify-around">
        
        {/* Call Now */}
        <a
          href={`tel:${BARBER_INFO.phone}`}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors p-1"
        >
          <Phone className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-semibold">Call</span>
        </a>

        {/* Text / SMS */}
        <a
          href={`sms:${BARBER_INFO.phone}?body=${encodeURIComponent("Hey JQ, I'd like to ask about booking a VIP mobile haircut.")}`}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-emerald-400 transition-colors p-1"
        >
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-semibold">SMS</span>
        </a>

        {/* Big Pulsing Book Button */}
        <button
          onClick={onOpenBooking}
          className="relative -top-4 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 text-black flex items-center justify-center shadow-lg shadow-amber-500/40 group-active:scale-95 transition-all border-2 border-black">
            <Scissors className="w-6 h-6 text-black" />
          </div>
          <span className="text-[10px] font-extrabold text-amber-400 mt-0.5 tracking-wide">BOOK NOW</span>
        </button>

        {/* View Services */}
        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors p-1"
        >
          <Calendar className="w-5 h-5 text-neutral-300" />
          <span className="text-[10px] font-semibold">Prices</span>
        </a>

        {/* Instagram */}
        <a
          href={BARBER_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-pink-400 transition-colors p-1"
        >
          <Instagram className="w-5 h-5 text-pink-400" />
          <span className="text-[10px] font-semibold">Gallery</span>
        </a>

      </div>
    </div>
  );
};
