import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Sparkles, Navigation } from 'lucide-react';

export default function Location() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-50 pt-20 lg:pt-28 pb-16 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col gap-10"
    >
      {/* Back Button */}
      <div>
        <Link 
          to="/" 
          className="text-zinc-400 hover:text-cinnabar font-serif tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2 transition-colors border-b border-transparent hover:border-cinnabar pb-1 w-max"
        >
          <ArrowLeft size={12} /> Back to Storyboard
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <span className="text-cinnabar font-serif tracking-[0.3em] text-[10px] sm:text-xs uppercase block">VISIT OUR LOUNGE</span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wider">Our Location</h1>
      </div>

      {/* Main Info Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        
        {/* Location Info Card */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-8 bg-zinc-900/30 border border-zinc-800/80 p-6 sm:p-8 rounded-3xl h-full font-sans">
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">Bidholi Lounge</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              We are situated right next to the University of Petroleum and Energy Studies (UPES) in Bidholi, serving as the go-to spot for student cravings and fresh Asian cuisine in Dehradun.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-cinnabar mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[9px] text-zinc-500">Address</p>
                <p className="text-zinc-400 mt-1 text-xs leading-relaxed">
                  Jade Dragon Wok, Bidholi Rd, Near Sagar Fitness Gym (Near UPES Campus), Kandholi, Pondha, Dehradun, Uttarakhand 248007
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={16} className="text-cinnabar mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[9px] text-zinc-500">Working Hours</p>
                <p className="text-zinc-400 mt-1 text-xs">Open Daily: 11:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className="text-cinnabar mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[9px] text-zinc-500">Lounge Contact</p>
                <p className="text-zinc-400 mt-1 text-xs">
                  +91 92196 03033<br />
                  +91 92589 83691
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <a 
              href="https://maps.app.goo.gl/tBkrnB8yW6u2cdcc9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-zinc-850 hover:bg-zinc-800 text-white font-serif tracking-widest text-[9px] sm:text-[10px] uppercase py-3 rounded-xl border border-zinc-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Navigation size={12} className="text-cinnabar" /> Open Google Maps Directions
            </a>
          </div>
        </div>

        {/* Map iframe */}
        <div className="lg:col-span-2 h-[350px] lg:h-auto rounded-3xl overflow-hidden relative border border-zinc-800 bg-zinc-900/20 min-h-[350px]">
          <iframe 
            src="https://maps.google.com/maps?q=Sagar%20Fitness%20Bidholi%20Dehradun&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            className="w-full h-full grayscale invert opacity-85 contrast-125 filter hue-rotate-180 border-0"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Jade Dragon Wok Bidholi Location Map"
          />
          <div className="absolute top-4 left-4 bg-zinc-900/90 border border-zinc-800/80 rounded-xl px-3 py-1.5 text-[9px] tracking-wider uppercase text-zinc-200 shadow-xl flex items-center gap-2 pointer-events-none">
            <MapPin size={10} className="text-cinnabar animate-pulse" /> UPES Bidholi Area
          </div>
        </div>

      </div>

      <div className="text-center text-zinc-600 font-sans text-xs tracking-widest uppercase flex justify-center items-center gap-1 mt-10">
        <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Bidholi
      </div>
    </motion.div>
  );
}
