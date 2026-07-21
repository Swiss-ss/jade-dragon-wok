import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Award, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-50 pt-28 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col gap-12"
    >
      {/* Back Button */}
      <div>
        <Link 
          to="/" 
          className="text-zinc-400 hover:text-cinnabar font-serif tracking-widest text-xs uppercase flex items-center gap-2 transition-colors border-b border-transparent hover:border-cinnabar pb-1 w-max"
        >
          <ArrowLeft size={14} /> Back to Storyboard
        </Link>
      </div>

      {/* Hero Title */}
      <div className="flex flex-col gap-4">
        <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block">THE HERITAGE</span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-tight">
          Fiery Spirit,<br />
          <span className="italic font-normal text-zinc-300 normal-case">Bidholi's Pride.</span>
        </h1>
      </div>

      {/* Split Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual Callout */}
        <div className="h-[400px] rounded-3xl overflow-hidden relative border border-zinc-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/90 border border-zinc-850 backdrop-blur-sm p-6 rounded-2xl">
            <span className="text-cinnabar font-serif text-[10px] tracking-widest uppercase">THE WOK HEI</span>
            <p className="font-serif text-lg font-bold text-white mt-1">"The Breath of the Wok"</p>
            <p className="text-xs text-zinc-400 font-sans mt-1">Our woks simmer and sear at temperatures exceeding 250°C, locking in moisture and infusing charcoal smokiness.</p>
          </div>
        </div>

        {/* Narrative Copy */}
        <div className="flex flex-col gap-6 text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
          <p>
            Founded by culinary enthusiasts with a vision to bring authentic East Asian flavors to the high foothills of Bidholi, Dehradun, **Jade Dragon Wok** has grown into a local legend. Positioned just minutes away from the vibrant UPES campus, we represent an escape into authentic, warmth-infused dining.
          </p>
          <p>
            We believe that real food requires raw, uncompromising effort. That is why we don't rely on pre-packaged pastes or factory-made noodles. Everything you taste here — from the garlic-infused soy to the signature chili flakes — is custom-roasted and hand-blended by our kitchen crew.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900">
            <div className="flex flex-col gap-2">
              <Flame className="text-cinnabar" size={20} />
              <h4 className="font-serif text-white text-sm uppercase tracking-wider font-bold">Wok Hei</h4>
              <p className="text-xs text-zinc-500">Perfected high-heat smoke-infused cooking.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Award className="text-cinnabar" size={20} />
              <h4 className="font-serif text-white text-sm uppercase tracking-wider font-bold">100% Raw</h4>
              <p className="text-xs text-zinc-500">Fresh daily noodles, hand-stretched.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Heart className="text-cinnabar" size={20} />
              <h4 className="font-serif text-white text-sm uppercase tracking-wider font-bold">Local Soul</h4>
              <p className="text-xs text-zinc-500">Custom tailored to our student and local community.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-zinc-600 font-sans text-xs tracking-widest uppercase flex justify-center items-center gap-1 mt-8">
        <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Dehradun
      </div>
    </motion.div>
  );
}
