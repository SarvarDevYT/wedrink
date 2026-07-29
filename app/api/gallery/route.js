import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM gallery ORDER BY id DESC');

    const formattedGallery = rows.map((g) => ({
      id: Number(g.id),
      title: g.title,
      image: g.image,
      likes: Number(g.likes) || 120,
      tag: g.tag || '#wedrink_termiz',
    }));

    return NextResponse.json({ success: true, gallery: formattedGallery });
  } catch (error) {
    console.error('Supabase Gallery GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = body.title || 'WeDrink Termiz Fotolavhasi';
    const image = body.image || '/wedrinkphotos/wedrinklogo_circle.png';
    const likes = Number(body.likes) || Math.floor(100 + Math.random() * 300);
    const tag = body.tag || '#wedrink_termiz';

    const insertQuery = `
      INSERT INTO gallery (title, image, likes, tag)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    await pool.query(insertQuery, [title, image, likes, tag]);

    const { rows } = await pool.query('SELECT * FROM gallery ORDER BY id DESC');
    const formattedGallery = rows.map((g) => ({
      id: Number(g.id),
      title: g.title,
      image: g.image,
      likes: Number(g.likes) || 120,
      tag: g.tag || '#wedrink_termiz',
    }));

    return NextResponse.json({
      success: true,
      message: 'Fotolavha saqlandi!',
      gallery: formattedGallery,
    });
  } catch (error) {
    console.error('Supabase Gallery POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    await pool.query('DELETE FROM gallery WHERE id = $1', [id]);

    const { rows } = await pool.query('SELECT * FROM gallery ORDER BY id DESC');
    const formattedGallery = rows.map((g) => ({
      id: Number(g.id),
      title: g.title,
      image: g.image,
      likes: Number(g.likes) || 120,
      tag: g.tag || '#wedrink_termiz',
    }));

    return NextResponse.json({
      success: true,
      message: 'Fotolavha o\'chirildi',
      gallery: formattedGallery,
    });
  } catch (error) {
    console.error('Supabase Gallery DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
