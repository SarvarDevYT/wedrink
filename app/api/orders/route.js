import { NextResponse } from 'next/server';

// In-memory orders store (backed by fallback default demo orders)
let orders = [
  {
    id: 'WD-849201',
    customerName: 'Sardorbek Karimov',
    customerPhone: '+998 90 123 45 67',
    orderType: 'delivery',
    address: 'Termiz sh., At-Termiziy k., 12-uy',
    items: [
      {
        productName: 'Klassik Brown Sugar Bubble Tea',
        quantity: 2,
        size: 'Katta (700ml)',
        sugar: '70%',
        ice: '50%',
        toppings: ['Tapioka Boba'],
        totalPrice: 56000,
      },
      {
        productName: 'Matchali Muzqaymoq',
        quantity: 1,
        size: 'Standart',
        totalPrice: 15000,
      }
    ],
    subtotal: 71000,
    deliveryFee: 10000,
    grandTotal: 81000,
    status: 'Yangi',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'WD-392015',
    customerName: 'Madina Alimova',
    customerPhone: '+998 91 987 65 43',
    orderType: 'pickup',
    address: 'Markaziy Park Filiali (At-Termiziy k.)',
    items: [
      {
        productName: 'Matcha Latte Bubble Tea',
        quantity: 1,
        size: 'O\'rtacha (500ml)',
        sugar: '100%',
        ice: '100%',
        toppings: ['Sutli Pudding'],
        totalPrice: 32000,
      }
    ],
    subtotal: 32000,
    deliveryFee: 0,
    grandTotal: 32000,
    status: 'Tayyorlanmoqda',
    createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
  }
];

export async function GET() {
  return NextResponse.json({ success: true, orders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: 'WD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: body.customerName || 'Noma\'lum',
      customerPhone: body.customerPhone || '+998 90 000 00 00',
      orderType: body.orderType || 'delivery',
      address: body.address || 'Termiz',
      items: body.items || [],
      subtotal: body.subtotal || 0,
      deliveryFee: body.deliveryFee || 0,
      grandTotal: body.grandTotal || 0,
      status: 'Yangi',
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Buyurtma saqlandi!',
      order: newOrder,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { orderId, newStatus } = body;

    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;
      return NextResponse.json({ success: true, order });
    }

    return NextResponse.json({ success: false, message: 'Buyurtma topilmadi' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
