export const CATEGORIES = [
  { id: 'all', name: 'Hamma ta\'mlar', icon: '✨' },
  { id: 'popular', name: '🔥 Top Ta\'mlar', icon: '🔥' },
  { id: 'icecream', name: '🍦 Muzqaymoqlar', icon: '🍦' },
  { id: 'boba', name: '🧋 Boba & Milk Tea', icon: '🧋' },
  { id: 'fruit', name: '🍹 Mevali Ichimliklar', icon: '🍹' },
  { id: 'coffee', name: '☕ Matcha & Qahva', icon: '☕' },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Matchali Muzqaymoq',
    category: 'icecream',
    popular: true,
    price: 15000,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'YANGI!',
    badgeColor: 'bg-wedrink-pink',
    image: '/wedrinkphotos/5426900635921094966_121.jpg',
    description: 'Yaponiyaning sifatli Matcha kukuni va mayin sutli muzqaymoq uyg‘unligi. Yangi ta’m, yangi zavq!',
    calories: '180 kcal',
    customizable: true,
  },
  {
    id: 2,
    name: 'Klassik Brown Sugar Boba Tea',
    category: 'boba',
    popular: true,
    price: 24000,
    rating: 5.0,
    reviewsCount: 230,
    badge: 'BESTSELLER',
    badgeColor: 'bg-wedrink-teal',
    image: '/wedrinkphotos/5426900635921094963_121.jpg',
    description: 'Qora shakar karameli, yangi tayyorlangan marvarid boba shariklari va mayin qaymoqli sutli choy.',
    calories: '290 kcal',
    customizable: true,
  },
  {
    id: 3,
    name: 'Mango Passion Fruit Fresh Tea',
    category: 'fruit',
    popular: true,
    price: 26000,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'SALQIN!',
    badgeColor: 'bg-amber-500',
    image: '/wedrinkphotos/5426900635921094964_121.jpg',
    description: 'Tabiiy mango pyuresi, ehtiros mevas (passion fruit) va ko‘k choy asosidagi muzdek tetiklantiruvchi ichimlik.',
    calories: '160 kcal',
    customizable: true,
  },
  {
    id: 4,
    name: 'Matcha Latte Boba',
    category: 'coffee',
    popular: true,
    price: 28000,
    rating: 4.9,
    reviewsCount: 115,
    badge: 'TOP',
    badgeColor: 'bg-emerald-600',
    image: '/wedrinkphotos/5426900635921094965_121.jpg',
    description: 'Premium Matcha choyi, tabiy sut va chaynash uchun yoqimli Tapioka boba marvaridlari.',
    calories: '220 kcal',
    customizable: true,
  },
  {
    id: 5,
    name: 'Shokoladli Sundae Muzqaymoq',
    category: 'icecream',
    popular: false,
    price: 18000,
    rating: 4.7,
    reviewsCount: 84,
    image: '/wedrinkphotos/5426900635921094967_121.jpg',
    description: 'Nafis sutli muzqaymoq ustiga quyuq Shveytsariya shokolad sousi va qarsillaydigan vaflilar.',
    calories: '240 kcal',
    customizable: true,
  },
  {
    id: 6,
    name: 'Taro Milk Tea Boba',
    category: 'boba',
    popular: false,
    price: 25000,
    rating: 4.8,
    reviewsCount: 76,
    image: '/wedrinkphotos/5426900635921094968_121.jpg',
    description: 'Binafsharang Taro (shirin kartoshka) ta\'mli mayin sutli choy va tabiiy tapioka bobasi.',
    calories: '270 kcal',
    customizable: true,
  },
  {
    id: 7,
    name: 'Limon va Yalpizli Fresh Tea',
    category: 'fruit',
    popular: false,
    price: 22000,
    rating: 4.9,
    reviewsCount: 104,
    image: '/wedrinkphotos/5426900635921094969_121.jpg',
    description: 'Yangi kesilgan limon bo‘laklari, uzilgan yalpiz barglari va oolong choyidan tayyorlangan muzdek miks.',
    calories: '110 kcal',
    customizable: true,
  },
  {
    id: 8,
    name: 'Klassik Vaniyli Konus Muzqaymoq',
    category: 'icecream',
    popular: true,
    price: 10000,
    rating: 4.9,
    reviewsCount: 310,
    badge: 'SUPER NARX',
    badgeColor: 'bg-wedrink-pink',
    image: '/wedrinkphotos/5426900635921094971_121.jpg',
    description: 'Har kuni yangi tayyorlanadigan g‘irt sutli vanilli konus muzqaymoq. Bolalar va kattalar sevimli ta\'mi.',
    calories: '150 kcal',
    customizable: false,
  },
  {
    id: 9,
    name: 'Strawberry Coconut Smoothie',
    category: 'fruit',
    popular: false,
    price: 27000,
    rating: 4.8,
    reviewsCount: 65,
    image: '/wedrinkphotos/5426900635921094962_121.jpg',
    description: 'Tabiiy qulupnay pyuresi, kokos suti va muz bintidan iborat shirin va salqin smuzi.',
    calories: '210 kcal',
    customizable: true,
  }
];

