import React from 'react';
import { MapPin, Navigation, Car, Shield, CheckCircle, Phone, DollarSign } from 'lucide-react';
import { SERVICE_CITIES, BARBER_INFO, MOBILE_PRICING_TIERS } from '../data/barberData';

interface ServiceAreaProps {
  onOpenBooking: () => void;
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onOpenBooking }) => {
  return (
    <section id="service-area" className="py-20 relative bg-neutral-950/60 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Atlanta Coverage Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Navigation className="w-3.5 h-3.5" />
              Metro Atlanta Service Territory
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
              VIP Mobile House Calls Across{' '}
              <span className="gold-gradient-text">Metro Atlanta & Suburbs</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Based in Atlanta, Master Barber Jaquan provides doorstep grooming for private high-rises, estates, executive suites, and luxury hotels across Fulton, Cobb, Gwinnett, and DeKalb counties.
            </p>

            {/* Travel Pricing Quick Overview */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                Mobile Distance Travel Rates
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {MOBILE_PRICING_TIERS.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 block">{t.distance}</span>
                    <span className="font-extrabold text-amber-400 text-sm">+${t.fee}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 text-center">
                * After-hours mobile appointments (after 10 PM): +$20 travel surcharge
              </p>
            </div>

            {/* Key Advantages */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Fully Self-Contained Mobile Equipment:</strong> Professional barber chair, wireless clippers, LED ring lighting, organic oils, and floor barrier mats.
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Spotless Cleanliness Policy:</strong> Hospital-grade tool sanitization, clean cape, and high-suction portable vacuuming leaving your floors spotless.
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer text-center"
              >
                Enter Your Atlanta Address & Book
              </button>
              <a
                href={`tel:${BARBER_INFO.phone}`}
                className="px-6 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-amber-500/40 text-neutral-200 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call Travel Desk
              </a>
            </div>
          </div>

          {/* Right Column: Atlanta City Cards Grid */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading font-bold text-lg text-white">Atlanta Service Zones</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Metro Atlanta
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICE_CITIES.map((city, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                        {city.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 ml-5">{city.area}</p>
                    </div>
                    <div className="mt-2 ml-5">
                      <span className="text-[10px] font-semibold text-amber-300/80 uppercase">
                        {city.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 text-center">
                Need a cut outside Metro Atlanta? <strong className="text-white">Custom statewide VIP appointments</strong> available for video shoots, music tours, and private events.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
