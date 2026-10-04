import React, { useState } from 'react';
import { Instagram, ExternalLink, Sparkles, Eye, X } from 'lucide-react';
import { GALLERY_ITEMS, BARBER_INFO } from '../data/barberData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Cuts' },
    { id: 'fades', label: 'Skin & Drop Fades' },
    { id: 'beards', label: 'Beard Sculpting' },
    { id: 'tapers', label: 'Tapers & Waves' },
    { id: 'designs', label: 'Freestyle Designs' },
  ];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Craftsmanship & Lineups
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
              Master Barber Portfolio
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Real client transformations delivered on-location across Georgia.
            </p>
          </div>

          <a
            href={BARBER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-pink-500/50 text-white text-xs sm:text-sm font-semibold transition-all group shadow-md"
          >
            <Instagram className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
            <span>Follow {BARBER_INFO.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filter === tab.id
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative h-80 rounded-3xl overflow-hidden glass-panel border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Hover Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-900/80 border border-amber-500/30">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold font-heading text-white mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-400/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-neutral-300 mt-2 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Zoom Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full glass-panel rounded-3xl p-4 sm:p-6 border border-amber-500/30">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:text-amber-400 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="rounded-2xl overflow-hidden mb-4 max-h-[65vh]">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="w-full h-full object-contain max-h-[65vh] mx-auto"
                />
              </div>
              <div className="text-left space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase">
                  {activeImage.category}
                </span>
                <h3 className="text-xl font-bold text-white font-heading">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-neutral-300">{activeImage.caption}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
