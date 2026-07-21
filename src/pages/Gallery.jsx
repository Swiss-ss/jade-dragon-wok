import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Image } from 'lucide-react';

const GALLERY_PHOTOS = [
  {
    title: 'The Sizzle',
    subtitle: 'Wok Heat',
    img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Warm Oak Counter',
    subtitle: 'Dining Vibe',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Fresh Preparation',
    subtitle: 'Daily Noodle Stretch',
    img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Red Lantern Glow',
    subtitle: 'Signature Atmosphere',
    img: 'https://images.unsplash.com/photo-1526244437259-7f37eb13ea22?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Handcrafted Dim Sum',
    subtitle: 'Crystal Veg Dim Sum',
    img: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Golden Pork Dumplings',
    subtitle: 'Dragon Dumplings',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Fiery Pan Toss',
    subtitle: 'Kung Pao Fire',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Herbal Infusions',
    subtitle: 'Thai Green Curry Prep',
    img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Traditional Table setup',
    subtitle: 'Minimalist Dining',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'
  }
];

export default function Gallery() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-50 pt-20 lg:pt-28 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col gap-10"
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

      {/* Header */}
      <div className="flex flex-col gap-4">
        <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block">VISUAL MOMENTS</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold uppercase tracking-wider flex items-center gap-3">
          <Image size={32} className="text-cinnabar" /> Gallery Showcase
        </h1>
      </div>

      {/* Expanded Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_PHOTOS.map((photo, index) => (
          <div 
            key={index}
            className="group h-80 rounded-3xl overflow-hidden relative border border-zinc-800 bg-zinc-900/30 shadow-lg cursor-pointer"
          >
            <img 
              src={photo.img} 
              alt={photo.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            {/* Title Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-cinnabar font-serif text-[10px] tracking-widest uppercase">{photo.subtitle}</span>
              <h4 className="font-serif text-lg font-bold text-white mt-1 uppercase tracking-wide">{photo.title}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-zinc-600 font-sans text-xs tracking-widest uppercase flex justify-center items-center gap-1 mt-10">
        <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Bidholi
      </div>
    </motion.div>
  );
}
