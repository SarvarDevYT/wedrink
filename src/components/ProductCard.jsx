import React from 'react';
import { Star, Plus, Flame, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-cute transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1.5">
      {/* Image container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-wedrink-teal-ultra cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge if present */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-white text-xs font-black px-3 py-1 rounded-full shadow-md ${product.badgeColor || 'bg-wedrink-pink'} uppercase tracking-wider`}>
            {product.badge}
          </span>
        )}

        {/* Rating pill top right */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
        </div>

        {/* Quick view floating hint */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md text-wedrink-teal font-fredoka font-bold text-xs px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Sozlash va Tanlash ✦
        </div>
      </div>

      {/* Details Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-fredoka text-xl font-bold text-wedrink-dark group-hover:text-wedrink-teal transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">Narxi</span>
            <span className="font-fredoka text-lg sm:text-xl font-extrabold text-wedrink-teal">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => onSelectProduct(product)}
            className="flex items-center gap-1.5 bg-wedrink-teal-ultra hover:bg-wedrink-teal text-wedrink-teal hover:text-white px-4 py-2.5 rounded-2xl font-fredoka font-bold text-sm transition-all duration-300 border border-wedrink-teal/20 group-hover:border-wedrink-teal shadow-sm hover:shadow-cute"
          >
            <Plus className="w-4 h-4" />
            <span>Tanlash</span>
          </button>
        </div>
      </div>
    </div>
  );
}
