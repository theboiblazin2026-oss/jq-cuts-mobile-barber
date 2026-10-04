import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/barberData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 relative bg-gradient-to-b from-neutral-950 via-[#0B0B0B] to-neutral-950 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            Verified Client Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            5-Star Grooming Reviews
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Read what high-profile executives, athletes, and families in Georgia say about JQ Cuts mobile service.
          </p>
        </div>

        {/* Overall Score Banner */}
        <div className="mb-12 glass-panel rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-amber-500/30 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-black font-heading gold-gradient-text">5.0</div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 font-semibold">Perfect 5.0 Star Rating</p>
            </div>
          </div>

          <div className="h-10 w-px bg-neutral-800 hidden md:block" />

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">100% Punctuality Guarantee</h4>
              <p className="text-xs text-neutral-400">On-time doorstep arrival or custom discount</p>
            </div>
          </div>

          <div className="h-10 w-px bg-neutral-800 hidden md:block" />

          <div className="flex items-center gap-3">
            <ThumbsUp className="w-8 h-8 text-amber-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">100% Satisfaction</h4>
              <p className="text-xs text-neutral-400">Razor-sharp lines & sanitary care</p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-800 group-hover:text-amber-500/20 transition-colors" />

              <div>
                {/* Rating & Service */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-400">
                    {rev.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-neutral-200 text-sm leading-relaxed mb-6 font-normal">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${rev.avatarBg || 'from-amber-600 to-yellow-500'} flex items-center justify-center text-sm font-black text-black shadow-md`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {rev.name}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {rev.role ? `${rev.role} • ` : ''}{rev.location}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[11px] text-amber-300/80 font-medium px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
