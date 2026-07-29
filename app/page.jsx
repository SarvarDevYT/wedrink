'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import ProductModal from '../components/ProductModal';
import Promotions from '../components/Promotions';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Locations from '../components/Locations';
import StoreInfo from '../components/StoreInfo';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedrink_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wedrink_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const handleAddToCart = (customizedItem) => {
    setCartItems((prev) => [...prev, customizedItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const unitPrice = item.unitPrice;
      updated[index] = {
        ...item,
        quantity: newQty,
        totalPrice: unitPrice * newQty,
      };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F6FAF9] flex flex-col font-sans text-[#112523] selection:bg-[#00A896] selection:text-white">
      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section with Mascot */}
        <Hero onOpenMenu={() => {}} />

        {/* Interactive Menu Section */}
        <Menu onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* Seasonal Promotions */}
        <Promotions onSelectPromo={() => {}} />

        {/* Instagram & Real Photo Gallery */}
        <Gallery />

        {/* Brand Story & Mascot Philosophy */}
        <About />

        {/* Termiz Branch Locations & Map */}
        <Locations />

        {/* Halal Certificate, Working Hours & Standards Info Section */}
        <StoreInfo />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
