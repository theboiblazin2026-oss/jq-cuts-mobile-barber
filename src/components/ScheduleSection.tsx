import React from 'react';
import { Calendar, Clock, Car, Moon, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { WEEKLY_SCHEDULE, MOBILE_PRICING_TIERS } from '../data/barberData';

interface ScheduleSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="schedule" className="py-20 relative bg-[#090909] border-y border-neutral-800">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/40 text-xs font-black tracking-widest uppercase shadow-md">
            <span className="gold-gradient-text">💈 PRESSURE MADE</span>
            <span className="text-neutral-500">•</span>
            <span className="text-amber-300">PREMIUM BARBER SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Booking Schedule & Availability
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Strict capacity limits to guarantee meticulous precision for every client. <strong className="text-white">Appointments Only.</strong>
          </p>
        </div>

        {/* 3-Column Schedule Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {WEEKLY_SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-7 border border-neutral-800 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1 shadow-xl"
            >
              {/* Day Header Badge */}
              <div className="mb-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black font-heading tracking-widest text-amber-400 uppercase">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Timing & Rules */}
              <div className="space-y-4 my-2">
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.hours}</span>
                  </div>
                  <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.capacity}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300">
                  <p className="font-medium text-neutral-200">
                    💡 {item.highlight}
                  </p>
                </div>
              </div>

              {/* Book Day Action */}
              <button
                onClick={() => onOpenBooking(item.day.includes('TUESDAY') ? 'late-night-vip-cut' : undefined)}
                className="mt-6 w-full py-3.5 rounded-2xl bg-neutral-900 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 hover:text-black text-amber-300 border border-amber-500/30 hover:border-transparent font-extrabold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve {item.day.split(' ')[0]} Slot</span>
              </button>
            </div>
          ))}
        </div>

        {/* Two Lower Informational Banners: Mobile Travel Pricing & Late Night Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 🚗 Mobile Travel Pricing Table */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-7 border border-amber-500/30 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-4 h-4" />
              Transparent Travel Rates
            </div>
            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              🚗 Mobile Travel Pricing (Atlanta Area)
            </h3>
            <p className="text-neutral-400 text-xs mb-6">
              Travel fees are calculated from base point to your doorstep across Metro Atlanta:
            </p>

            <div className="space-y-3">
              {MOBILE_PRICING_TIERS.map((tier, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-sm font-bold text-white block">{tier.distance}</span>
                    <span className="text-xs text-neutral-400">{tier.note}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black font-heading text-amber-400">
                      +${tier.fee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🌙 Late-Night Appointments Policy */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-7 border border-purple-500/30 shadow-2xl bg-gradient-to-br from-neutral-900 via-[#120F1C] to-neutral-900">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Moon className="w-4 h-4 text-purple-400" />
              Strictly 1 Client Per Night
            </div>
            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              🌙 Late-Night VIP Appointments
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
              Specifically tailored for athletes, recording artists, and executives after regular daytime commitments.
            </p>

            <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/40 space-y-3 mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Tuesday – Saturday After 10 PM</span>
                <span className="text-2xl font-black font-heading gold-gradient-text">Starting at $75</span>
              </div>
              <p className="text-xs text-neutral-300">
                • Window: <strong>10:00 PM – 11:00 PM ONLY</strong><br />
                • <strong>Strict limit:</strong> Only 1 exclusive client booked per night.<br />
                • Complete privacy, unhurried precision, and full straight razor styling.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Appointments Only — No Walk-Ins</span>
              </div>
              <button
                onClick={() => onOpenBooking('late-night-vip-cut')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-black font-extrabold text-xs shadow-md hover:scale-105 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Book Late Night
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
