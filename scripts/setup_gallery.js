const { Client } = require('pg');

const connectionString = 'postgresql://postgres.moewvaqumnoqoklsrhlr:VJqRvd4L8sBi6q62@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const defaultGallery = [
  {
    title: "WeDrink Termiz Markaziy Filiali Ochilishi",
    image: "/wedrinkphotos/5426900635921094966_121.jpg",
    likes: 342,
    tag: "#wedrink_termiz"
  },
  {
    title: "Samimiy Mijozlarimiz va Shiringoylik",
    image: "/wedrinkphotos/5426900635921094963_121.jpg",
    likes: 215,
    tag: "#termiz_boba"
  },
  {
    title: "Yangi Matchali Muzqaymoqlarimzi Tayyorlash Jarayoni",
    image: "/wedrinkphotos/5426900635921094965_121.jpg",
    likes: 189,
    tag: "#matcha_icecream"
  },
  {
    title: "Termiz Shahrida Salqinlik va Zavqli Lahzalar",
    image: "/wedrinkphotos/5426900635921094964_121.jpg",
    likes: 278,
    tag: "#summer_vibes"
  },
  {
    title: "Bizning Sevimli WeDrink Mascot Personajimiz",
    image: "/wedrinkphotos/5426900635921094967_121.jpg",
    likes: 412,
    tag: "#wedrink_mascot"
  },
  {
    title: "Taro Milk Tea va Tapioka Boba Marvaridlari",
    image: "/wedrinkphotos/5426900635921094968_121.jpg",
    likes: 195,
    tag: "#boba_tea"
  }
];

async function setupGalleryTable() {
  try {
    await client.connect();
    console.log('Connected to Supabase for Gallery table...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        likes INTEGER DEFAULT 120,
        tag TEXT DEFAULT '#wedrink',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Table "gallery" created/verified in Supabase.');

    const res = await client.query('SELECT COUNT(*) FROM gallery;');
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
      console.log('Seeding default gallery photos into Supabase...');
      for (const item of defaultGallery) {
        await client.query(`
          INSERT INTO gallery (title, image, likes, tag)
          VALUES ($1, $2, $3, $4);
        `, [item.title, item.image, item.likes, item.tag]);
      }
      console.log('Initial gallery photos seeded successfully!');
    } else {
      console.log(`Gallery table already has ${count} items.`);
    }

    await client.end();
  } catch (err) {
    console.error('Gallery setup error:', err);
  }
}

setupGalleryTable();
