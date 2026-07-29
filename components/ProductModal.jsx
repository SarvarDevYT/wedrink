'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { TOPPINGS, SUGAR_LEVELS, ICE_LEVELS, SIZES } from '../data/products';
import confetti from 'canvas-confetti';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [size, setSize] = useState(SIZES[0]);
  const [sugar, setSugar] = useState(SUGAR_LEVELS[0]);
  const [ice, setIce] = useState(ICE_LEVELS[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    setSize(SIZES[0]);
    setSugar(SUGAR_LEVELS[0]);
    setIce(ICE_LEVELS[0]);
    setSelectedToppings([]);
    setQuantity(1);
    setNote('');
  }, [product]);

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toppingsTotalPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = product.price + (size ? size.extraPrice : 0) + toppingsTotalPrice;
  const totalPrice = unitPrice * quantity;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';
  };

  const handleAdd = () => {
    const customizedItem = {
      product,
      size,
      sugar: product.category === 'icecream' ? 'Standart' : sugar,
      ice: product.category === 'icecream' ? 'Standart' : ice,
      toppings: selectedToppings,
      quantity,
      note,
      unitPrice,
      totalPrice,
    };

    onAddToCart(customizedItem);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00A896', '#FF6B8B', '#FFD166'],
      });
    } catch (e) {}

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8 relative flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-wedrink-pink hover:bg-white shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 bg-wedrink-teal-ultra flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          
          {product.badge && (
            <span className={`absolute bottom-4 left-6 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md ${product.badgeColor || 'bg-wedrink-pink'}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-wedrink-dark">
                {product.name}
              </h2>
              <span className="font-fredoka text-2xl font-extrabold text-wedrink-teal whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Options */}
          {product.customizable && (
            <div className="space-y-2">
              <label className="font-fredoka text-sm font-bold text-wedrink-dark flex items-center gap-1.5">
                <span>Hajmi:</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`p-3 rounded-2xl text-left border-2 font-bold text-xs flex justify-between items-center transition-all ${
                      size.id === s.id
                        ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal shadow-sm'
                        : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.extraPrice > 0 ? (
                      <span className="text-[11px] text-wedrink-pink font-bold">
                        +{formatPrice(s.extraPrice)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-400">Standart</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sugar Options */}
          {product.customizable && product.category !== 'icecream' && (
            <div className="space-y-2">
              <label className="font-fredoka text-sm font-bold text-wedrink-dark">
                Shakar Darajasi:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUGAR_LEVELS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSugar(s)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      sugar === s
                        ? 'border-wedrink-teal bg-wedrink-teal text-white shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ice Options */}
          {product.customizable && product.category !== 'icecream' && (
            <div className="space-y-2">
              <label className="font-fredoka text-sm font-bold text-wedrink-dark">
                Muz Miqdori:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ICE_LEVELS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIce(i)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      ice === i
                        ? 'border-wedrink-teal bg-wedrink-teal text-white shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {product.customizable && (
            <div className="space-y-2">
              <label className="font-fredoka text-sm font-bold text-wedrink-dark flex items-center justify-between">
                <span>Qo'shimcha Toppinglar:</span>
                <span className="text-[11px] font-normal text-gray-400">Ixtiyoriy</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-wedrink-pink bg-wedrink-pink-light text-wedrink-pink'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'bg-wedrink-pink border-wedrink-pink text-white' : 'border-gray-300'}`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{topping.name}</span>
                      </div>
                      <span className="font-bold">+{formatPrice(topping.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special note */}
          <div className="space-y-1">
            <label className="font-fredoka text-xs font-bold text-gray-600">
              Maxsus Izoh (Ixtiyoriy):
            </label>
            <input
              type="text"
              placeholder="Masalan: Ko'proq saman, alohida stakanda va h.k."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-wedrink-teal focus:ring-2 focus:ring-wedrink-teal/10 outline-none"
            />
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-wedrink-teal-light hover:text-wedrink-teal flex items-center justify-center text-gray-600 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-fredoka font-bold text-lg w-8 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-wedrink-teal-light hover:text-wedrink-teal flex items-center justify-center text-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 bg-wedrink-teal hover:bg-wedrink-teal-dark text-white font-fredoka font-bold text-base px-6 py-3.5 rounded-2xl shadow-cute hover:shadow-cute-lg transition-all duration-300 flex items-center justify-between sm:justify-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-wedrink-yellow" />
              <span>Savatchaga Qo'shish</span>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-xl text-sm font-extrabold">
              {formatPrice(totalPrice)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
