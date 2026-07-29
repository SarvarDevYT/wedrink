const { Client } = require('pg');

const connectionString = 'postgresql://postgres.moewvaqumnoqoklsrhlr:VJqRvd4L8sBi6q62@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const initialProducts = [
  {
    id: 1,
    name: 'Matchali Muzqaymoq',
    category: 'icecream',
    popular: true,
    price: 15000,
    rating: 4.9,
    reviews_count: 142,
    badge: 'YANGI!',
    badge_color: 'bg-wedrink-pink',
    image: '/products/matcha_ice_cream.png',
    description: 'Yaponiyaning sifatli Matcha kukuni va mayin sutli muzqaymoq uyg‘unligi. Yangi ta’m, yangi zavq!',
    calories: '180 kcal',
    customizable: true,
  },
  {
    id: 2,
    name: 'Klassik Brown Sugar Bubble Tea',
    category: 'boba',
    popular: true,
    price: 24000,
    rating: 5.0,
    reviews_count: 230,
    badge: 'BESTSELLER',
    badge_color: 'bg-wedrink-teal',
    image: '/products/brown_sugar_boba.png',
    description: 'Qora shakar karameli, yangi tayyorlangan marvarid boba shariklari va mayin qaymoqli sutli Bubble Tea.',
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
    reviews_count: 98,
    badge: 'SALQIN!',
    badge_color: 'bg-amber-500',
    image: '/products/mango_fresh_tea.png',
    description: 'Tabiiy mango pyuresi, ehtiros mevas (passion fruit) va ko‘k choy asosidagi muzdek tetiklantiruvchi ichimlik.',
    calories: '160 kcal',
    customizable: true,
  },
  {
    id: 4,
    name: 'Matcha Latte Bubble Tea',
    category: 'coffee',
    popular: true,
    price: 28000,
    rating: 4.9,
    reviews_count: 115,
    badge: 'TOP',
    badge_color: 'bg-emerald-600',
    image: '/products/matcha_latte_boba.png',
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
    reviews_count: 84,
    image: '/products/chocolate_sundae.png',
    description: 'Nafis sutli muzqaymoq ustiga quyuq Shveytsariya shokolad sousi va qarsillaydigan vaflilar.',
    calories: '240 kcal',
    customizable: true,
  },
  {
    id: 6,
    name: 'Taro Milk Tea (Bubble Tea)',
    category: 'boba',
    popular: false,
    price: 25000,
    rating: 4.8,
    reviews_count: 76,
    image: '/products/taro_milk_tea.png',
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
    reviews_count: 104,
    image: '/products/lemon_mint_tea.png',
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
    reviews_count: 310,
    badge: 'SUPER NARX',
    badge_color: 'bg-wedrink-pink',
    image: '/products/vanilla_cone.png',
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
    reviews_count: 65,
    image: '/products/strawberry_smoothie.png',
    description: 'Tabiiy qulupnay pyuresi, kokos suti va muz bintidan iborat shirin va salqin smuzi.',
    calories: '210 kcal',
    customizable: true,
  }
];

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL database!');

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        popular BOOLEAN DEFAULT false,
        price INTEGER NOT NULL,
        rating NUMERIC(2,1) DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 1,
        badge TEXT,
        badge_color TEXT,
        image TEXT,
        description TEXT,
        calories TEXT,
        customizable BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Table "products" created/verified.');

    // Create orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        order_type TEXT NOT NULL,
        address TEXT,
        items JSONB NOT NULL,
        subtotal INTEGER NOT NULL,
        delivery_fee INTEGER DEFAULT 0,
        grand_total INTEGER NOT NULL,
        status TEXT DEFAULT 'Yangi',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Table "orders" created/verified.');

    // Insert initial products if table is empty
    const res = await client.query('SELECT COUNT(*) FROM products;');
    const count = parseInt(res.rows[0].count, 10);
    if (count === 0) {
      console.log('Seeding initial products into Supabase...');
      for (const p of initialProducts) {
        await client.query(`
          INSERT INTO products (id, name, category, popular, price, rating, reviews_count, badge, badge_color, image, description, calories, customizable)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `, [p.id, p.name, p.category, p.popular, p.price, p.rating, p.reviews_count, p.badge, p.badge_color, p.image, p.description, p.calories, p.customizable]);
      }
      console.log('All 9 initial products seeded successfully into Supabase!');
    } else {
      console.log(`Products table already contains ${count} items.`);
    }

    await client.end();
    console.log('Supabase setup finished cleanly!');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

setupDatabase();
