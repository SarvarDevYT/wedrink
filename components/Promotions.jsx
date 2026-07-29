'use client';

import React from 'react';
import { PROMOTIONS } from '../data/products';
import { Gift, ArrowRight } from 'lucide-react';

export default function Promotions({ onSelectPromo }) {
  return (
    <section id="promotions" className="py-20 bg-gradient-to-b from-[#F6FAF9] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-wedrink-pink-light text-wedrink-pink px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Gift className="w-4 h-4" />
              <span>Aksiyalar va Chegirmalar</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-wedrink-dark">
              Mavsumiy Maxsus <span className="text-wedrink-pink">Takliflar</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-md">
            Har hafta yangi chegirmalar va sovg'ali aksiyalar haqida xabardor bo'ling!
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[420px] text-white p-8 border border-white/20"
            >
              {/* Image background with dark overlay */}
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${promo.bgGradient} opacity-85 group-hover:opacity-90 transition-opacity duration-300`}></div>

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-white text-wedrink-dark font-black text-xs px-3.5 py-1.5 rounded-full shadow-md tracking-wider">
                  {promo.tag}
                </span>
                <span className="text-white/80 text-xs font-bold">WeDrink Special</span>
              </div>

              {/* Card Main Info */}
              <div className="relative z-10 space-y-3">
                <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-sm">
                  {promo.title}
                </h3>
                <p className="text-sm font-semibold text-white/90 line-clamp-2">
                  {promo.subtitle}
                </p>
                <p className="text-xs text-white/75 leading-relaxed">
                  {promo.description}
                </p>

                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 bg-white hover:bg-wedrink-yellow text-wedrink-dark font-fredoka font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md group-hover:gap-3"
                >
                  <span>Aksiyadan Foydalanish</span>
                  <ArrowRight className="w-4 h-4 text-wedrink-pink" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
