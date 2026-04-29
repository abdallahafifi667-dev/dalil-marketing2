import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const { t } = useLanguage();

  const isCraftsman = localStorage.getItem('userRole') === 'craftsman';
  
  const navItems = isCraftsman ? [
    { path: '/', icon: <Home size={24} />, label: t('ControlPanel.title') },
    { path: '/craftsmen', icon: <Grid size={24} />, label: t('crafts.title')},
    { path: '/chat', icon: <MessageCircle size={24} />, label: t('chat.title') },
    { path: '/account', icon: <User size={24} />, label: t('account.title') },
  ] : [
    { path: '/', icon: <Home size={24} />, label: t('home.title') },
    { path: '/crafts', icon: <Grid size={24} />, label: t('crafts.title') },
    { path: '/chat', icon: <MessageCircle size={24} />, label: t('chat.title') },
    { path: '/account', icon: <User size={24} />, label: t('account.title') },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-[32px] px-8 flex justify-between items-center z-[1000] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`
          }
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                className={`p-2 rounded-2xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-transparent'}`}
              >
                {React.cloneElement(item.icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
              </motion.div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
