import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { User, Wallet, Bell, Shield, HelpCircle, LogOut, ChevronRight, Camera, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = ({ onLogout }) => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { user } = demoData;
  const [userImage, setUserImage] = useState(user.image);
  const fileInputRef = React.useRef(null);

  // Load saved image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem(`userImage_${user.id}`);
    if (savedImage) {
      setUserImage(savedImage);
    }
  }, [user.id]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        setUserImage(imageData);
        // Save to localStorage
        localStorage.setItem(`userImage_${user.id}`, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isCraftsman = user.role === 'craftsman';

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, label: t('account.editProfile'), color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'notifications', icon: <Bell size={20} />, label: t('account.notifications'), color: 'text-amber-500', bg: 'bg-amber-500/10' },
    isCraftsman && { id: 'work-settings', icon: <Zap size={20} />, label: t('account.workSettings'), color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'security', icon: <Shield size={20} />, label: t('account.security'), color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'help', icon: <HelpCircle size={20} />, label: t('account.help'), color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container with-nav-padding pt-8 space-y-8 relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-[120px] rounded-full -mr-36 -mt-36 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
          {t('account.title')}
        </h2>
        <p className="text-[var(--text-secondary)] font-bold text-sm">
          {t('account.desc')}
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-[32px] border-4 border-[var(--bg-color)] shadow-2xl overflow-hidden bg-white dark:bg-slate-800">
              <img src={userImage} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={triggerFileInput}
              className="absolute -bottom-1 -end-1 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center border-4 border-[var(--bg-color)] shadow-lg"
            >
              <Camera size={16} />
            </motion.button>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{user.name}</h3>
            <div className="flex flex-col gap-1">
              <span className="text-primary font-black text-[10px] uppercase tracking-widest">
                {user.role === 'client' ? t('account.goldClient') : t('account.verifiedCraftsman')}
              </span>
              <span className="text-[var(--text-secondary)] text-xs font-bold opacity-60">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Wallet Card - Enhanced */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gradient-to-br from-primary via-primary/90 to-indigo-600 rounded-[40px] p-8 text-white flex justify-between items-center shadow-2xl shadow-primary/30 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[50px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 blur-[40px] rounded-full -ml-16 -mb-16" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-[10px] opacity-80 font-black uppercase tracking-widest mb-1">
              {t('account.balance')}
            </p>
            <h3 className="text-3xl font-black flex items-baseline gap-2">
              {user.balance} <span className="text-xs font-normal opacity-70">{t('account.currency')}</span>
            </h3>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/payment')}
          className="bg-white text-primary px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-black/10 hover:scale-105 transition-all relative z-10"
        >
          {t('account.topUp')}
        </motion.button>
      </motion.div>

      {/* Settings Menu - Redesigned */}
      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/settings/${item.id}`)}
            className="flex items-center gap-5 p-4 rounded-[32px] bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-primary/20 transition-all cursor-pointer group shadow-sm hover:shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform relative z-10`}>
              {item.icon}
            </div>
            <div className="flex-1 space-y-0.5 relative z-10">
              <span className="font-black text-base text-[var(--text-primary)]">{item.label}</span>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold opacity-50 uppercase tracking-widest">
                {t('account.customize')} {item.label}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--bg-color)] text-[var(--text-secondary)] opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all border border-[var(--border-color)] group-hover:scale-110 relative z-10">
              <ChevronRight size={18} className={`${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pb-10 pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="w-full h-16 bg-red-500/10 dark:bg-red-500/5 text-red-600 rounded-[32px] flex items-center justify-center gap-3 font-black text-lg transition-all border border-red-500/20 hover:bg-red-500 hover:text-white shadow-lg shadow-red-500/10"
        >
          <LogOut size={22} />
          <span>{t('logout')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Account;
