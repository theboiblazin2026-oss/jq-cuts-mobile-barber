import React from 'react';
import { MessageSquare, Sparkles, Scissors, Shield, Home } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Pick Cut & Location',
      icon: Home,
      description: 'Select your signature fade, beard sculpting, or VIP package. Enter your home, apartment, office, or hotel address in Metro Atlanta.',
      badge: 'Takes 60 Seconds'
    },
    {
      number: '02',
      title: 'Sync Calendar & Instant SMS',
      icon: MessageSquare,
      description: 'Your appointment is automatically confirmed with dual Apple & Android Google Calendar invites (.ics) and direct SMS text confirmation.',
      badge: 'Automated Booking'
    },
    {
      number: '03',
      title: 'VIP Master Cut at Your Door',
      icon: Scissors,
      description: 'Master Barber Jaquan arrives with a full professional mobile setup: sanitized clippers, mobile floor protection, and high-suction portable vacuum clean-up.',
      badge: 'Zero Clean-Up Stress'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-[#0D0D0D] border-y border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Effortless Convenience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            How VIP Mobile House Calls Work
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            No driving in traffic. No sitting in crowded waiting areas. The entire barbershop arrives at your private doorstep.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative glass-panel rounded-2xl p-8 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Step Number Backdrop */}
                <div className="absolute top-4 right-6 text-5xl font-extrabold font-heading text-neutral-800/40 group-hover:text-amber-500/20 transition-colors">
                  {step.number}
                </div>

                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 group-hover:border-amber-400 transition-all shadow-lg shadow-amber-500/10">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700/60 text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-3">
                    {step.badge}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-400">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Guaranteed Punctual & Sanitized</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
