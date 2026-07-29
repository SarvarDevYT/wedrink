'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Instagram, Sparkles, ExternalLink } from 'lucide-react';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "WeDrink Termiz Markaziy Filiali Ochilishi",
      image: "/wedrinkphotos/5426900635921094966_121.jpg",
      likes: 342,
      tag: "#wedrink_termiz"
    },
    {
      id: 2,
      title: "Samimiy Mijozlarimiz va Shiringoylik",
      image: "/wedrinkphotos/5426900635921094963_121.jpg",
      likes: 215,
      tag: "#termiz_boba"
    },
    {
      id: 3,
      title: "Yangi Matchali Muzqaymoqlarimzi Tayyorlash Jarayoni",
      image: "/wedrinkphotos/5426900635921094965_121.jpg",
      likes: 189,
      tag: "#matcha_icecream"
    },
    {
      id: 4,
      title: "Termiz Shahrida Salqinlik va Zavqli Lahzalar",
      image: "/wedrinkphotos/5426900635921094964_121.jpg",
      likes: 278,
      tag: "#summer_vibes"
    },
    {
      id: 5,
      title: "Bizning Sevimli WeDrink Mascot Personajimiz",
      image: "/wedrinkphotos/5426900635921094967_121.jpg",
      likes: 412,
      tag: "#wedrink_mascot"
    },
    {
      id: 6,
      title: "Taro Milk Tea va Tapioka Boba Marvaridlari",
      image: "/wedrinkphotos/5426900635921094968_121.jpg",
      likes: 195,
      tag: "#boba_tea"
    }
  ]);

  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && data.gallery && data.gallery.length > 0) {
        setGalleryItems(data.gallery);
      }
    } catch (e) {}
  };

  const handleLike = (id) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((item) => item !== id));
      setGalleryItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, likes: item.likes - 1 } : item))
      );
    } else {
      setLikedIds([...likedIds, id]);
      setGalleryItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Instagram className="w-4 h-4" />
            <span>@wedrink_termiz</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-wedrink-dark">
            WeDrink <span className="text-wedrink-pink">Hayotidan</span> Fotolavhalar
          </h2>

          <p className="text-gray-600 font-medium text-sm sm:text-base">
            Mijozlarimizning baxtiyor tabassumlari, yangi tayyorlangan ichimliklar va Termiz filialimizdan fotogalereya!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => {
            const isLiked = likedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-wedrink-teal-ultra border border-gray-100"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white pointer-events-none">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center pointer-events-auto">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white tracking-wide border border-white/30">
                      {item.tag}
                    </span>

                    <button
                      onClick={() => handleLike(item.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isLiked
                          ? 'bg-wedrink-pink text-white scale-110'
                          : 'bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-wedrink-pink'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Text */}
                  <div className="space-y-1">
                    <h3 className="font-fredoka text-lg font-bold leading-snug drop-shadow-md">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-200">
                      <span className="flex items-center gap-1 font-semibold">
                        <Heart className="w-3.5 h-3.5 fill-wedrink-pink text-wedrink-pink" />
                        {item.likes} ta yoqdi
                      </span>
                      <a
                        href="https://www.instagram.com/wedrink_termiz"
                        target="_blank"
                        rel="noreferrer"
                        className="pointer-events-auto flex items-center gap-1 text-[11px] font-bold text-wedrink-teal-ultra hover:underline"
                      >
                        <span>Instagram'da ko'rish</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/wedrink_termiz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-fredoka font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram Sahifamizga O'tish (@wedrink_termiz)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