export const TOPPINGS = [
  { id: 'boba', name: 'Tapioka Boba', price: 4000 },
  { id: 'pudding', name: 'Sutli Pudding', price: 4000 },
  { id: 'coconut_jelly', name: 'Kokos Jelesi', price: 4000 },
  { id: 'popping_boba', name: 'Meva Popping Boba', price: 5000 },
  { id: 'ice_cream_scoop', name: 'Muzqaymoq Shari', price: 6000 },
];

export const SUGAR_LEVELS = ['100% (Standart)', '70% (Kamroq)', '50% (O\'rtacha)', '30% (Ozgina)', '0% (Shakarsiz)'];
export const ICE_LEVELS = ['100% Muz (Standart)', '50% Muz (Kamroq)', 'Muzsiz (Illiq)'];
export const SIZES = [
  { id: 'M', name: 'O\'rtacha (500ml)', extraPrice: 0 },
  { id: 'L', name: 'Katta (700ml)', extraPrice: 4000 },
];

export const PROMOTIONS = [
  {
    id: 1,
    title: 'Matchali Muzqaymoq Aksiyasi!',
    subtitle: 'Tez kel, bugundan Matchali muzqaymoq sotuvda!',
    description: 'Yangi ta\'m, yangi zavq! Matcha ixlosmandlari uchun maxsus taklif.',
    image: '/wedrinkphotos/5426900635921094966_121.jpg',
    tag: 'YANGILIK',
    bgGradient: 'from-[#00A896] to-emerald-800'
  },
  {
    id: 2,
    title: '2+1 Boba Choy Aksiyasi',
    subtitle: 'Har 2 ta katta Boba Choy xaridiga 1 ta Muzqaymoq BEPUL!',
    description: 'Do\'stlaringiz bilan keling va mazali boba ta\'midan bahramand bo\'ling.',
    image: '/wedrinkphotos/5426900635921094963_121.jpg',
    tag: 'TEKUN',
    bgGradient: 'from-wedrink-teal to-cyan-900'
  },
  {
    id: 3,
    title: 'Issiq kunlarda Muzdek Smuzilar!',
    subtitle: 'Barcha mevali choylarga 15% chegirma',
    description: 'Termizning issiq kunlarida salqinlik baxsh etuvchi eng sara ichimliklar.',
    image: '/wedrinkphotos/5426900635921094965_121.jpg',
    tag: 'CHEGIRMA',
    bgGradient: 'from-pink-600 to-rose-950'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Sardorbek K.',
    rating: 5,
    comment: 'Termizdagi eng zo\'r boba tea shu yerda! Ayniqsa Brown sugar boba va Matchali muzqaymoq juda mazali.',
    date: 'Kecha',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Madinabonu A.',
    rating: 5,
    comment: 'Personajlari juda yoqimtoy! Bolalarim kelishni juda yaxshi ko\'radi. Dizayn va atmosfera a\'lo darajada.',
    date: '3 kun oldin',
    avatar: '👩‍⚕️'
  },
  {
    id: 3,
    name: 'Jahongir R.',
    rating: 5,
    comment: 'Yetkazib berish juda tez. Telegram orqali buyurtma berish ham qulay ekan. 10/10!',
    date: 'O\'tgan hafta',
    avatar: '👨‍💻'
  }
];

export const LOCATIONS = [
  {
    id: 1,
    name: 'WeDrink Termiz Markaziy Filial',
    address: 'Termiz sh., At-Termiziy ko\'chasi, 45-uy (Markaziy park yonida)',
    hours: 'Har kuni: 09:00 - 23:00',
    phone: '+998 90 123 45 67',
    telegram: '@wedrink_termiz',
    instagram: 'wedrink_termiz'
  },
  {
    id: 2,
    name: 'WeDrink Termiz Universitet Filiali',
    address: 'Termiz sh., Barkamol Avlod ko\'chasi, 12-uy (TerDU qarshisida)',
    hours: 'Har kuni: 08:30 - 22:30',
    phone: '+998 91 987 65 43',
    telegram: '@wedrink_termiz',
    instagram: 'wedrink_termiz'
  }
];
