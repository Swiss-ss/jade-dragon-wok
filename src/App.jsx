import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Plus, Minus, Trash2, Instagram, Facebook, MessageCircle, Download, FileText } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/Menu';
import Gallery from './pages/Gallery';
import LocationPage from './pages/Location';
import Contact from './pages/Contact';
import logoImg from './assets/logo.png';
import { jsPDF } from 'jspdf';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // WhatsApp Cart State
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Receipt Popup State
  const [receiptPopup, setReceiptPopup] = useState(false);
  const [lastOrderData, setLastOrderData] = useState(null);
  
  // Student Order Form Info
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    location: '',
    payment: 'UPI (GPay/PhonePe)',
    notes: ''
  });

  // Section Refs for snapping / scroll tracking (used only on Home page)
  const s0 = useRef(null);
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);
  const s4 = useRef(null);
  
  const sectionRefs = [s0, s1, s2, s3, s4];

  // No longer need IntersectionObserver! Custom scroll handler in Home.jsx does this now.

  const scrollToSection = (index) => {
    if (isHomePage) {
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  // Cart Operations
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.name === item.name);
      if (existing) {
        return prevCart.map((i) => 
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      const numericPrice = parseInt(item.price.replace(/[^\d]/g, ''), 10);
      return [...prevCart, { ...item, qty: 1, numericPrice }];
    });
  };

  const updateQty = (name, amount) => {
    setCart((prevCart) => {
      return prevCart.map((i) => {
        if (i.name === name) {
          const newQty = i.qty + amount;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((i) => i.name !== name));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.numericPrice * item.qty), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = 'JDW-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const formattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const header = `⛩️ *JADE DRAGON WOK CAFE — NEW ORDER*\n──────────────────────────────`;
    const orderMeta = `🆔 *Order Ref:* #${orderId}\n📅 *Time:* ${formattedDate}, ${formattedTime}`;

    const customerDetails = `👤 *CUSTOMER DETAILS*\n• *Name:* ${studentInfo.name.trim()}\n• *Delivery Location:* ${studentInfo.location.trim()}\n• *Payment Method:* ${studentInfo.payment}`;

    let itemsList = `📋 *ORDER SUMMARY*\n`;
    cart.forEach((item) => {
      itemsList += `• ${item.qty}x ${item.name} — ₹${item.numericPrice * item.qty}\n`;
    });

    const totalBlock = `──────────────────────────────\n💰 *TOTAL BILL:* *₹${cartTotal}*\n──────────────────────────────`;

    const notesBlock = studentInfo.notes?.trim() 
      ? `📝 *Special Instructions:*\n_"${studentInfo.notes.trim()}"_` 
      : null;

    const footer = `🚀 *Sent via Jade Dragon Wok Online Store*\n_Please reply to confirm order acceptance & estimated preparation time._`;

    const fullMessage = [header, orderMeta, customerDetails, itemsList, totalBlock, notesBlock, footer]
      .filter(Boolean)
      .join('\n\n');

    const encodedMessage = encodeURIComponent(fullMessage);
    // WhatsApp destination number set to +91 92196 03033
    const whatsappUrl = `https://wa.me/919219603033?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Save order data for receipt PDF
    setLastOrderData({
      orderId,
      date: formattedDate,
      time: formattedTime,
      name: studentInfo.name.trim(),
      location: studentInfo.location.trim(),
      payment: studentInfo.payment,
      notes: studentInfo.notes?.trim() || '',
      items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.numericPrice })),
      total: cartTotal
    });

    // Close cart drawer and show receipt popup
    setCartOpen(false);
    setReceiptPopup(true);

    // Clear cart after order
    setCart([]);
    setStudentInfo({ name: '', location: '', payment: 'UPI (GPay/PhonePe)', notes: '' });
  };

  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans h-screen w-full relative overflow-hidden select-none font-sans">
      
      {/* 1. RESPONSIVE GLOBAL FLOATING NAVIGATION */}
      <header 
        className={`fixed z-[100] flex justify-between items-center transition-all duration-300 ${
          (isHomePage && activeSection === 0 && !menuOpen)
            ? 'top-0 left-0 w-full p-5 bg-gradient-to-b from-black/95 to-transparent' 
            : 'top-3 left-3 right-3 p-3 px-5 rounded-2xl bg-zinc-950/85 border border-zinc-900 backdrop-blur-md shadow-xl shadow-black/40'
        }`}
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <Link 
          to="/"
          onClick={() => { if (isHomePage) scrollToSection(0); }}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity max-w-[60%] select-none cursor-pointer"
        >
          <img src={logoImg} alt="Jade Dragon Wok Logo" className="h-8 w-8 sm:h-9 sm:w-9 object-contain" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-semibold text-zinc-50 uppercase truncate">
            JADE DRAGON
          </span>
        </Link>

        {/* Horizontal Menu Bar (Visible on Desktop Only) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] tracking-[0.2em] font-serif uppercase">
          <Link 
            to="/" 
            onClick={() => { if (isHomePage) scrollToSection(0); }} 
            className={`hover:text-cinnabar transition-colors ${
              isHomePage && activeSection === 0 ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`hover:text-cinnabar transition-colors ${
              location.pathname === '/about' ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/menu" 
            className={`hover:text-cinnabar transition-colors ${
              location.pathname === '/menu' ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            Our Menu
          </Link>
          <Link 
            to="/gallery" 
            className={`hover:text-cinnabar transition-colors ${
              location.pathname === '/gallery' ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            Gallery
          </Link>
          <Link 
            to="/location" 
            className={`hover:text-cinnabar transition-colors ${
              location.pathname === '/location' ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            Location
          </Link>
          <Link 
            to="/contact" 
            className={`hover:text-cinnabar transition-colors ${
              location.pathname === '/contact' ? 'text-cinnabar font-bold' : 'text-zinc-400'
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Direct "Order" shortcut in header for quick student ordering (Mobile only) */}
          {location.pathname !== '/menu' && (
            <Link to="/menu" className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E34234] text-white font-serif tracking-widest text-[9px] sm:text-[10px] uppercase px-3.5 sm:px-4 py-2 rounded-full shadow-lg shadow-cinnabar/20 font-bold border border-cinnabar/10"
              >
                Order
              </motion.button>
            </Link>
          )}

          {/* Circular Premium Hamburger Button (Visible on Mobile Only - Absolute Topmost click target) */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-cinnabar hover:border-cinnabar transition-all shadow-md focus:outline-none cursor-pointer z-[999] relative"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* 2. FLOATING DRAWER MENU (Mobile Only Inset Panel) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop dark blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[110] md:hidden backdrop-blur-xs"
            />
            
            {/* Floating Right Inset Drawer Card */}
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-4 right-4 bottom-4 w-[75%] max-w-[280px] bg-zinc-950/98 border border-zinc-900 rounded-3xl z-[120] p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl md:hidden overflow-y-auto font-sans"
            >
              {/* Close Button / Header in drawer */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="font-serif text-[10px] tracking-[0.2em] uppercase font-bold text-cinnabar">NAVIGATION</span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-cinnabar transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </div>

              {/* Vertical Nav links */}
              <nav className="flex flex-col gap-6 py-6 my-auto text-left pl-2">
                <Link
                  to="/"
                  onClick={() => { scrollToSection(0); setMenuOpen(false); }}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    isHomePage && activeSection === 0 ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    location.pathname === '/about' ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/menu"
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    location.pathname === '/menu' ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  Our Menu
                </Link>
                <Link
                  to="/gallery"
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    location.pathname === '/gallery' ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  Gallery
                </Link>
                <Link
                  to="/location"
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    location.pathname === '/location' ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  Location
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-lg tracking-widest hover:text-cinnabar transition-colors uppercase ${
                    location.pathname === '/contact' ? 'text-cinnabar font-bold' : 'text-zinc-400'
                  }`}
                >
                  Contact
                </Link>
              </nav>

              <div className="pb-4">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 hover:border-cinnabar/30 text-white font-serif tracking-wider text-[10px] uppercase py-2.5 rounded-xl transition-all font-bold cursor-pointer">
                    Book a Table
                  </button>
                </Link>
              </div>

              {/* Drawer Footer Contact */}
              <div className="border-t border-zinc-900 pt-4 text-center flex flex-col gap-3">
                <div>
                  <span className="text-[8px] tracking-[0.25em] text-zinc-600 block uppercase mb-1">UPES BIDHOLI</span>
                  <p className="text-[9px] text-zinc-500 font-sans leading-relaxed">
                    +91 92196 03033<br />
                    +91 92589 83691
                  </p>
                </div>
                
                {/* Social media links row in drawer */}
                <div className="flex justify-center items-center gap-4 text-zinc-500 pt-1">
                  <a 
                    href="https://www.instagram.com/jadedragonwok/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cinnabar transition-colors cursor-pointer" 
                    aria-label="Instagram"
                  >
                    <Instagram size={14} />
                  </a>
                  <a 
                    href="https://facebook.com/jadedragonwok" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cinnabar transition-colors cursor-pointer" 
                    aria-label="Facebook"
                  >
                    <Facebook size={14} />
                  </a>
                  <a 
                    href="https://wa.me/919219603033" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cinnabar transition-colors cursor-pointer" 
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FLOATING CART BUTTON TRIGGER */}
      {cartItemCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-[90] bg-[#E34234] hover:bg-[#cf3527] text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(227,66,52,0.4)] flex items-center justify-center border border-cinnabar/30 transition-all cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <ShoppingBag size={22} />
            <span className="absolute -top-3 -right-3 bg-white text-cinnabar text-[10px] font-bold rounded-full w-5.5 h-5.5 flex items-center justify-center border border-cinnabar/10 shadow-md font-sans">
              {cartItemCount}
            </span>
          </div>
        </motion.button>
      )}

      {/* CART DRAWER SLIDE OUT */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between p-5 sm:p-6 z-[1010] shadow-2xl overflow-y-auto font-sans"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                  <h3 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <ShoppingBag size={18} className="text-cinnabar" /> Your Tray ({cartItemCount})
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="text-zinc-400 hover:text-cinnabar p-1 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3.5 py-5 max-h-[42vh] overflow-y-auto no-scrollbar">
                  {cart.map((item) => (
                    <div key={item.name} className="flex justify-between items-center gap-3 bg-zinc-950/40 border border-zinc-850 p-3 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-white uppercase truncate">{item.name}</h4>
                        <p className="text-[11px] text-zinc-500 font-sans mt-0.5">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQty(item.name, -1)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5.5 h-5.5 rounded flex items-center justify-center transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-sans font-bold text-xs text-white min-w-3 text-center font-sans">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.name, 1)}
                          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-5.5 h-5.5 rounded flex items-center justify-center transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="text-zinc-750 hover:text-cinnabar p-1 transition-colors ml-0.5"
                          aria-label="Remove Item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 bg-zinc-900">
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                  <span className="font-serif text-xs uppercase tracking-wider text-zinc-400">Total Bill:</span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-white">₹{cartTotal}</span>
                </div>

                <form onSubmit={handleWhatsAppOrder} className="space-y-3.5 mb-1">
                  <span className="text-cinnabar font-serif tracking-[0.2em] text-[8px] sm:text-[9px] uppercase block mb-1">STUDENT DELIVERY DETAILS</span>
                  
                  {/* Student Name */}
                  <div className="space-y-1">
                    <label className="text-[8px] sm:text-[9px] tracking-wider uppercase text-zinc-400">Student Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rohan Sharma"
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cinnabar/80"
                    />
                  </div>

                  {/* Campus / Hostel Block */}
                  <div className="space-y-1">
                    <label className="text-[8px] sm:text-[9px] tracking-wider uppercase text-zinc-400">UPES Hostel / Delivery Location</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Bidholi Campus, Block C Hostel, Room 204"
                      value={studentInfo.location}
                      onChange={(e) => setStudentInfo({ ...studentInfo, location: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cinnabar/80"
                    />
                  </div>

                  {/* Payment Mode */}
                  <div className="space-y-1">
                    <label className="text-[8px] sm:text-[9px] tracking-wider uppercase text-zinc-400">Payment Method</label>
                    <select
                      value={studentInfo.payment}
                      onChange={(e) => setStudentInfo({ ...studentInfo, payment: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cinnabar/80 appearance-none"
                    >
                      <option value="UPI (GPay/PhonePe)">UPI (GPay/PhonePe/Paytm)</option>
                      <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                    </select>
                  </div>

                  {/* Cooking Instructions / Special Note (Optional) */}
                  <div className="space-y-1">
                    <label className="text-[8px] sm:text-[9px] tracking-wider uppercase text-zinc-400">Special Instructions (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Less spicy, extra sauce, etc."
                      value={studentInfo.notes}
                      onChange={(e) => setStudentInfo({ ...studentInfo, notes: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cinnabar/80"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-serif tracking-widest text-[10px] sm:text-xs uppercase py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 border border-emerald-500/20 transition-all mt-4 cursor-pointer"
                  >
                    Send Order via WhatsApp
                  </motion.button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECEIPT DOWNLOAD POPUP */}
      <AnimatePresence>
        {receiptPopup && lastOrderData && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setReceiptPopup(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-[2010] font-sans"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#25D366] rounded-t-3xl" />
              
              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mx-auto mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">Order Sent!</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Your order <span className="text-white font-bold">#{lastOrderData.orderId}</span> has been sent to Jade Dragon Wok via WhatsApp. Download your receipt for your records.
                </p>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 mb-5 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>Order Ref</span>
                  <span className="text-white font-bold">#{lastOrderData.orderId}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Items</span>
                  <span className="text-white">{lastOrderData.items.reduce((a, i) => a + i.qty, 0)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 border-t border-zinc-800 pt-1.5">
                  <span className="font-bold">Total</span>
                  <span className="text-white font-bold text-sm">₹{lastOrderData.total}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
                    const d = lastOrderData;
                    let y = 20;

                    // Header
                    doc.setFontSize(18);
                    doc.setFont('helvetica', 'bold');
                    doc.text('JADE DRAGON WOK CAFE', 105, y, { align: 'center' });
                    y += 7;
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.text('Bidholi Rd, Near UPES Campus, Dehradun, Uttarakhand 248007', 105, y, { align: 'center' });
                    y += 5;
                    doc.text('Phone: +91 92196 03033 | +91 92589 83691', 105, y, { align: 'center' });
                    y += 8;

                    // Divider
                    doc.setDrawColor(200);
                    doc.line(20, y, 190, y);
                    y += 8;

                    // Order meta
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text('ORDER RECEIPT', 105, y, { align: 'center' });
                    y += 8;
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`Order Ref: #${d.orderId}`, 20, y);
                    doc.text(`Date: ${d.date}, ${d.time}`, 190, y, { align: 'right' });
                    y += 6;
                    doc.text(`Customer: ${d.name}`, 20, y);
                    y += 5;
                    doc.text(`Delivery: ${d.location}`, 20, y);
                    y += 5;
                    doc.text(`Payment: ${d.payment}`, 20, y);
                    y += 8;

                    // Divider
                    doc.line(20, y, 190, y);
                    y += 6;

                    // Items header
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(9);
                    doc.text('ITEM', 20, y);
                    doc.text('QTY', 120, y, { align: 'center' });
                    doc.text('PRICE', 155, y, { align: 'center' });
                    doc.text('TOTAL', 190, y, { align: 'right' });
                    y += 3;
                    doc.line(20, y, 190, y);
                    y += 5;

                    // Items
                    doc.setFont('helvetica', 'normal');
                    d.items.forEach((item) => {
                      const itemName = item.name.length > 35 ? item.name.substring(0, 35) + '...' : item.name;
                      doc.text(itemName, 20, y);
                      doc.text(String(item.qty), 120, y, { align: 'center' });
                      doc.text(`\u20b9${item.price}`, 155, y, { align: 'center' });
                      doc.text(`\u20b9${item.price * item.qty}`, 190, y, { align: 'right' });
                      y += 6;
                    });

                    y += 2;
                    doc.line(20, y, 190, y);
                    y += 7;

                    // Total
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.text('TOTAL BILL:', 20, y);
                    doc.text(`\u20b9${d.total}`, 190, y, { align: 'right' });
                    y += 10;

                    // Special instructions
                    if (d.notes) {
                      doc.setFontSize(9);
                      doc.setFont('helvetica', 'italic');
                      doc.text(`Special Instructions: "${d.notes}"`, 20, y);
                      y += 8;
                    }

                    // Footer
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(130);
                    doc.text('Thank you for ordering from Jade Dragon Wok!', 105, y + 5, { align: 'center' });
                    doc.text('This receipt was generated automatically. For queries, call +91 92196 03033.', 105, y + 10, { align: 'center' });

                    doc.save(`JDW-Receipt-${d.orderId}.pdf`);
                  }}
                  className="w-full bg-[#E34234] hover:bg-[#cf3527] text-white font-serif tracking-widest text-[10px] sm:text-xs uppercase py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 border border-cinnabar/20 transition-all cursor-pointer"
                >
                  <Download size={14} /> Download Receipt (PDF)
                </motion.button>
                <button
                  onClick={() => setReceiptPopup(false)}
                  className="w-full text-zinc-400 hover:text-white font-serif tracking-widest text-[10px] uppercase py-2 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. VERTICAL PROGRESS DOTS (Shown only on Home slider) */}
      {isHomePage && (
        <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          {[0, 1, 2, 3, 4].map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => scrollToSection(dotIndex)}
              className="group relative p-2 focus:outline-none"
              aria-label={`Go to section ${dotIndex + 1}`}
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSection === dotIndex 
                    ? 'bg-[#E34234] scale-125 shadow-[0_0_10px_#E34234]' 
                    : 'bg-zinc-600 group-hover:bg-zinc-400'
                }`}
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 text-[9px] tracking-wider uppercase text-zinc-300 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {['Intro', 'About', 'Menu', 'Ambiance', 'Reserve'][dotIndex]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ROUTE DEFINITIONS */}
      <div className={`h-full w-full ${isHomePage ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <Home 
                  scrollToSection={scrollToSection} 
                  activeSection={activeSection} 
                  onSectionChange={setActiveSection}
                  sectionRefs={sectionRefs} 
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route 
              path="/menu" 
              element={
                <MenuPage 
                  cart={cart}
                  addToCart={addToCart}
                  updateQty={updateQty}
                />
              } 
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
