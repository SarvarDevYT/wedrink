import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { PRODUCTS as initialProducts } from '../../../data/products';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC');
    
    // Fallback if empty
    if (rows.length === 0) {
      return NextResponse.json({ success: true, products: initialProducts });
    }

    const formattedProducts = rows.map((p) => ({
      id: Number(p.id),
      name: p.name,
      category: p.category,
      popular: p.popular,
      price: Number(p.price),
      rating: Number(p.rating) || 5.0,
      reviewsCount: Number(p.reviews_count) || 1,
      badge: p.badge,
      badgeColor: p.badge_color || 'bg-wedrink-pink',
      image: p.image,
      description: p.description,
      calories: p.calories || '200 kcal',
      customizable: p.customizable,
    }));

    return NextResponse.json({ success: true, products: formattedProducts });
  } catch (error) {
    console.error('Supabase Products GET error:', error);
    return NextResponse.json({ success: true, products: initialProducts });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name;
    const category = body.category || 'boba';
    const popular = body.popular || false;
    const price = Number(body.price) || 20000;
    const rating = 5.0;
    const reviewsCount = 1;
    const badge = body.badge || 'YANGI';
    const badgeColor = body.badgeColor || 'bg-wedrink-pink';
    const image = body.image || '/products/brown_sugar_boba.png';
    const description = body.description || 'Yangi mazali ichimlik.';
    const calories = body.calories || '200 kcal';
    const customizable = true;

    const insertQuery = `
      INSERT INTO products (name, category, popular, price, rating, reviews_count, badge, badge_color, image, description, calories, customizable)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;

    await pool.query(insertQuery, [
      name,
      category,
      popular,
      price,
      rating,
      reviewsCount,
      badge,
      badgeColor,
      image,
      description,
      calories,
      customizable,
    ]);

    const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC');
    const formattedProducts = rows.map((p) => ({
      id: Number(p.id),
      name: p.name,
      category: p.category,
      popular: p.popular,
      price: Number(p.price),
      rating: Number(p.rating) || 5.0,
      reviewsCount: Number(p.reviews_count) || 1,
      badge: p.badge,
      badgeColor: p.badge_color || 'bg-wedrink-pink',
      image: p.image,
      description: p.description,
      calories: p.calories || '200 kcal',
      customizable: p.customizable,
    }));

    return NextResponse.json({
      success: true,
      message: 'Mahsulot Supabase bazasiga saqlandi!',
      products: formattedProducts,
    });
  } catch (error) {
    console.error('Supabase Products POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC');
    const formattedProducts = rows.map((p) => ({
      id: Number(p.id),
      name: p.name,
      category: p.category,
      popular: p.popular,
      price: Number(p.price),
      rating: Number(p.rating) || 5.0,
      reviewsCount: Number(p.reviews_count) || 1,
      badge: p.badge,
      badgeColor: p.badge_color || 'bg-wedrink-pink',
      image: p.image,
      description: p.description,
      calories: p.calories || '200 kcal',
      customizable: p.customizable,
    }));

    return NextResponse.json({
      success: true,
      message: 'Mahsulot Supabase bazasidan o\'chirildi',
      products: formattedProducts,
    });
  } catch (error) {
    console.error('Supabase Products DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
