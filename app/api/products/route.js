import { NextResponse } from 'next/server';
import { PRODUCTS as initialProducts } from '../../../data/products';

let productsStore = [...initialProducts];

export async function GET() {
  return NextResponse.json({ success: true, products: productsStore });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: Date.now(),
      name: body.name,
      category: body.category || 'boba',
      popular: body.popular || false,
      price: Number(body.price) || 20000,
      rating: 5.0,
      reviewsCount: 1,
      badge: body.badge || 'YANGI',
      badgeColor: body.badgeColor || 'bg-wedrink-pink',
      image: body.image || '/products/brown_sugar_boba.png',
      description: body.description || 'Yangi mazali ichimlik.',
      calories: body.calories || '200 kcal',
      customizable: true,
    };

    productsStore.unshift(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Yangi mahsulot qo\'shildi!',
      product: newProduct,
      products: productsStore,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    productsStore = productsStore.filter((p) => p.id !== id);

    return NextResponse.json({
      success: true,
      message: 'Mahsulot o\'chirildi',
      products: productsStore,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
