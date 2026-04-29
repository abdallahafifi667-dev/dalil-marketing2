import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Languages, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, t } = useLanguage();
  const { toggleLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === '/';

  const getPageTitle = () => {
    if (location.pathname === '/crafts') return t('crafts.title');
    if (location.pathname === '/craftsmen') return t('craftsmen.title');
    if (location.pathname === '/chat') return t('chat.title');
    if (location.pathname === '/account') return t('account.title');
    if (location.pathname.includes('/payment')) return t('payment.title');
    if (location.pathname.includes('/order/')) return t('order.details');
    if (location.pathname.includes('/craftsman/')) return t('craftsmen.profile');
    if (location.pathname.includes('/settings/')) return t('account.settings');
    if (location.pathname.includes('/request/new')) return t('request.newTitle');
    if (location.pathname.includes('/chat/')) return t('chat.chatDetail');
    return '';
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[var(--bg-color)]/60 backdrop-blur-xl border-b border-[var(--border-color)] z-[1000] sticky top-0 h-20">
      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          {isMainPage ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <button 
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                  <img src="/favicon.png" alt="Logo" className="w-7 h-7 object-contain" />
                </div>
                {JSON.parse(localStorage.getItem('demo_notifications') || '[]').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[var(--bg-color)] shadow-sm" />
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] hover:border-primary transition-all shadow-sm"
              >
                <ChevronLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
              <h1 className="font-black text-lg text-[var(--text-primary)] tracking-tight">{getPageTitle()}</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-2.5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleLang}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-primary transition-all font-black text-[10px] tracking-widest shadow-sm"
        >
          <Languages size={16} className="text-primary" />
          <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="w-11 h-11 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-primary transition-all flex items-center justify-center shadow-sm"
        >
          {theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-amber-400" />}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
