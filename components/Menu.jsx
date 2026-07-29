'use client';

import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { Search, Sparkles } from 'lucide-react';

export default function Menu({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'popular'
          ? product.popular
          : product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#F6FAF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-wedrink-teal-light text-wedrink-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Rasmiy Menyuyimiz</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-wedrink-dark">
            Siz Uchun Maxsus <span className="text-wedrink-teal">Tayyorlangan Ta'mlar</span>
          </h2>

          <p className="text-gray-600 font-medium text-base sm:text-lg">
            Sifatli tarkib, Yapon Matchasi, haqiqiy boba marvaridlari hamda tabiiy mevalardan bahramand bo'ling!
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Qaysi ichimlik yoki muzqaymoqni qidiryapsiz? (masalan: Matcha, Boba...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-wedrink-teal focus:ring-4 focus:ring-wedrink-teal/10 shadow-sm outline-none font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
              >
                Tozalash
              </button>
            )}
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-fredoka font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-wedrink-teal text-white shadow-cute scale-105'
                    : 'bg-white text-gray-700 hover:bg-wedrink-teal-ultra hover:text-wedrink-teal border border-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-gray-100 shadow-sm space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="font-fredoka text-xl font-bold text-gray-800">
              Ushbu bo'limda hech narsa topilmadi
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Boshqa so'z bilan izlab ko'ring yoki boshqa kategoriyani tanlang.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="bg-wedrink-teal text-white font-fredoka font-bold px-6 py-2.5 rounded-xl shadow-sm text-sm"
            >
              Hamma menyuni ko'rsatish
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
