'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('At-Termiziy ko\'chasi, 45-uy (Markaziy park)');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 10000 : 0;
  const grandTotal = subtotal + deliveryFee;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    if (!customerPhone) {
      alert('Iltimos, telefon raqamingizni kiriting!');
      return;
    }

    if (orderType === 'delivery' && !address) {
      alert('Iltimos, yetkazib berish manzilini kiriting!');
      return;
    }

    // Call Next.js API Route for order processing / payment initialization!
    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerName,
          customerPhone,
          orderType,
          address: orderType === 'delivery' ? address : selectedBranch,
          grandTotal,
        }),
      });
    } catch (e) {}

    // Build structured message for Telegram
    let text = `🍹 *WEDRINK TERMIZ BUYURTMA* 🍹\n\n`;
    text += `👤 *Mijoz:* ${customerName || 'Noma\'lum'}\n`;
    text += `📞 *Tel:* ${customerPhone}\n`;
    text += `📍 *Rejim:* ${orderType === 'delivery' ? 'Yetkazib berish (Delivery)' : 'Olib ketish (Pickup)'}\n`;
    
    if (orderType === 'delivery') {
      text += `🏠 *Manzil:* ${address}\n`;
    } else {
      text += `🏪 *Filial:* ${selectedBranch}\n`;
    }

    text += `\n🛒 *MAHSULOTLAR:* \n`;
    cartItems.forEach((item, index) => {
      text += `\n${index + 1}. *${item.product.name}* (x${item.quantity})\n`;
      text += `   • Hajmi: ${item.size.name}\n`;
      if (item.product.category !== 'icecream') {
        text += `   • Shakar: ${item.sugar} | Muz: ${item.ice}\n`;
      }
      if (item.toppings && item.toppings.length > 0) {
        text += `   • Topping: ${item.toppings.map((t) => t.name).join(', ')}\n`;
      }
      if (item.note) {
        text += `   • Izoh: ${item.note}\n`;
      }
      text += `   • Narxi: ${formatPrice(item.totalPrice)}\n`;
    });

    text += `\n💵 *Mahsulotlar summasi:* ${formatPrice(subtotal)}\n`;
    if (orderType === 'delivery') {
      text += `🚚 *Yetkazish xizmati:* ${formatPrice(deliveryFee)}\n`;
    }
    text += `💰 *JAMI TO'LOV:* ${formatPrice(grandTotal)}\n\n`;
    text += `✨ WeDrink rasmiy saytidan yuborildi.`;

    const encodedText = encodeURIComponent(text);
    const telegramUrl = `https://t.me/wedrink_termiz?text=${encodedText}`;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A896', '#FF6B8B', '#FFD166'],
      });
    } catch (err) {}

    setOrderSubmitted(true);
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 bg-wedrink-teal text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <div>
                <h2 className="font-fredoka text-2xl font-bold">Sizning Savatchangiz</h2>
                <p className="text-xs text-teal-100 font-medium">{cartItems.length} turdagi mahsulot</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto flex-grow space-y-6">
            
            {orderSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-fredoka text-2xl font-bold text-wedrink-dark">
                  Buyurtmangiz Yuborildi!
                </h3>
                <p className="text-sm text-gray-600">
                  Buyurtmangiz tafsilotlari Telegram orqali menejerimizga yuborildi. Operatorlarimiz tez orada aloqaga chiqishadi.
                </p>
                <button
                  onClick={() => {
                    setOrderSubmitted(false);
                    onClearCart();
                    onClose();
                  }}
                  className="bg-wedrink-teal text-white font-fredoka font-bold text-sm px-6 py-3 rounded-2xl shadow-cute"
                >
                  Xaridni Davom Ettirish
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-6xl">🧋</div>
                <h3 className="font-fredoka text-xl font-bold text-gray-800">
                  Savatchangiz bo'sh
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Menyudan o'zingizga yoqqan Boba Tea yoki muzqaymoqlarni tanlang va savatchaga qo'shing!
                </p>
                <button
                  onClick={onClose}
                  className="bg-wedrink-teal text-white font-fredoka font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm"
                >
                  Menyuga O'tish
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 relative group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />

                      <div className="flex-grow space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-fredoka font-bold text-sm text-wedrink-dark leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-gray-400 hover:text-wedrink-pink p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-gray-500 space-y-0.5">
                          <div>Hajmi: {item.size.name}</div>
                          {item.product.category !== 'icecream' && (
                            <div>Shakar: {item.sugar} • Muz: {item.ice}</div>
                          )}
                          {item.toppings.length > 0 && (
                            <div className="text-wedrink-teal font-semibold">
                              + {item.toppings.map((t) => t.name).join(', ')}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-fredoka font-bold text-wedrink-teal text-sm">
                            {formatPrice(item.totalPrice)}
                          </span>

                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="text-gray-500 hover:text-wedrink-teal"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="text-gray-500 hover:text-wedrink-teal"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Option Toggle */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <label className="font-fredoka text-sm font-bold text-wedrink-dark">
                    Buyurtma Usulini Tanlang:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        orderType === 'delivery'
                          ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base">🚚</span>
                      <span>Yetkazib berish</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        orderType === 'pickup'
                          ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base">🏪</span>
                      <span>Olib ketish</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-wedrink-teal" />
                      <span>Ismingiz:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ismingizni kiriting"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-wedrink-teal" />
                      <span>Telefon raqamingiz: *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-bold"
                    />
                  </div>

                  {orderType === 'delivery' ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-wedrink-pink" />
                        <span>Termiz bo'yicha manzil: *</span>
                      </label>
                      <textarea
                        placeholder="Ko'cha nomi, uy raqami, mo'ljal..."
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">
                        Qaysi filialdan olib ketasiz?
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none bg-white font-medium"
                      >
                        <option value="At-Termiziy ko'chasi, 45-uy (Markaziy park)">
                          Markaziy Park Filiali (At-Termiziy k.)
                        </option>
                        <option value="Barkamol Avlod ko'chasi, 12-uy (TerDU qarshisi)">
                          Universitet Filiali (TerDU qarshisi)
                        </option>
                      </select>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer Price Summary */}
          {!orderSubmitted && cartItems.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Mahsulotlar summasi:</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Yetkazib berish (Termiz):</span>
                    <span className="font-bold">{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-fredoka font-extrabold text-wedrink-teal pt-2 border-t border-gray-200">
                  <span>Jami To'lov:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-wedrink-pink hover:bg-wedrink-pink-hover text-white font-fredoka font-bold text-base py-3.5 rounded-2xl shadow-pink-glow flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-5 h-5" />
                <span>Telegram Orqali Buyurtma Berish</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
