const { Client } = require('pg');

const connectionString = 'postgresql://postgres.moewvaqumnoqoklsrhlr:VJqRvd4L8sBi6q62@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function updateDb() {
  await client.connect();
  await client.query("UPDATE products SET image = '/products/lemon_mint_tea.png' WHERE id = 7;");
  await client.query("UPDATE products SET image = '/products/vanilla_cone.png' WHERE id = 8;");
  await client.query("UPDATE products SET image = '/products/strawberry_smoothie.png' WHERE id = 9;");
  console.log('Supabase products 7, 8, 9 image URLs updated to photorealistic food photography!');
  await client.end();
}

updateDb();
