import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Scissors, Instagram, Phone } from 'lucide-react';
import { BARBER_INFO } from '../data/barberData';

interface MasterBarberBioProps {
  onOpenBooking: () => void;
}

export const MasterBarberBio: React.FC<MasterBarberBioProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/30 relative overflow-hidden">
          
          {/* Subtle Barber Pole Graphic on Border */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Logo Emblem & Barber Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-60 h-60 rounded-3xl overflow-hidden p-2 bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-700 shadow-2xl mb-6">
                <img
                  src="./logo.png"
                  alt="Jaquan - JQ Cuts Master Barber"
                  className="w-full h-full object-cover rounded-2xl bg-black"
                />
              </div>

              <h3 className="text-2xl font-extrabold font-heading text-white">
                Jaquan (JQ)
              </h3>
              <p className="text-sm font-semibold gold-gradient-text">
                Licensed Master Barber & Founder
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Pressure Made • Serving Metro Atlanta, GA
              </p>

              <div className="flex items-center gap-3 mt-4">
                <a
                  href={BARBER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-pink-400 hover:text-pink-300 hover:border-pink-500 transition-colors"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${BARBER_INFO.phone}`}
                  className="p-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-amber-400 hover:text-amber-300 hover:border-amber-500 transition-colors"
                  aria-label="Call Direct"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Bio & Barber Philosophy Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                The Master Barber Standard
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                "Pressure Made. Your Appearance Is Your Signature."
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Welcome to <strong>JQ Cuts</strong>. Founded on the principle that luxury grooming should fit your busy lifestyle. Whether you are an executive in Buckhead, an artist in Midtown, or need a late-night private session after 10 PM, I bring the entire sterile master barbershop directly to your living room or penthouse.
              </p>

              {/* 3 Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <Scissors className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Blade Craft</h4>
                  <p className="text-xs text-neutral-400 mt-1">Straight razor sharpness & surgical symmetry.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Sterile Suite</h4>
                  <p className="text-xs text-neutral-400 mt-1">Hospital-grade sanitization & floor barrier.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <HeartHandshake className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Discreet VIP</h4>
                  <p className="text-xs text-neutral-400 mt-1">Private, unhurried, one-on-one attention.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer text-center"
                >
                  Book With Master Barber Jaquan
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
