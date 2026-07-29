'use client';

import React, { useState } from 'react';
import { Camera, X, Instagram } from 'lucide-react';

const PHOTOS = [
  { id: 1, src: '/wedrinkphotos/5426900635921094966_121.jpg', title: 'Matchali Muzqaymoq sarguzashtlari' },
  { id: 2, src: '/wedrinkphotos/5426900635921094963_121.jpg', title: 'Brown Sugar Boba va Mascot' },
  { id: 3, src: '/wedrinkphotos/5426900635921094964_121.jpg', title: 'Mango Passion Fresh Tea' },
  { id: 4, src: '/wedrinkphotos/5426900635921094965_121.jpg', title: 'Matcha Latte Boba Special' },
  { id: 5, src: '/wedrinkphotos/5426900635921094967_121.jpg', title: 'Shokoladli Sundae va Mascot' },
  { id: 6, src: '/wedrinkphotos/5426900635921094968_121.jpg', title: 'Taro Milk Tea Boba' },
  { id: 7, src: '/wedrinkphotos/5426900635921094969_121.jpg', title: 'Limon va Yalpizli Fresh' },
  { id: 8, src: '/wedrinkphotos/5426900635921094971_121.jpg', title: 'Vaniyli Konus Muzqaymoq' },
  { id: 9, src: '/wedrinkphotos/5426900635921094962_121.jpg', title: 'Strawberry Coconut Smoothie' },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>@wedrink_termiz Instagramimizdan</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-wedrink-dark">
            WeDrink Hayotidan <span className="text-wedrink-teal">Fotolavhalar</span>
          </h2>

          <p className="text-gray-500 font-medium text-sm sm:text-base">
            Har bir stakanda quvonch, har bir kunda yangi sarguzasht!
          </p>

          <a
            href="https://www.instagram.com/wedrink_termiz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-wedrink-pink font-fredoka font-bold text-sm hover:underline pt-1"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram rasmiy sahifamizga o'tish</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-cute transition-all duration-500 cursor-pointer bg-wedrink-teal-ultra border border-gray-100"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-wedrink-dark/80 via-wedrink-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-wedrink-yellow">WeDrink Moment</span>
                  <h4 className="font-fredoka text-lg font-bold leading-tight">{photo.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white hover:text-wedrink-pink p-2 bg-white/10 rounded-full transition-colors"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl space-y-4 p-3">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            <div className="px-4 pb-2 flex items-center justify-between text-wedrink-dark">
              <h3 className="font-fredoka text-xl font-bold">{selectedPhoto.title}</h3>
              <a
                href="https://www.instagram.com/wedrink_termiz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-wedrink-teal bg-wedrink-teal-light px-3 py-1.5 rounded-full"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
