import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Zap, Edit3, ArrowRight, User, TrendingUp, ShieldCheck } from 'lucide-react';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { user, crafts, craftsmen } = demoData;
  const [searchTerm, setSearchTerm] = useState('');

  const firstName = user.name.split(' ')[0];

  return (
    <div className="page-container with-nav-padding pt-4 space-y-12 overflow-x-hidden">
      {/* Header / Greeting */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-center px-1"
      >
        <div className="space-y-0.5">
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('home.hello', { name: firstName })}
          </h1>
          <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" />
            {user.location}
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl cursor-pointer" onClick={() => navigate('/account')}>
          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </motion.div>
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group px-1"
      >
        <div className="absolute inset-y-0 start-5 flex items-center text-slate-400 group-focus-within:text-primary transition-all">
          <Search size={22} />
        </div>
        <input
          type="text"
          placeholder={t('search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && navigate(`/craftsmen?search=${searchTerm}`)}
          className="w-full h-16 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-3xl ps-14 pe-6 text-base font-bold shadow-sm transition-all outline-none text-[var(--text-primary)] focus:border-primary/50"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(`/craftsmen?search=${searchTerm}`)}
          className="absolute inset-y-2 end-3 px-6 bg-primary text-white rounded-2xl font-black text-xs shadow-lg shadow-primary/20"
        >
          {t('home.search')}
        </motion.button>
      </motion.div>

      {/* Hero / Quick Action Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-64 w-full rounded-[48px] overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-indigo-600" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')] opacity-20 mix-blend-soft-light" />

        {/* Abstract shapes for premium feel */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

        <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white leading-tight">
              {t('home.heroTitle')}
            </h2>
            <p className="text-white/80 font-bold text-sm max-w-[280px] mx-auto">
              {t('home.heroDesc')}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/request/new')}
            className="px-10 h-14 bg-white text-primary rounded-[24px] font-black text-base shadow-2xl flex items-center justify-center gap-3"
          >
            <Edit3 size={20} />
            <span>{t('home.newRequest')}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Categories Grid - Redesigned */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-1">
          <div>
            <h4 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{t('crafts.title')}</h4>
            <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{t('home.explore')}</p>
          </div>
          <button
            onClick={() => navigate('/crafts')}
            className="text-primary font-black text-xs hover:underline"
          >
            {t('viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 px-1">
          {crafts.slice(0, 8).map((craft, i) => (
            <motion.div
              key={craft.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/craftsmen?craft=${craft.id}`)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] flex items-center justify-center p-0 overflow-hidden group-hover:border-primary/50 group-hover:shadow-lg transition-all shadow-sm">
                <img src={craft.image} alt={craft.nameEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[9px] font-black text-[var(--text-primary)] text-center leading-tight truncate w-full px-1">
                {lang === 'ar' ? craft.nameAr : craft.nameEn}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Experts */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-1">
          <div>
            <h4 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{t('topRated')}</h4>
            <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{t('home.bestRated')}</p>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6">
          {craftsmen.slice(0, 10).map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/craftsman/${m.id}`)}
              className="shrink-0 w-64 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[44px] p-6 shadow-xl shadow-slate-200/20 dark:shadow-none group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-[var(--bg-color)] shadow-lg">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-black text-base text-[var(--text-primary)] truncate max-w-[180px]">{m.name}</h5>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-primary font-black text-[9px] uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-lg">
                      {crafts.find(c => c.id === m.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                      <Star size={12} fill="currentColor" /> {m.rating}
                    </div>
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-dashed border-[var(--border-color)] flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[9px] text-[var(--text-secondary)] font-bold opacity-60">
                    <MapPin size={12} className="text-primary" /> {m.location.split('،')[1] || m.location}
                  </div>
                  <ArrowRight size={16} className={`text-primary ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pb-10" />
    </div>
  );
};

export default Home;

