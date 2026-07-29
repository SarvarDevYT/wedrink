'use client';

import React from 'react';
import { LOCATIONS } from '../data/products';
import { MapPin, Clock, Phone, Send, Instagram } from 'lucide-react';

export default function Locations() {
  return (
    <section id="locations" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Termiz Filiallarimiz</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-wedrink-dark">
            Bizni Qayerdan <span className="text-wedrink-teal">Topasiz?</span>
          </h2>

          <p className="text-gray-500 font-medium text-sm sm:text-base">
            Termiz shahridagi filiallarimizga tashrif buyuring yoki Telegram orqali yetkazib berishga buyurtma bering.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {LOCATIONS.map((location) => (
            <div
              key={location.id}
              className="bg-[#F6FAF9] rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-cute transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-wedrink-teal text-white flex items-center justify-center font-bold text-xl shadow-md">
                    📍
                  </div>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-wedrink-dark">
                      {location.name}
                    </h3>
                    <span className="text-xs text-wedrink-teal font-bold uppercase tracking-wider">Ochiq • Termiz</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 text-sm">
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-4 h-4 text-wedrink-pink flex-shrink-0 mt-1" />
                    <span className="font-medium">{location.address}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-4 h-4 text-wedrink-teal flex-shrink-0" />
                    <span className="font-medium">{location.hours}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="font-bold hover:text-wedrink-teal">
                      {location.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200/60 flex flex-wrap gap-3">
                <a
                  href={`https://t.me/wedrink_termiz`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-wedrink-teal hover:bg-wedrink-teal-dark text-white font-fredoka font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram Buyurtma</span>
                </a>

                <a
                  href={`https://www.instagram.com/wedrink_termiz`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-wedrink-pink hover:bg-wedrink-pink-hover text-white font-fredoka font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
