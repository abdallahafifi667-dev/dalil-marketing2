import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { 
  Settings, 
  Wallet, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Camera, 
  ArrowUpRight,
  Plus,
  Inbox,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = ({ onLogout }) => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { user, orders } = demoData;
  const [userImage, setUserImage] = useState(user.image);
  const [activeTab, setActiveTab] = useState('active');
  const fileInputRef = React.useRef(null);

  const [localOrders, setLocalOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('demo_orders') || '[]');
  });

  useEffect(() => {
    const checkLocal = () => {
      const saved = JSON.parse(localStorage.getItem('demo_orders') || '[]');
      if (saved.length !== localOrders.length) {
        setLocalOrders(saved);
      }
    };
    const interval = setInterval(checkLocal, 3000);
    return () => clearInterval(interval);
  }, [localOrders.length]);

  // Filter orders for the current user
  const userOrders = useMemo(() => {
    const combined = [...localOrders, ...orders];
    return combined.filter(o => o.clientId === user.id || o.clientId === 'u1');
  }, [localOrders, orders, user.id]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'active') return userOrders.filter(o => o.status === 'pending' || o.status === 'in_progress');
    if (activeTab === 'completed') return userOrders.filter(o => o.status === 'completed');
    if (activeTab === 'cancelled') return userOrders.filter(o => o.status === 'cancelled');
    return [];
  }, [userOrders, activeTab]);

  useEffect(() => {
    const savedImage = localStorage.getItem(`userImage_${user.id}`);
    if (savedImage) setUserImage(savedImage);
  }, [user.id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        setUserImage(imageData);
        localStorage.setItem(`userImage_${user.id}`, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'active', label: t('account.activeRequests') || 'طلبات نشطة', icon: <Clock size={16} /> },
    { id: 'completed', label: t('account.completedRequests') || 'مكتملة', icon: <CheckCircle size={16} /> },
    { id: 'cancelled', label: t('account.cancelledRequests') || 'ملغاة', icon: <XCircle size={16} /> },
  ];

  return (
    <div className="page-container with-nav-padding pt-0 px-0 space-y-0 relative overflow-x-hidden">
      {/* Premium Profile Header */}
      <div className="relative h-[280px]">
        {/* Cover Image */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=600&fit=crop" 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-[var(--bg-color)]" />
        </div>

        {/* Header Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <button 
            onClick={() => navigate(`/settings/${user.id}`)}
            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
          >
            <Settings size={22} />
          </button>
          
          <div className="flex items-center gap-3">
             {/* Balance Pill */}
             <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
               <div className="flex flex-col items-start">
                 <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">{t('account.balance')}</span>
                 <span className="text-sm font-black text-white">{user.balance} <span className="text-[10px] opacity-60 font-normal">{t('account.currency')}</span></span>
               </div>
               <button 
                onClick={() => navigate('/payment')}
                className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-110 transition-transform"
               >
                 <Plus size={18} />
               </button>
             </div>
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute -bottom-16 inset-x-0 flex flex-col items-center">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-[44px] border-8 border-[var(--bg-color)] shadow-2xl overflow-hidden bg-white dark:bg-slate-900 relative z-10"
            >
              <img src={userImage} alt={user.name} className="w-full h-full object-cover" />
            </motion.div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 -right-1 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-[var(--bg-color)] shadow-xl z-20 hover:scale-110 transition-transform"
            >
              <Camera size={18} />
            </button>
          </div>
          
          <div className="mt-4 text-center space-y-1">
            <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{user.name}</h2>
            <div className="flex items-center justify-center gap-2">
               <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  {user.role === 'client' ? t('account.goldClient') : t('account.verifiedCraftsman')}
               </span>
               <span className="text-[var(--text-secondary)] text-[10px] font-bold opacity-60">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

      {/* Spacing for Header Overlay */}
      <div className="h-24" />

      <div className="px-6 space-y-8">
        {/* Tabs Navigation */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-[28px] border border-slate-100 dark:border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[22px] text-xs font-black transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-primary shadow-lg' : 'text-slate-500 hover:text-primary'}`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

      {/* Requests Content */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredOrders.length > 0 ? (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredOrders.map((order) => (
                <div 
                  key={order.id}
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="bg-[var(--surface-color)] p-5 rounded-[32px] border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                      <Inbox size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[var(--text-primary)] mb-1 group-hover:text-primary transition-colors">{order.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-bold opacity-60">
                        <span>{order.date}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{order.budget}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[40px] flex items-center justify-center text-slate-300">
                <Inbox size={48} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[var(--text-primary)]">{t('account.emptyTitle') || 'لا توجد طلبات'}</h3>
                <p className="text-sm text-[var(--text-secondary)] font-bold opacity-60 max-w-[250px] mx-auto">
                  {t('account.emptyDesc') || 'لم تقم بإضافة أي طلبات في هذا القسم بعد.'}
                </p>
              </div>
              {activeTab === 'active' && (
                <button 
                  onClick={() => navigate('/request/new')}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-primary/20"
                >
                  <Plus size={18} />
                  {t('home.newRequest')}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  </div>
);
};

export default Account;

