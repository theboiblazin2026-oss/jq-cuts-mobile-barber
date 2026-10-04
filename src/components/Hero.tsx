import React from 'react';
import { Calendar, Phone, Star, Clock, MapPin, CheckCircle2, Sparkles, Moon } from 'lucide-react';
import { BARBER_INFO } from '../data/barberData';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Lighting & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-yellow-600/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/40 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="gold-gradient-text tracking-wider uppercase font-extrabold">💈 PRESSURE MADE</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">Metro Atlanta, GA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-heading">
              <span className="text-white">Premium Barber Services.</span>{' '}
              <br className="hidden sm:inline" />
              <span className="gold-gradient-text font-serif-luxury italic font-bold">
                Mobile & House Calls Across Atlanta.
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-body font-normal leading-relaxed">
              Skip the barbershop commute and crowded waiting rooms. <strong className="text-white">JQ Cuts</strong> delivers master fades, beard sculpting, and precision straight razor detailing directly to your home, office, or luxury suite in <strong className="text-amber-300">Metro Atlanta</strong>.
            </p>

            {/* Quick Schedule Highlights Pill */}
            <div className="w-full max-w-xl p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-300 text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <strong className="text-white">Sunday & Monday:</strong> Full Day VIP Mobile Slots
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <strong className="text-white">Tue–Sat:</strong> Late-Night VIP (10PM–11PM)
                </div>
              </div>
            </div>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2 text-xs sm:text-sm font-medium text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Commute Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hospital-Grade Clean</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>iPhone Calendar Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant SMS Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Licensed Master Barber</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Appointments Only</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-black" />
                <span>Schedule VIP House Call</span>
              </button>

              <a
                href={`tel:${BARBER_INFO.phone}`}
                className="px-7 py-4 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-amber-500/30 text-neutral-100 hover:text-amber-300 font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call {BARBER_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex items-center gap-4 text-left">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-500/50 bg-neutral-800 flex items-center justify-center text-xs font-bold text-amber-400">MT</div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-500/50 bg-neutral-700 flex items-center justify-center text-xs font-bold text-amber-400">DK</div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-500/50 bg-neutral-800 flex items-center justify-center text-xs font-bold text-amber-400">RB</div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-amber-500/50 bg-neutral-900 flex items-center justify-center text-xs font-bold text-amber-400">+50</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">5.0 / 5.0</span>
                </div>
                <p className="text-xs text-neutral-400">Trusted by executives, artists, & families across Metro Atlanta</p>
              </div>
            </div>

          </div>

          {/* Right Logo & Luxury Badge Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glowing Ambient Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              {/* Luxury Frame Container */}
              <div className="relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl border border-amber-500/30">
                
                {/* 3D Emblem Image */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-amber-500/40 via-neutral-900 to-amber-900/40 shadow-inner mb-6">
                  <img
                    src="./logo.png"
                    alt="JQ Cuts Master Barber Official Emblem"
                    className="w-full h-full object-contain rounded-xl drop-shadow-2xl"
                  />
                </div>

                {/* Badge Details */}
                <div className="space-y-2 w-full">
                  <h3 className="font-heading text-xl font-bold gold-gradient-text tracking-wide">
                    MASTER BARBER CERTIFIED
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Pressure Made • VIP Mobile Suite • Est. {BARBER_INFO.established}
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-2.5 text-left text-xs text-neutral-300">
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Availability</p>
                        <p className="font-medium text-white">Sun, Mon & Late-Night</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Territory</p>
                        <p className="font-medium text-white">Metro Atlanta</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="w-full py-2 px-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                      <span className="text-neutral-300 font-medium">Direct Barber Text Line:</span>
                      <a href={`sms:${BARBER_INFO.phone}`} className="text-amber-400 font-bold hover:underline">
                        {BARBER_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
