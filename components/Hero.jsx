'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onOpenMenu }) {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#00A896] via-[#009282] to-[#007367] text-white">
      {/* Decorative background shapes & sparkles */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-wedrink-pink/20 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 hidden lg:block animate-float text-4xl">
        🧋
      </div>
      <div className="absolute bottom-1/4 left-1/4 hidden lg:block animate-float text-4xl" style={{ animationDelay: '1.5s' }}>
        🍦
      </div>
      <div className="absolute top-1/3 right-12 hidden lg:block animate-float text-4xl" style={{ animationDelay: '0.8s' }}>
        🍵
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-wedrink-yellow animate-spin" style={{ animationDuration: '8s' }} />
              <span>WeDrink Termiz — Yangi Ta'm, Yangi Zavq!</span>
              <span className="bg-wedrink-pink text-white text-[11px] px-2 py-0.5 rounded-full uppercase font-black tracking-wider">HOT</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-fredoka text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-sm">
              Termizning Eng Mazali <br />
              <span className="text-wedrink-yellow underline decoration-wedrink-pink decoration-wavy decoration-2">
                Bubble Tea
              </span> &{' '}
              <span className="text-pink-200">
                Muzqaymoqlari!
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-teal-50 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Yaponiyaning haqiqiy Matchali muzqaymoqlari, karamelli tapioka Bubble Tea (Boba) choylari va yangi uzilgan mevali salqin ichimliklar — kayfiyatingiz uchun tayyorlandi!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-wedrink-pink hover:bg-wedrink-pink-hover text-white font-fredoka font-bold text-lg px-8 py-4 rounded-2xl shadow-pink-glow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Menyuni ko'rish</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#promotions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/30 font-fredoka font-bold text-lg px-6 py-4 rounded-2xl transition-all duration-300"
              >
                <span>Aksiyalar</span>
                <span className="bg-wedrink-yellow text-wedrink-dark text-xs px-2 py-0.5 rounded-md">3 ta yangi</span>
              </a>
            </div>

            {/* Feature Pills */}
            <div className="pt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                <div className="font-fredoka text-xl font-bold text-wedrink-yellow">100%</div>
                <div className="text-xs text-teal-100 font-medium">Tabiiy Sifat</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                <div className="font-fredoka text-xl font-bold text-pink-200">15+</div>
                <div className="text-xs text-teal-100 font-medium">Tur Ta'mlar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                <div className="font-fredoka text-xl font-bold text-emerald-200">Tezkor</div>
                <div className="text-xs text-teal-100 font-medium">Termiz Yetkazish</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual / Mascot Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background Glow */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-white/20 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* Mascot Container Card */}
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Mascot Bubble Speech */}
              <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 z-20 bg-white text-wedrink-dark p-4 rounded-3xl rounded-bl-none shadow-2xl border-4 border-wedrink-teal max-w-[220px] transform -rotate-3 animate-float-sm">
                <div className="font-fredoka text-base font-extrabold text-wedrink-teal">
                  Hoy sen! 👋
                </div>
                <div className="text-xs font-bold text-gray-700 leading-snug">
                  Tez kel, bugundan Matchali muzqaymoq bor! 🍦✨
                </div>
              </div>

              {/* Main Mascot Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 bg-white p-2 transition-all duration-500 transform group-hover:rotate-1 group-hover:scale-[1.02]">
                <img
                  src="/wedrinkphotos/5426900635921094966_121.jpg"
                  alt="WeDrink Mascot Matcha Ice Cream"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                
                {/* Floating badge bottom right */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-wedrink-dark p-3 rounded-2xl shadow-lg border border-wedrink-teal/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-wedrink-teal-light flex items-center justify-center text-xl">
                    🍵
                  </div>
                  <div>
                    <div className="font-fredoka text-sm font-bold text-wedrink-teal">Matcha Ice Cream</div>
                    <div className="text-xs font-bold text-wedrink-pink">15,000 UZS</div>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Card */}
              <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3 bg-white text-wedrink-dark p-3 px-4 rounded-2xl shadow-xl border-2 border-wedrink-pink transform rotate-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-wedrink-pink">
                  <img src="/wedrinkphotos/5426900635921094963_121.jpg" alt="Boba" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-fredoka text-xs font-bold text-gray-800">Brown Sugar Bubble Tea</div>
                  <div className="text-[11px] text-emerald-600 font-bold">⭐⭐⭐⭐⭐ 5.0</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-12 sm:h-16 text-[#F6FAF9]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,55 C650,150 900,10 1200,45 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
