import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Crafts = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { crafts, craftsmen } = demoData;
  const [searchTerm, setSearchTerm] = useState('');

  // Count craftsmen for each craft
  const craftWithCount = useMemo(() => {
    return crafts.map(craft => ({
      ...craft,
      count: craftsmen.filter(c => c.craftId === craft.id).length
    }));
  }, [crafts, craftsmen]);

  const filteredCrafts = useMemo(() => {
    return craftWithCount.filter(craft =>
      craft.nameAr.includes(searchTerm) || craft.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [craftWithCount, searchTerm]);

  return (
    <div className="page-container with-nav-padding pt-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {t('crafts.title')}
          </h2>
          <p className="text-[var(--text-secondary)] font-bold text-sm">
            {t('crafts.desc')}
          </p>
        </div>

        <div className="relative">
          <Search size={20} className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search')}
            className="w-full h-14 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl ps-12 pe-4 text-sm font-bold outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filteredCrafts.map((craft) => (
            <motion.div
              key={craft.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/craftsmen?craft=${craft.id}`)}
              className="flex flex-col items-center gap-2 p-3 bg-[var(--surface-color)] rounded-3xl border border-[var(--border-color)] hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="w-full aspect-square bg-[var(--bg-color)] rounded-2xl flex items-center justify-center p-3 group-hover:scale-105 transition-transform">
                <img
                  src={craft.image}
                  alt={craft.nameEn}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h4 className="font-black text-[10px] text-[var(--text-primary)] leading-tight">
                  {lang === 'ar' ? craft.nameAr : craft.nameEn}
                </h4>
                <p className="text-[8px] font-black text-primary uppercase mt-1">
                  {craft.count} {t('auth.craftsman')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Crafts;
