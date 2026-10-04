import React, { useState } from 'react';
import { Clock, Check, Sparkles, Scissors, Flame } from 'lucide-react';
import { SERVICES, ADD_ONS } from '../data/barberData';
import { ServiceItem } from '../types';

interface ServiceMenuProps {
  onSelectService: (serviceId: string) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'vip', label: 'VIP Experiences' },
    { id: 'cuts', label: 'Haircuts' },
    { id: 'beard', label: 'Beard & Shave' },
    { id: 'specials', label: 'Group & Events' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Scissors className="w-3.5 h-3.5" />
            Transparent Pricing & High-End Craft
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            VIP Service & Cut Menu
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Every appointment includes premium consultation, sanitized master equipment, razor-edge finish, and customized styling.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`glass-panel rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 group ${
                service.popular ? 'ring-2 ring-amber-500/40 bg-neutral-900/90' : ''
              }`}
            >
              {/* Popular / Special Tag */}
              {service.tag && (
                <div className="absolute -top-3 right-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md ${
                    service.popular
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black'
                      : 'bg-neutral-800 text-amber-300 border border-amber-500/30'
                  }`}>
                    {service.tag}
                  </span>
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black font-heading gold-gradient-text">
                      ${service.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimated Duration: {service.duration}</span>
                </div>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* What's Included */}
                <div className="space-y-2 mb-6 pt-4 border-t border-neutral-800/80">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Service Highlights:
                  </p>
                  {service.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onSelectService(service.id)}
                className="w-full py-3.5 rounded-2xl bg-neutral-900 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:via-yellow-500 group-hover:to-amber-600 border border-amber-500/30 group-hover:border-transparent text-amber-300 group-hover:text-black font-extrabold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book This Service</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add-Ons Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 border border-amber-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                Customize Your Cut
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Luxury Grooming Add-Ons
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Enhance any service during your booking session with these executive add-ons.
              </p>
            </div>
            <button
              onClick={() => onSelectService(SERVICES[0].id)}
              className="px-6 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs shrink-0 cursor-pointer"
            >
              Add During Booking Step
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADD_ONS.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{addon.name}</h4>
                  <span className="text-[11px] text-neutral-400">{addon.duration}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-amber-400">+${addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
