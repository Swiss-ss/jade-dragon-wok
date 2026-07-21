import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Calendar, Clock, Users, Check, Sparkles, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Home({ scrollToSection, activeSection, onSectionChange, sectionRefs }) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [booking, setBooking] = useState({
    date: 'Tonight',
    time: '7:30 PM',
    guests: '2 Guests'
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => setBookingConfirmed(false), 4000);
  };

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    if (clientHeight === 0) return;
    const index = Math.round(scrollTop / clientHeight);
    if (index >= 0 && index < 5 && index !== activeSection) {
      onSectionChange(index);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      
      {/* SUCCESS RESERVATION TOAST */}
      <AnimatePresence>
        {bookingConfirmed && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-zinc-900/95 border-2 border-cinnabar/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-cinnabar/10 border border-cinnabar/30 flex items-center justify-center text-cinnabar flex-shrink-0">
              <Check size={20} />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Reservation Saved</h4>
              <p className="text-xs text-zinc-400 font-sans mt-1">
                Your table for {booking.guests} on {booking.date} at {booking.time} is requested. See you soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SNAPPING CONTAINER (5 h-screen sections) */}
      <main 
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        
        {/* ===================== SCENE 1: THE HOOK ===================== */}
        <section 
          ref={sectionRefs[0]} 
          className="h-screen w-full snap-start relative flex flex-col justify-center items-center text-center px-4 bg-zinc-950"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/65 bg-gradient-to-t from-zinc-950 via-transparent to-black/75" />

          <div className="relative z-10 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-cinnabar font-serif tracking-[0.35em] text-xs sm:text-sm uppercase block mb-4"
            >
              AUTHENTIC ASIAN CAFE IN BIDHOLI
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-tight uppercase"
            >
              Jade Dragon Wok<br />
              <span className="italic font-normal text-zinc-300 normal-case">Fiery Wok, Local Soul.</span>
            </motion.h1>
          </div>

          <div className="absolute bottom-28 z-10 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-sans mb-1">Scroll to Explore</span>
            <motion.button 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              onClick={() => scrollToSection(1)}
              className="text-zinc-400 hover:text-cinnabar transition-colors"
              aria-label="Scroll Down"
            >
              <ChevronDown size={20} />
            </motion.button>
          </div>
        </section>

        {/* ===================== SCENE 2: THE CRAFT ===================== */}
        <section 
          ref={sectionRefs[1]} 
          className="h-screen w-full snap-start relative flex flex-col lg:flex-row bg-zinc-950"
        >
          <div className="h-[35vh] lg:h-full lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/40 lg:bg-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent lg:hidden" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent hidden lg:block" />
          </div>

          <div className="h-[65vh] lg:h-full lg:w-1/2 flex flex-col justify-center items-start px-8 sm:px-16 lg:px-20 pb-20 lg:pb-0 relative bg-zinc-950">
            <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block mb-3">THE CRAFT</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
              Obsessive<br />Preparation.
            </h2>
            <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed max-w-md mb-6">
              Every batch of noodles is hand-pulled, tossed in fiery woks under signature red lanterns, and served fresh. Learn more about our philosophy and heritage.
            </p>
            <Link 
              to="/about"
              className="text-white hover:text-cinnabar font-serif tracking-widest text-xs uppercase flex items-center gap-2 border-b border-white hover:border-cinnabar pb-1 transition-colors"
            >
              Read About Us <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ===================== SCENE 3: THE FEAST ===================== */}
        <section 
          ref={sectionRefs[2]} 
          className="h-screen w-full snap-start relative bg-zinc-950 flex flex-col justify-center px-6 sm:px-12 md:px-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block mb-3">THE OFFERINGS</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
                  Explore the Menu
                </h2>
              </div>
              <Link 
                to="/menu" 
                className="text-white hover:text-cinnabar font-serif tracking-widest text-xs uppercase flex items-center gap-2 border-b border-white hover:border-cinnabar pb-1 transition-colors hidden sm:flex"
              >
                View Full Menu <ArrowRight size={14} />
              </Link>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div className="flex gap-6 overflow-x-auto snap-x no-scrollbar pb-8 w-full scroll-smooth">
              
              <div className="min-w-[280px] sm:min-w-[320px] bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between h-[340px] snap-center">
                <div className="h-40 w-full rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80" alt="Chili Garlic Noodles" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#E34234] text-white text-[9px] font-sans tracking-widest uppercase font-semibold px-2 py-0.5 rounded">Spicy</span>
                </div>
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">Chili Garlic Noodles</h4>
                    <p className="text-xs text-zinc-400 font-sans mt-1">Sautéed flat wheat noodles with bird's eye chili, sweet basil.</p>
                  </div>
                  <span className="font-serif text-base font-semibold text-zinc-300 mt-2">₹240</span>
                </div>
              </div>

              <div className="min-w-[280px] sm:min-w-[320px] bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between h-[340px] snap-center">
                <div className="h-40 w-full rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80" alt="Dragon Dumplings" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-[9px] font-sans tracking-widest uppercase font-semibold px-2 py-0.5 rounded">Signature</span>
                </div>
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">Dragon Dumplings</h4>
                    <p className="text-xs text-zinc-400 font-sans mt-1">Steamed parcels loaded with chicken, bathed in chili-oil.</p>
                  </div>
                  <span className="font-serif text-base font-semibold text-zinc-300 mt-2">₹180</span>
                </div>
              </div>

              <div className="min-w-[280px] sm:min-w-[320px] bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between h-[340px] snap-center">
                <div className="h-40 w-full rounded-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80" alt="Kung Pao Chicken" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#E34234] text-white text-[9px] font-sans tracking-widest uppercase font-semibold px-2 py-0.5 rounded">Spicy</span>
                </div>
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">Kung Pao Chicken</h4>
                    <p className="text-xs text-zinc-400 font-sans mt-1">Wok-fired chicken cubes tossed with dry red chilis and cashews.</p>
                  </div>
                  <span className="font-serif text-base font-semibold text-zinc-300 mt-2">₹280</span>
                </div>
              </div>

            </div>

            <div className="mt-4 sm:hidden">
              <Link 
                to="/menu" 
                className="text-white hover:text-cinnabar font-serif tracking-widest text-xs uppercase flex items-center gap-2 border-b border-white hover:border-cinnabar pb-1 transition-colors"
              >
                View Full Menu <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== SCENE 4: THE SPACE ===================== */}
        <section 
          ref={sectionRefs[3]} 
          className="h-screen w-full snap-start relative flex flex-col justify-center md:justify-end p-8 sm:p-16 lg:p-24 bg-zinc-950 pb-28 md:pb-24"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

          <div className="relative z-10 max-w-xl mb-0 md:mb-14">
            <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block mb-3">THE ATMOSPHERE</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider mb-4 leading-tight">
              Step into the<br />atmosphere.
            </h2>
            <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Moody low-lighting, sizzle of wok fires, and industrial wooden counters capture the essence of Asian night markets in Bidholi.
            </p>
            <Link 
              to="/location" 
              className="text-white hover:text-cinnabar font-serif tracking-widest text-xs uppercase flex items-center gap-2 border-b border-white hover:border-cinnabar pb-1 transition-colors"
            >
              View Location & Map <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ===================== SCENE 5: THE INVITE ===================== */}
        <section 
          ref={sectionRefs[4]} 
          className="h-screen w-full snap-start relative flex flex-col justify-center items-center bg-zinc-950 px-6"
        >
          <div className="w-full max-w-md bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-cinnabar" />
            
            <div className="text-center mb-6">
              <span className="text-cinnabar font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase block mb-2">RESERVE A SEAT</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">The Invite</h2>
              <p className="text-xs text-zinc-400 font-sans mt-2">Secure your spot in the heart of Jade Dragon Wok dining lounge.</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Calendar size={11} className="text-cinnabar" /> Date
                </label>
                <div className="relative">
                  <select 
                    value={booking.date} 
                    onChange={(e) => setBooking({...booking, date: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                  >
                    <option value="Tonight">Tonight</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Friday, Jul 24">Friday, Jul 24</option>
                    <option value="Saturday, Jul 25">Saturday, Jul 25</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Clock size={11} className="text-cinnabar" /> Time Slot
                </label>
                <div className="relative">
                  <select 
                    value={booking.time} 
                    onChange={(e) => setBooking({...booking, time: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                  >
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:30 PM">10:30 PM</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Users size={11} className="text-cinnabar" /> Party Size
                </label>
                <div className="relative">
                  <select 
                    value={booking.guests} 
                    onChange={(e) => setBooking({...booking, guests: e.target.value})}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#E34234] text-white font-serif tracking-widest text-xs uppercase py-3.5 rounded-xl shadow-lg hover:bg-[#cf3527] transition-all mt-4"
              >
                Confirm Reservation
              </motion.button>
            </form>
            
            <div className="mt-6 text-center">
              <Link 
                to="/contact" 
                className="text-zinc-400 hover:text-cinnabar text-xs tracking-wider border-b border-zinc-800 hover:border-cinnabar pb-0.5 transition-colors"
              >
                Need to submit custom inquiries? Contact Us
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-16 text-center text-zinc-500 font-sans text-xs tracking-widest uppercase flex items-center gap-1">
            <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Bidholi
          </div>
        </section>

      </main>

    </div>
  );
}
