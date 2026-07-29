import React from 'react';
import { Heart, ShieldCheck, Leaf, Smile, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#F0F9F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mascot Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-cute border-4 border-white bg-white transform -rotate-2">
                <img
                  src="/wedrinkphotos/5426900635921094966_121.jpg"
                  alt="WeDrink Mascot"
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Overlapping Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 w-48 sm:w-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white transform rotate-3">
                <img
                  src="/wedrinkphotos/wedrinklogo.jpg"
                  alt="WeDrink Logo"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Badge Overlay */}
              <div className="absolute -top-4 -left-4 bg-wedrink-pink text-white font-fredoka font-bold text-sm px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 animate-bounce-slow">
                <Heart className="w-4 h-4 fill-white" />
                <span>100% Sevgi Bilan</span>
              </div>

            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>WeDrink Falsafasi</span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-wedrink-dark leading-tight">
              Yangi Ta'm, <br />
              <span className="text-wedrink-teal">Yangi Zavq Har Kuni!</span>
            </h2>

            <p className="text-gray-600 font-medium text-base leading-relaxed">
              WeDrink — bu shunchaki boba tea va muzqaymoq emas, bu Termiz shahridagi har bir mehmonga quvonch va yangi his-tuyg'ular ulashuvchi maskan. Biz har kuni eng toza sut, yapon matchasi hamda tabiiy mevalardan unutilmas ichimliklar tayyorlaymiz.
            </p>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-fredoka font-bold text-sm text-wedrink-dark">Tabiiy Masalliqlar</h4>
                  <p className="text-xs text-gray-500 font-medium">Suntiy bo'yoqlarsiz, toza sut va yapon matchasi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-wedrink-teal-light text-wedrink-teal flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-fredoka font-bold text-sm text-wedrink-dark">A'lo Sifat</h4>
                  <p className="text-xs text-gray-500 font-medium">Har kuni yangi tayyorlanadigan Boba va Muzqaymoq.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-wedrink-pink flex items-center justify-center flex-shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-fredoka font-bold text-sm text-wedrink-dark">Yoqimtoy Mascot</h4>
                  <p className="text-xs text-gray-500 font-medium">Kayfiyatni ko'taruvchi quvnoq brend personaji.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-fredoka font-bold text-sm text-wedrink-dark">Tezkor Xizmat</h4>
                  <p className="text-xs text-gray-500 font-medium">Filialda yoki uyingizga yetkazib berish rejimida.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
