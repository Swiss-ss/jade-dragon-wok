import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Check, Send, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Contact() {
  const [contactTab, setContactTab] = useState('booking');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  
  const [booking, setBooking] = useState({
    date: 'Tonight',
    time: '7:30 PM',
    guests: '2 Guests'
  });

  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => setBookingConfirmed(false), 4000);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiry({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-50 pt-28 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col gap-10"
    >
      {/* SUCCESS TOASTS */}
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
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Reservation Confirmed</h4>
              <p className="text-xs text-zinc-400 font-sans mt-1">
                Your request for {booking.guests} on {booking.date} at {booking.time} is registered. See you soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inquirySent && (
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
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Inquiry Sent</h4>
              <p className="text-xs text-zinc-400 font-sans mt-1">
                We have received your message. Our events team will reply to you within 24 hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Link */}
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
        <span className="text-cinnabar font-serif tracking-[0.3em] text-xs uppercase block">GET IN TOUCH</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold uppercase tracking-wider">Contact & Inquiries</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-6">
        
        {/* Contact info panel */}
        <div className="flex flex-col gap-8 bg-zinc-900/10 border border-zinc-900/60 p-8 rounded-3xl">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-wider mb-3">Reach Out Directly</h3>
            <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
              Planning a group lunch, student party, catering order, or have questions about our ingredients? Send us a message or call our team in Bidholi.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm font-sans text-zinc-300">
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-cinnabar" />
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Phone Support</p>
                <p className="text-white mt-1">
                  +91 92196 03033<br />
                  +91 92589 83691
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail size={18} className="text-cinnabar" />
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Email Desk</p>
                <p className="text-white mt-1">hello@jadedragonwok.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin size={18} className="text-cinnabar" />
              <div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Lounge Address</p>
                <p className="text-white mt-1 text-xs leading-relaxed">
                  Jade Dragon Wok, Bidholi Rd, Near Sagar Fitness Gym (Near UPES Campus), Kandholi, Pondha, Dehradun, Uttarakhand 248007
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Forms */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-cinnabar" />

          {/* Toggle Tab */}
          <div className="flex border-b border-zinc-800 mb-8">
            <button 
              onClick={() => setContactTab('booking')}
              className={`flex-1 pb-3 text-xs tracking-widest font-serif uppercase transition-colors ${
                contactTab === 'booking' ? 'text-cinnabar border-b border-cinnabar' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Book a Table
            </button>
            <button 
              onClick={() => setContactTab('inquiry')}
              className={`flex-1 pb-3 text-xs tracking-widest font-serif uppercase transition-colors ${
                contactTab === 'inquiry' ? 'text-cinnabar border-b border-cinnabar' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Send Inquiry
            </button>
          </div>

          {/* TABLE BOOKING */}
          {contactTab === 'booking' ? (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Calendar size={12} className="text-cinnabar" /> Select Date
                </label>
                <select 
                  value={booking.date} 
                  onChange={(e) => setBooking({...booking, date: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                >
                  <option value="Tonight">Tonight</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Friday, Jul 24">Friday, Jul 24</option>
                  <option value="Saturday, Jul 25">Saturday, Jul 25</option>
                </select>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Clock size={12} className="text-cinnabar" /> Preferred Time
                </label>
                <select 
                  value={booking.time} 
                  onChange={(e) => setBooking({...booking, time: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                >
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:30 PM">7:30 PM (Peak)</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                </select>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans flex items-center gap-1.5">
                  <Users size={12} className="text-cinnabar" /> Size of Party
                </label>
                <select 
                  value={booking.guests} 
                  onChange={(e) => setBooking({...booking, guests: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cinnabar/80 appearance-none font-sans"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="6 Guests">6 Guests</option>
                  <option value="8+ Guests (Call)">8+ Guests (Call Lounge)</option>
                </select>
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#E34234] text-white font-serif tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg hover:bg-[#cf3527] transition-all mt-4"
              >
                Confirm Table Reservation
              </motion.button>
            </form>
          ) : (
            /* GENERAL INQUIRY */
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your full name"
                  value={inquiry.name} 
                  onChange={(e) => setInquiry({...inquiry, name: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-cinnabar/80 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Your email address"
                  value={inquiry.email} 
                  onChange={(e) => setInquiry({...inquiry, email: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-cinnabar/80 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400 font-sans">Inquiry / Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  value={inquiry.message} 
                  onChange={(e) => setInquiry({...inquiry, message: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-cinnabar/80 font-sans resize-none"
                />
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#E34234] text-white font-serif tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg hover:bg-[#cf3527] transition-all mt-4 flex items-center justify-center gap-2"
              >
                <Send size={12} /> Send Inquiry
              </motion.button>
            </form>
          )}
        </div>

      </div>

      <div className="text-center text-zinc-600 font-sans text-xs tracking-widest uppercase flex justify-center items-center gap-1 mt-10">
        <Sparkles size={12} className="text-secondary" /> Jade Dragon Wok Cafe • Bidholi
      </div>
    </motion.div>
  );
}
