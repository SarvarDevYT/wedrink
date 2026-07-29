import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customerName, customerPhone, orderType, address, grandTotal } = body;

    // Example Payment Integration (Click / Payme / Telegram Bot webhook)
    // Here you can generate Click Checkout URL or Save order in DB

    return NextResponse.json({
      success: true,
      message: 'Buyurtma muvaffaqiyatli qabul qilindi!',
      orderId: 'WD-' + Math.floor(100000 + Math.random() * 900000),
      grandTotal,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
