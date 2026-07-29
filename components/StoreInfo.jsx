'use client';

import React from 'react';
import { Award, ShieldCheck, Clock, CheckCircle2, Sparkles, Heart, Leaf, Utensils } from 'lucide-react';

export default function StoreInfo() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#F0F9F8] to-[#E6F7F5] relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Kafolat va Sifat Standartlari</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-wedrink-dark">
            Ish Vaqti, <span className="text-wedrink-teal">Halol Sertifikat</span> va Gigiyena
          </h2>

          <p className="text-gray-600 font-medium text-sm sm:text-base">
            Mijozlarimiz salomatligi va a'lo kayfiyati — biz uchun eng birinchi o'rinda!
          </p>
        </div>

        {/* 4 Standard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Halal Certificate */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:shadow-cute transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              🌙
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider block">Kafolatlangan</span>
              <h3 className="font-fredoka text-xl font-bold text-wedrink-dark">100% Halol Sertifikat</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Barcha masalliqlarimiz, sut va mevali pyurelarimiz Halol standartlariga to'liq javob beradi. Sun'iy ta'm beruvchi va spirtli qo'shimchalar ishlatilmaydi.
            </p>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sertifikatlangan Mahsulotlar</span>
            </div>
          </div>

          {/* Card 2: Working Hours */}
          <div className="bg-white rounded-3xl p-6 border-2 border-wedrink-teal/20 shadow-sm hover:shadow-cute transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-wedrink-teal text-white flex items-center justify-center font-bold text-xl shadow-md">
              ⏰
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-wedrink-teal uppercase tracking-wider block">Har Kuni Ochiqmiz</span>
              <h3 className="font-fredoka text-xl font-bold text-wedrink-dark">Ish Vaqti Tartibi</h3>
            </div>

            <div className="space-y-2 text-xs text-gray-600 font-medium">
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span>Markaziy Park Filial:</span>
                <strong className="text-wedrink-dark">09:00 - 23:00</strong>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <span>Universitet Filial:</span>
                <strong className="text-wedrink-dark">08:30 - 22:30</strong>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib Berish (Delivery):</span>
                <strong className="text-wedrink-pink">09:00 - 22:00</strong>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-wedrink-teal">
              <Clock className="w-4 h-4" />
              <span>Dam olish kunlarisiz</span>
            </div>
          </div>

          {/* Card 3: Fresh Ingredients */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-sm hover:shadow-cute transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
              🍵
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block">Ertalabki Yangilik</span>
              <h3 className="font-fredoka text-xl font-bold text-wedrink-dark">Tabiiy Masalliqlar</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Boba Tapioka marvaridlari har kuni ertalab yangi pishiriladi. Yaponiyadan keltirilgan Matcha va toza sut mahsulotlaridan foydalaniladi.
            </p>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
              <Leaf className="w-4 h-4 text-amber-600" />
              <span>100% Tabiiy Tarkib</span>
            </div>
          </div>

          {/* Card 4: Sanitation & Hygiene */}
          <div className="bg-white rounded-3xl p-6 border-2 border-wedrink-pink/20 shadow-sm hover:shadow-cute transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-wedrink-pink text-white flex items-center justify-center font-bold text-xl shadow-md">
              ✨
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-wedrink-pink uppercase tracking-wider block">Tozalik & Xavfsizlik</span>
              <h3 className="font-fredoka text-xl font-bold text-wedrink-dark">Gigiyena Standarti</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Barcha idishlar va somonlar yakka tartibda germetik o'ralgan. Oshxona va jihozlar kuniga 3 mahal antiseptik tozalanadi.
            </p>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-wedrink-pink">
              <Award className="w-4 h-4" />
              <span>Xavfsiz Xizmat</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
