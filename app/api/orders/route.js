import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');

    const formattedOrders = rows.map((o) => ({
      id: o.id,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      orderType: o.order_type,
      address: o.address,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      subtotal: Number(o.subtotal),
      deliveryFee: Number(o.delivery_fee),
      grandTotal: Number(o.grand_total),
      status: o.status,
      createdAt: o.created_at,
    }));

    return NextResponse.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error('Supabase Orders GET error:', error);
    return NextResponse.json({ success: true, orders: [] });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = 'WD-' + Math.floor(100000 + Math.random() * 900000);
    const customerName = body.customerName || 'Noma\'lum';
    const customerPhone = body.customerPhone || '+998 90 000 00 00';
    const orderType = body.orderType || 'delivery';
    const address = body.address || 'Termiz';
    const items = JSON.stringify(body.items || []);
    const subtotal = Number(body.subtotal) || 0;
    const deliveryFee = Number(body.deliveryFee) || 0;
    const grandTotal = Number(body.grandTotal) || 0;
    const status = 'Yangi';

    const insertQuery = `
      INSERT INTO orders (id, customer_name, customer_phone, order_type, address, items, subtotal, delivery_fee, grand_total, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    await pool.query(insertQuery, [
      orderId,
      customerName,
      customerPhone,
      orderType,
      address,
      items,
      subtotal,
      deliveryFee,
      grandTotal,
      status,
    ]);

    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    const formattedOrders = rows.map((o) => ({
      id: o.id,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      orderType: o.order_type,
      address: o.address,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      subtotal: Number(o.subtotal),
      deliveryFee: Number(o.delivery_fee),
      grandTotal: Number(o.grand_total),
      status: o.status,
      createdAt: o.created_at,
    }));

    return NextResponse.json({
      success: true,
      message: 'Buyurtma Supabase bazasiga saqlandi!',
      orderId,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error('Supabase Orders POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { orderId, newStatus } = body;

    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [newStatus, orderId]);

    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    const formattedOrders = rows.map((o) => ({
      id: o.id,
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      orderType: o.order_type,
      address: o.address,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      subtotal: Number(o.subtotal),
      deliveryFee: Number(o.delivery_fee),
      grandTotal: Number(o.grand_total),
      status: o.status,
      createdAt: o.created_at,
    }));

    return NextResponse.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error('Supabase Orders PATCH error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
