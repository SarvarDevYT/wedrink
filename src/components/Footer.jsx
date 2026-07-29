import React from 'react';
import { ArrowUp, Instagram, Send, Heart, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-wedrink-dark text-white pt-16 pb-8 relative overflow-hidden border-t-4 border-wedrink-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/wedrinkphotos/wedrinklogo.jpg"
                alt="WeDrink Logo"
                className="w-10 h-10 rounded-full border-2 border-wedrink-teal"
              />
              <span className="font-fredoka text-2xl font-bold text-wedrink-teal tracking-wide">
                WEDRINK <span className="text-wedrink-pink text-xs">✦</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Termiz shahridagi eng mazali Boba Tea, yapon Matchali muzqaymoqlari va tetiklantiruvchi mevali choylar maskani.
            </p>
            <div className="text-xs text-wedrink-yellow font-fredoka font-bold">
              "Yangi Ta'm, Yangi Zavq!" 🍦🧋
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-lg font-bold text-white">Navigatsiya</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><a href="#hero" className="hover:text-wedrink-teal transition-colors">Bosh sahifa</a></li>
              <li><a href="#menu" className="hover:text-wedrink-teal transition-colors">Rasmiy Menyu</a></li>
              <li><a href="#promotions" className="hover:text-wedrink-teal transition-colors">Mavsumiy Aksiyalar</a></li>
              <li><a href="#gallery" className="hover:text-wedrink-teal transition-colors">Fotogalereya</a></li>
              <li><a href="#about" className="hover:text-wedrink-teal transition-colors">Biz haqimizda</a></li>
              <li><a href="#locations" className="hover:text-wedrink-teal transition-colors">Termiz Filiallari</a></li>
            </ul>
          </div>

          {/* Col 3: Working Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-lg font-bold text-white">Ish Vaqti & Aloqa</h4>
            <div className="space-y-2 text-xs text-gray-300">
              <p><strong className="text-white">Har kuni:</strong> 08:30 - 23:00</p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-wedrink-pink" />
                <span>+998 90 123 45 67</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-wedrink-teal" />
                <span>Termiz sh., At-Termiziy ko'chasi 45</span>
              </p>
            </div>
          </div>

          {/* Col 4: Social Media */}
          <div className="space-y-4">
            <h4 className="font-fredoka text-lg font-bold text-white">Biz Ijtimoiy Tarmoqlarda</h4>
            <p className="text-xs text-gray-400">
              Bizni kuzatib boring, yangi ta'mlar va aksiyalarni o'tkazib yubormang!
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/wedrink_termiz"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-wedrink-pink text-white flex items-center justify-center transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/wedrink_termiz"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-wedrink-teal text-white flex items-center justify-center transition-all shadow-sm"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} WeDrink Termiz. Barcha huquqlar himoyalangan. Made with</span>
            <Heart className="w-3.5 h-3.5 text-wedrink-pink fill-wedrink-pink" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-wedrink-teal hover:text-white bg-gray-800 hover:bg-wedrink-teal px-4 py-2 rounded-full transition-all"
          >
            <span>Yuqoriga</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
