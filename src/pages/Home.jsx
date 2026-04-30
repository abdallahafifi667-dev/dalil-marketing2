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
    <div className="page-container with-nav-padding pt-6 space-y-10 overflow-x-hidden">
      {/* Advanced Search & Create Request Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className="relative group">
          <Search size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search')}
            className="w-full h-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] ps-14 pe-4 text-sm font-bold outline-none focus:border-primary/30 transition-all shadow-xl shadow-slate-100/50 dark:shadow-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/request/new')}
          className="w-full h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-base shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Edit3 size={20} />
          </motion.div>
          <span>{t('home.newRequest')}</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </motion.div>

      {/* Categories Horizontal Scroll */}
      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-end mb-6 px-1">
          <div>
            <h4 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{t('crafts.title')}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('home.browseByCategory') || 'EXPLORE CATEGORIES'}</p>
          </div>
          <button 
            onClick={() => navigate('/crafts')} 
            className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
          >
            {t('viewAll')}
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
          {crafts.slice(0, 8).map((craft, i) => (
            <motion.div
              key={craft.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/craftsmen?craft=${craft.id}`)}
              className="flex-shrink-0 w-24 flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] flex items-center justify-center p-0 overflow-hidden group-hover:border-primary/50 transition-all shadow-lg shadow-slate-100/50 dark:shadow-none">
                <img src={craft.image} alt={craft.nameEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[10px] font-black text-[var(--text-primary)] text-center leading-tight truncate w-full px-1">
                {lang === 'ar' ? craft.nameAr : craft.nameEn}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Rated Craftsmen List */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-20"
      >
        <div className="flex justify-between items-end mb-6 px-1">
          <div>
            <h4 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{t('topRated')}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('home.verifiedExperts') || 'VERIFIED EXPERTS'}</p>
          </div>
          <button 
            onClick={() => navigate('/craftsmen')} 
            className="text-primary font-black text-xs hover:underline"
          >
            {t('viewAll')}
          </button>
        </div>
        
        <div className="space-y-5">
          {craftsmen.slice(0, 5).map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/craftsman/${m.id}`)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] group cursor-pointer shadow-xl shadow-slate-200/40 dark:shadow-none transition-all relative overflow-hidden"
            >
              {/* Glass Background Highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="w-20 h-20 rounded-[24px] overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-lg relative z-10">
                 <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-start mb-1">
                    <h5 className="font-black text-base text-[var(--text-primary)] truncate">{m.name}</h5>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-lg text-[10px] font-black shadow-sm">
                        <Star size={10} fill="currentColor" /> {m.rating}
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary font-black text-[9px] uppercase tracking-wider rounded-md">
                    {crafts.find(c => c.id === m.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
                  </span>
                  {m.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <Zap size={8} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                  <MapPin size={12} className="text-slate-300" /> {m.location}
                </div>
              </div>

              <motion.div 
                whileHover={{ rotate: 45 }}
                className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-inner relative z-10"
              >
                <ArrowUpRight size={22} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
