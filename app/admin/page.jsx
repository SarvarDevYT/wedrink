'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  LogOut,
  ArrowLeft,
  X,
  Sparkles,
  Phone,
  Filter,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Camera,
  Heart
} from 'lucide-react';
import { PRODUCTS as defaultProducts } from '../../data/products';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'gallery'
  const [orderFilter, setOrderFilter] = useState('all');

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(defaultProducts);
  const [gallery, setGallery] = useState([]);

  // Modals state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddGalleryModalOpen, setIsAddGalleryModalOpen] = useState(false);
  
  const [imageUploadType, setImageUploadType] = useState('preset'); // 'preset' | 'file' | 'url'
  const [galleryUploadType, setGalleryUploadType] = useState('file'); // 'file' | 'url'

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'boba',
    price: '',
    badge: 'YANGI',
    badgeColor: 'bg-wedrink-pink',
    image: '/products/brown_sugar_boba.png',
    description: '',
    calories: '200 kcal',
  });

  const [newGallery, setNewGallery] = useState({
    title: '',
    image: '',
    tag: '#wedrink_termiz',
    likes: 150,
  });

  const PRESET_IMAGES = [
    { label: '🧋 Brown Sugar Boba', value: '/products/brown_sugar_boba.png' },
    { label: '🍵 Matcha Ice Cream', value: '/products/matcha_ice_cream.png' },
    { label: '🍹 Mango Fresh Tea', value: '/products/mango_fresh_tea.png' },
    { label: '🍵 Matcha Latte Boba', value: '/products/matcha_latte_boba.png' },
    { label: '🍨 Chocolate Sundae', value: '/products/chocolate_sundae.png' },
    { label: '🧋 Taro Milk Tea', value: '/products/taro_milk_tea.png' },
    { label: '🍋 Lemon Mint Tea', value: '/products/lemon_mint_tea.png' },
    { label: '🍦 Vanilla Cone', value: '/products/vanilla_cone.png' },
    { label: '🍓 Strawberry Smoothie', value: '/products/strawberry_smoothie.png' },
  ];

  useEffect(() => {
    const auth = sessionStorage.getItem('wedrink_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchOrders();
    fetchProducts();
    fetchGallery();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (e) {}
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (e) {}
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && data.gallery) {
        setGallery(data.gallery);
      }
    } catch (e) {}
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('wedrink_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wedrink_admin_auth');
    setPin('');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, newStatus }),
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (e) {}
  };

  const handleFileUpload = (e, targetSetter, currentObj) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        targetSetter({ ...currentObj, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Iltimos, mahsulot nomi va narxini kiriting!');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
        setIsAddProductModalOpen(false);
        setNewProduct({
          name: '',
          category: 'boba',
          price: '',
          badge: 'YANGI',
          badgeColor: 'bg-wedrink-pink',
          image: '/products/brown_sugar_boba.png',
          description: '',
          calories: '200 kcal',
        });
      }
    } catch (e) {}
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Ushbu mahsulotni o\'chirmoqchimisiz?')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (e) {}
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.image) {
      alert('Iltimos, fotolavha sarlavhasi va rasmini tanlang!');
      return;
    }

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });

      const data = await res.json();
      if (data.success && data.gallery) {
        setGallery(data.gallery);
        setIsAddGalleryModalOpen(false);
        setNewGallery({
          title: '',
          image: '',
          tag: '#wedrink_termiz',
          likes: 150,
        });
      }
    } catch (e) {}
  };

  const handleDeleteGallery = async (id) => {
    if (!confirm('Ushbu fotolavhani galereyadan o\'chirmoqchimisiz?')) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success && data.gallery) {
        setGallery(data.gallery);
      }
    } catch (e) {}
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Yangi').length;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00A896] via-[#008075] to-[#112523] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-wedrink-teal-light text-wedrink-teal flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-fredoka text-3xl font-extrabold text-wedrink-dark">
              WeDrink Admin Panel
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Boshqaruv paneliga kirish uchun PAROL / PIN kodni kiriting (Parol: <strong className="text-wedrink-teal">1234</strong>)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">
                Admin Paroli:
              </label>
              <input
                type="password"
                placeholder="****"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className={`w-full px-4 py-3 rounded-2xl border text-center text-lg font-mono font-bold tracking-widest outline-none transition-all ${
                  pinError
                    ? 'border-wedrink-pink bg-wedrink-pink-light text-wedrink-pink'
                    : 'border-gray-200 focus:border-wedrink-teal focus:ring-4 focus:ring-wedrink-teal/10'
                }`}
              />
              {pinError && (
                <p className="text-xs font-bold text-wedrink-pink mt-1.5 text-center">
                  Xato parol! Qaytadan urinib ko'ring (Parol: 1234).
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-wedrink-teal hover:bg-wedrink-teal-dark text-white font-fredoka font-bold text-base py-3.5 rounded-2xl shadow-cute transition-all"
            >
              Panelga Kirish
            </button>
          </form>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-wedrink-teal pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Asosiy saytga qaytish</span>
          </a>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FAF9] text-wedrink-dark font-sans pb-16">
      
      {/* Top Admin Header Bar */}
      <header className="bg-wedrink-dark text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <img
              src="/wedrinkphotos/wedrinklogo_circle.png"
              alt="WeDrink Logo"
              className="w-10 h-10 rounded-full border-2 border-wedrink-teal bg-white"
            />
            <div>
              <div className="font-fredoka text-xl font-bold text-wedrink-teal leading-none">
                WEDRINK <span className="text-wedrink-yellow text-xs">ADMIN</span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Boshqaruv & Analitika Paneli</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-800 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Saytga O'tish</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-wedrink-pink bg-wedrink-pink-light hover:bg-wedrink-pink hover:text-white px-3.5 py-2 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Stats Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Total Revenue */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
              💰
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Jami Tushum</span>
              <span className="font-fredoka text-2xl font-extrabold text-wedrink-teal">
                {formatPrice(totalRevenue)}
              </span>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-wedrink-teal-light text-wedrink-teal flex items-center justify-center text-xl font-bold">
              🛍️
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Jami Buyurtmalar</span>
              <span className="font-fredoka text-2xl font-extrabold text-wedrink-dark">
                {orders.length} ta
              </span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-wedrink-pink flex items-center justify-center text-xl font-bold">
              🔴
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Yangi Buyurtmalar</span>
              <span className="font-fredoka text-2xl font-extrabold text-wedrink-pink">
                {pendingOrdersCount} ta
              </span>
            </div>
          </div>

          {/* Total Gallery Photos */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
              📸
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Fotolavhalar</span>
              <span className="font-fredoka text-2xl font-extrabold text-purple-600">
                {gallery.length} ta
              </span>
            </div>
          </div>

        </div>

        {/* Tab Switcher & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-3 rounded-xl font-fredoka font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-wedrink-teal text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📦 Buyurtmalar ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-3 rounded-xl font-fredoka font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-wedrink-teal text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🥤 Menyu ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-3 rounded-xl font-fredoka font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-wedrink-teal text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📸 Fotolavhalar ({gallery.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-wedrink-pink hover:bg-wedrink-pink-hover text-white font-fredoka font-bold text-sm px-5 py-3 rounded-xl shadow-pink-glow transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Yangi Mahsulot Qo'shish</span>
            </button>
          )}

          {activeTab === 'gallery' && (
            <button
              onClick={() => setIsAddGalleryModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-wedrink-teal hover:bg-wedrink-teal-dark text-white font-fredoka font-bold text-sm px-5 py-3 rounded-xl shadow-cute transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>Yangi Fotolavha Qo'shish</span>
            </button>
          )}

        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mr-2">
                <Filter className="w-4 h-4" />
                <span>Filtr:</span>
              </span>
              {[
                { id: 'all', label: 'Hamma buyurtmalar' },
                { id: 'Yangi', label: '🔴 Yangi' },
                { id: 'Tayyorlanmoqda', label: '🟡 Tayyorlanmoqda' },
                { id: 'Yetkazildi', label: '🟢 Yetkazildi' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOrderFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === f.id
                      ? 'bg-wedrink-dark text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4 relative flex flex-col justify-between"
                  >
                    
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-fredoka text-lg font-bold text-wedrink-teal">
                            {order.id}
                          </span>
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                              order.orderType === 'delivery'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {order.orderType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {new Date(order.createdAt).toLocaleString('uz-UZ')}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                          order.status === 'Yangi'
                            ? 'bg-pink-100 border-pink-300 text-wedrink-pink'
                            : order.status === 'Tayyorlanmoqda'
                            ? 'bg-amber-100 border-amber-300 text-amber-700'
                            : 'bg-emerald-100 border-emerald-300 text-emerald-700'
                        }`}
                      >
                        <option value="Yangi">🔴 Yangi</option>
                        <option value="Tayyorlanmoqda">🟡 Tayyorlanmoqda</option>
                        <option value="Yetkazildi">🟢 Yetkazildi</option>
                      </select>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 p-3 rounded-2xl space-y-1 text-xs font-medium">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mijoz:</span>
                        <strong className="text-wedrink-dark">{order.customerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Telefon:</span>
                        <a href={`tel:${order.customerPhone}`} className="font-bold text-wedrink-teal hover:underline">
                          {order.customerPhone}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Manzil/Filial:</span>
                        <span className="text-gray-800 font-bold truncate max-w-[200px]">{order.address}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-400 block uppercase">Buyurtma tarkibi:</span>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs bg-wedrink-teal-ultra p-2.5 rounded-xl space-y-0.5">
                            <div className="flex justify-between font-bold text-wedrink-dark">
                              <span>{item.productName || item.product?.name} (x{item.quantity})</span>
                              <span>{formatPrice(item.totalPrice)}</span>
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Hajmi: {item.size?.name || item.size} {item.sugar && `• Shakar: ${item.sugar}`} {item.ice && `• Muz: ${item.ice}`}
                            </div>
                            {item.toppings && item.toppings.length > 0 && (
                              <div className="text-[11px] text-wedrink-teal font-semibold">
                                + {item.toppings.map((t) => typeof t === 'string' ? t : t.name).join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Total */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Jami To'lov:</span>
                      <span className="font-fredoka text-xl font-extrabold text-wedrink-teal">
                        {formatPrice(order.grandTotal)}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <div className="text-5xl mb-3">📦</div>
                <h3 className="font-fredoka text-xl font-bold text-gray-800">
                  Hozircha ushbu bo'limda buyurtma yo'q
                </h3>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-wedrink-teal-ultra mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    {prod.badge && (
                      <span className="absolute top-3 left-3 bg-wedrink-pink text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        {prod.badge}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="absolute top-3 right-3 bg-white/90 text-wedrink-pink hover:bg-wedrink-pink hover:text-white p-2 rounded-full shadow-md transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-fredoka text-lg font-bold text-wedrink-dark">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-medium">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase">Narx</span>
                      <span className="font-fredoka text-lg font-extrabold text-wedrink-teal">
                        {formatPrice(prod.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <button
                      onClick={() => handleDeleteGallery(item.id)}
                      className="absolute top-3 right-3 bg-white/90 text-wedrink-pink hover:bg-wedrink-pink hover:text-white p-2 rounded-full shadow-md transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-fredoka text-base font-bold text-wedrink-dark line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-wedrink-pink font-bold">
                        <Heart className="w-3.5 h-3.5 fill-wedrink-pink" />
                        {item.likes} ta yoqdi
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">ID: #{item.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative my-8">
            
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-wedrink-pink p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wedrink-pink-light text-wedrink-pink flex items-center justify-center font-bold text-lg">
                ✨
              </div>
              <div>
                <h3 className="font-fredoka text-2xl font-bold text-wedrink-dark">
                  Yangi Mahsulot Qo'shish
                </h3>
                <p className="text-xs text-gray-500">Menyuga yangi ichimlik yoki muzqaymoq kiriting</p>
              </div>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-bold text-gray-700">
              
              <div className="space-y-1">
                <label>Mahsulot Nomi: *</label>
                <input
                  type="text"
                  placeholder="Masalan: Qulupnayli Boba Shake"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Kategoriya:</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none bg-white font-medium"
                  >
                    <option value="icecream">🍦 Muzqaymoqlar</option>
                    <option value="boba">🧋 Bubble Tea</option>
                    <option value="fruit">🍹 Mevali Ichimliklar</option>
                    <option value="coffee">☕ Matcha & Qahva</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label>Narxi (UZS): *</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-bold"
                  />
                </div>
              </div>

              {/* IMAGE SELECTION */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <label className="flex items-center gap-1.5 text-wedrink-teal">
                  <ImageIcon className="w-4 h-4" />
                  <span>Mahsulot Rasmini Yuklash Usuli:</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setImageUploadType('preset')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all ${
                      imageUploadType === 'preset'
                        ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    🖼️ Tayyor Shablon
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType('file')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      imageUploadType === 'file'
                        ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Fayl Yuklash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType('url')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      imageUploadType === 'url'
                        ? 'border-wedrink-teal bg-wedrink-teal-ultra text-wedrink-teal'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Link Havola</span>
                  </button>
                </div>

                {imageUploadType === 'preset' && (
                  <select
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none bg-white font-medium"
                  >
                    {PRESET_IMAGES.map((img) => (
                      <option key={img.value} value={img.value}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                )}

                {imageUploadType === 'file' && (
                  <div className="space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setNewProduct, newProduct)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-wedrink-teal-light file:text-wedrink-teal cursor-pointer"
                    />
                  </div>
                )}

                {imageUploadType === 'url' && (
                  <input
                    type="url"
                    placeholder="https://example.com/rasm.jpg"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                  />
                )}

                {newProduct.image && (
                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                    />
                    <div className="text-[11px] text-gray-500 truncate flex-grow">
                      <span className="font-bold text-gray-700 block">Rasm Ko'rinishi:</span>
                      <span className="truncate block font-mono text-[10px]">{newProduct.image}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label>Nishon (Badge):</label>
                <input
                  type="text"
                  placeholder="YANGI! / BESTSELLER"
                  value={newProduct.badge}
                  onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label>Tavsif (Description):</label>
                <textarea
                  rows={2}
                  placeholder="Mahsulot haqida qisqacha ma'lumot..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-wedrink-teal text-white font-fredoka font-bold shadow-cute hover:bg-wedrink-teal-dark"
                >
                  Saqlash va Qo'shish
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Add Gallery Photo Modal */}
      {isAddGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative my-8">
            
            <button
              onClick={() => setIsAddGalleryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-wedrink-pink p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                📸
              </div>
              <div>
                <h3 className="font-fredoka text-2xl font-bold text-wedrink-dark">
                  Yangi Fotolavha Qo'shish
                </h3>
                <p className="text-xs text-gray-500">Galereyaga yangi foto surat joylashtiring</p>
              </div>
            </div>

            <form onSubmit={handleAddGallery} className="space-y-4 text-xs font-bold text-gray-700">
              
              <div className="space-y-1">
                <label>Fotolavha Sarlavhasi: *</label>
                <input
                  type="text"
                  placeholder="Masalan: Termiz Filialimizda Quvnoq Lahzalar"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Hashtag Tag:</label>
                  <input
                    type="text"
                    placeholder="#wedrink_termiz"
                    value={newGallery.tag}
                    onChange={(e) => setNewGallery({ ...newGallery, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label>Initial Likes Count:</label>
                  <input
                    type="number"
                    value={newGallery.likes}
                    onChange={(e) => setNewGallery({ ...newGallery, likes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-wedrink-teal outline-none font-bold"
                  />
                </div>
              </div>

              {/* IMAGE SELECTION TYPE */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <label className="flex items-center gap-1.5 text-purple-600">
                  <ImageIcon className="w-4 h-4" />
                  <span>Rasm Yuklash Usuli:</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGalleryUploadType('file')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      galleryUploadType === 'file'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Fayl Yuklash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryUploadType('url')}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      galleryUploadType === 'url'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Link Havola</span>
                  </button>
                </div>

                {galleryUploadType === 'file' && (
                  <div className="space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setNewGallery, newGallery)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 cursor-pointer"
                    />
                  </div>
                )}

                {galleryUploadType === 'url' && (
                  <input
                    type="url"
                    placeholder="https://example.com/foto.jpg"
                    value={newGallery.image}
                    onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 outline-none font-medium"
                  />
                )}

                {newGallery.image && (
                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
                    <img
                      src={newGallery.image}
                      alt="Preview"
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                    />
                    <div className="text-[11px] text-gray-500 truncate flex-grow">
                      <span className="font-bold text-gray-700 block">Foto Ko'rinishi:</span>
                      <span className="truncate block font-mono text-[10px]">{newGallery.image}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddGalleryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-fredoka font-bold shadow-md hover:bg-purple-700"
                >
                  Saqlash va Qo'shish
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
