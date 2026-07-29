'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Heart, Sparkles, MapPin } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bosh sahifa', href: '#hero' },
    { name: 'Menyu', href: '#menu' },
    { name: 'Aksiyalar', href: '#promotions' },
    { name: 'Galereya', href: '#gallery' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Filiallar', href: '#locations' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-black/10 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-wedrink-teal shadow-cute group-hover:scale-105 transition-transform duration-300">
              <img
                src="/wedrinkphotos/wedrinklogo.jpg"
                alt="WeDrink Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-fredoka text-2xl font-bold text-wedrink-teal tracking-wide flex items-center gap-1">
                WEDRINK <span className="text-wedrink-pink text-sm">✦</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-wedrink-gray uppercase -mt-1">
                Termiz • Ice Cream & Tea
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-wedrink-teal/15 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-wedrink-dark hover:text-wedrink-teal hover:bg-wedrink-teal-ultra transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Telegram Contact quick button */}
            <a
              href="https://t.me/wedrink_termiz"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-wedrink-teal bg-wedrink-teal-light hover:bg-wedrink-teal hover:text-white px-3 py-2 rounded-full transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>@wedrink_termiz</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center bg-wedrink-teal hover:bg-wedrink-teal-dark text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full font-semibold shadow-cute hover:shadow-cute-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 sm:mr-1.5" />
              <span className="hidden sm:inline text-sm">Savatcha</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-wedrink-pink text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-slow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-wedrink-dark hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 mt-2 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-semibold text-wedrink-dark hover:bg-wedrink-teal-light hover:text-wedrink-teal transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="https://t.me/wedrink_termiz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-bold text-wedrink-teal bg-wedrink-teal-ultra py-3 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                Telegram: @wedrink_termiz
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
