import { Fredoka, Outfit } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: "WeDrink Termiz - Muzqaymoqlar, Bubble Tea & Boba Tea",
  description: "WeDrink Termiz rasmiy veb-sayti. Mazali Bubble Tea (Boba Tea), Matchali muzqaymoq, mevali ichimliklar va muzdek smuzilar. Termiz bo'yicha tezkor buyurtma berish.",
  icons: {
    icon: '/wedrinkphotos/wedrinklogo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={`${fredoka.variable} ${outfit.variable}`}>
      <body className="bg-[#F6FAF9] text-[#112523] font-sans selection:bg-[#00A896] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
