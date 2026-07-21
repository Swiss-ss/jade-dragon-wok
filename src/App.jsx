import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/Menu';
import Gallery from './pages/Gallery';
import LocationPage from './pages/Location';
import Contact from './pages/Contact';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // WhatsApp Cart State
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Student Order Form Info
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    location: '',
    payment: 'UPI (GPay/PhonePe)'
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

    const header = `*JADE DRAGON WOK — ORDER CONFIRMATION*`;
    const details = `*Name:* ${studentInfo.name}\n*Delivery Area:* ${studentInfo.location}\n*Payment Mode:* ${studentInfo.payment}\n`;
    
    let itemsList = `*Items Ordered:*\n`;
    cart.forEach((item) => {
      itemsList += `• ${item.qty}x ${item.name} (${item.price} each) - ₹${item.numericPrice * item.qty}\n`;
    });

    const footer = `*Total Bill:* ₹${cartTotal}\n\n_Please confirm prep and delivery time._`;
    const fullMessage = `${header}\n\n${details}\n${itemsList}\n${footer}`;
    
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/917017654643?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
          className="font-serif text-sm sm:text-base tracking-[0.2em] font-semibold text-zinc-50 hover:text-cinnabar transition-colors uppercase truncate max-w-[65%]"
        >
          JADE DRAGON WOK
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

        {/* Circular Premium Hamburger Button (Visible on Mobile Only - Absolute Topmost click target) */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-cinnabar hover:border-cinnabar transition-all shadow-md focus:outline-none cursor-pointer z-[999] relative"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
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

              {/* Drawer Footer Contact */}
              <div className="border-t border-zinc-900 pt-4 text-center">
                <span className="text-[8px] tracking-[0.25em] text-zinc-600 block uppercase mb-1">UPES BIDHOLI</span>
                <p className="text-[9px] text-zinc-500 font-sans leading-relaxed">
                  +91 92196 03033<br />
                  +91 92589 83691
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. GLOBAL FLOATING ACTION BUTTON (FAB) */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-auto">
        <Link to="/contact">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#E34234] text-white font-serif tracking-widest text-[10px] sm:text-xs uppercase px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(227,66,52,0.4)] border border-cinnabar/20 hover:bg-[#cf3527] transition-all whitespace-nowrap"
          >
            Book a Table
          </motion.button>
        </Link>
      </div>

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
