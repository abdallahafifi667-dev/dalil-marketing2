import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Bell, ArrowUpRight, Zap, Edit3 } from 'lucide-react';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { user, crafts, craftsmen } = demoData;
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container with-nav-padding pt-8 space-y-8"
    >
      {/* Welcome & User Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            {t('home.welcomeBack')}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            {user.name}
          </h2>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/notifications')} className="relative w-12 h-12 bg-[var(--surface-color)] rounded-2xl flex items-center justify-center border border-[var(--border-color)] text-slate-400">
          <Bell size={24} />
          {JSON.parse(localStorage.getItem('demo_notifications') || '[]').length > 0 && (
            <span className="absolute top-3 start-3 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--bg-color)] flex items-center justify-center text-[8px] text-white font-black">
               {JSON.parse(localStorage.getItem('demo_notifications') || '[]').length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Simplified Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('search')}
          className="w-full h-14 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl ps-12 pe-4 text-sm font-bold outline-none focus:border-primary/50 transition-all shadow-sm"
        />
      </div>

      {/* Create Request Button - Simple */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/request/new')}
        className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
      >
        <Edit3 size={18} />
        <span>{t('home.newRequest')}</span>
      </motion.button>

      {/* Simple Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-6 px-1">
          <h4 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{t('crafts.title')}</h4>
          <span onClick={() => navigate('/crafts')} className="text-primary font-black text-xs cursor-pointer">{t('viewAll')}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {crafts.slice(0, 8).map((craft) => (
            <motion.div
              key={craft.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/craftsmen?craft=${craft.id}`)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl flex items-center justify-center p-3 group-hover:border-primary/30 transition-all">
                <img src={craft.image} alt={craft.nameEn} className="w-full h-full object-contain" />
              </div>
              <p className="text-[10px] font-black text-[var(--text-primary)] text-center leading-tight truncate w-full">
                {lang === 'ar' ? craft.nameAr : craft.nameEn}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simplified Top Craftsmen */}
      <section className="pb-10">
        <div className="flex justify-between items-center mb-6 px-1">
          <h4 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{t('topRated')}</h4>
          <span onClick={() => navigate('/craftsmen')} className="text-primary font-black text-xs cursor-pointer">{t('viewAll')}</span>
        </div>
        <div className="space-y-4">
          {craftsmen.slice(0, 5).map((m) => (
            <motion.div
              key={m.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/craftsman/${m.id}`)}
              className="flex items-center gap-4 p-3 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl group cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[var(--border-color)]">
                 <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <h5 className="font-black text-sm text-[var(--text-primary)] truncate">{m.name}</h5>
                    <div className="flex items-center gap-1 text-amber-500 text-[10px] font-black">
                        <Star size={10} fill="currentColor" /> {m.rating}
                    </div>
                </div>
                <p className="text-primary font-black text-[9px] uppercase tracking-wider mb-1">
                  {crafts.find(c => c.id === m.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-[var(--text-secondary)] font-bold opacity-60">
                  <MapPin size={10} /> {m.location}
                </div>
              </div>
              <div className="w-10 h-10 bg-[var(--bg-color)] rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
