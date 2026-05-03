import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { Search, MapPin, Star, Filter, ArrowRight, MessageSquare } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Craftsmen = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCraftId = searchParams.get('craft');

  const { craftsmen, crafts } = demoData;
  const [filteredList, setFilteredList] = useState(craftsmen);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    let list = craftsmen;
    if (selectedCraftId) {
      list = list.filter(m => m.craftId === selectedCraftId);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(term) || 
        m.location.toLowerCase().includes(term)
      );
    }
    if (selectedRating > 0) {
      list = list.filter(m => m.rating >= selectedRating);
    }
    if (maxPrice < 1000) {
      list = list.filter(m => m.pricePerHour <= maxPrice);
    }
    setFilteredList(list);
  }, [selectedCraftId, searchTerm, craftsmen, selectedRating, maxPrice]);

  return (
    <div className="page-container with-nav-padding pt-8 pb-24 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-full"
      >
        <div className="space-y-1 px-1">
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('craftsmen.title')}
          </h2>
          <p className="text-[var(--text-secondary)] font-bold text-sm opacity-70">
            {t('craftsmen.desc')}
          </p>
        </div>

        <div className="flex gap-2 px-1">
          <div className="flex-1 relative">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-40" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-13 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl ps-11 pe-4 text-sm font-bold outline-none focus:border-primary/50 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-13 h-13 rounded-2xl flex items-center justify-center border transition-all shadow-sm ${showFilters ? 'bg-primary text-white border-primary' : 'bg-[var(--surface-color)] text-[var(--text-secondary)] opacity-50 border-[var(--border-color)]'}`}
          >
            <Filter size={20} />
          </button>
        </div>

        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden px-1">
            <div className="bg-[var(--surface-color)] p-6 rounded-[36px] border border-[var(--border-color)] space-y-6 shadow-xl">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{t('craftsmen.rating')}</h4>
                <div className="flex gap-2">
                  {[0, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`flex-1 py-3 rounded-2xl text-[10px] font-black border transition-all ${selectedRating === rating ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-[var(--bg-color)] border-[var(--border-color)] text-[var(--text-primary)]'}`}
                    >
                      {rating === 0 ? t('viewAll') : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{t('craftsmen.priceLabel')}</h4>
                  <span className="text-xs font-black text-primary">{maxPrice} {t('account.currency')}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-[var(--bg-color)] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[8px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-tighter">
                  <span>100</span>
                  <span>1000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-1">
          {filteredList.map((m) => (
            <motion.div
              key={m.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/craftsman/${m.id}`)}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[36px] p-6 flex flex-col justify-between gap-5 hover:border-primary/30 transition-all cursor-pointer group shadow-sm hover:shadow-xl relative"
            >
              <div className="space-y-5">
                <div className="flex gap-5">
                  <div className="w-22 h-22 rounded-3xl overflow-hidden shrink-0 border-2 border-[var(--bg-color)] shadow-md">
                    <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={m.name} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-lg text-[var(--text-primary)] truncate group-hover:text-primary transition-colors leading-tight">{m.name}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 bg-amber-500/5 px-2.5 py-1 rounded-xl border border-amber-500/10 shrink-0">
                        <Star size={12} fill="currentColor" /> {m.rating}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-primary font-black text-[10px] uppercase tracking-wider">
                        {crafts.find(c => c.id === m.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
                      </span>
                      <span className="w-1 h-1 bg-[var(--border-color)] rounded-full" />
                      <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)] font-bold opacity-70">
                        <MapPin size={12} className="text-primary" /> {m.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-[var(--text-secondary)] font-bold opacity-60 line-clamp-2 leading-relaxed px-1">
                  {m.bio || t('craftsmen.bioFallback')}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-5 border-t border-dashed border-[var(--border-color)] mt-auto">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[var(--text-secondary)] opacity-50 font-black uppercase tracking-[0.2em] mb-1">{t('craftsmen.priceHr')}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-xl text-[var(--text-primary)]">{m.pricePerHour}</span>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">{t('account.currency')}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-[var(--bg-color)] text-primary rounded-2xl flex items-center justify-center border border-[var(--border-color)] hover:border-primary transition-all shadow-sm"
                  >
                    <MessageSquare size={20} />
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="px-6 h-12 bg-primary text-white rounded-2xl flex items-center gap-2 font-black text-xs shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-all"
                  >
                    <span>{t('craftsmen.bookNow')}</span>
                    <ArrowRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Craftsmen;
