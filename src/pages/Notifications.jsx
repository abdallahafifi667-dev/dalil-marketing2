import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Bell, Trash2, CheckCircle2, MessageSquare, Briefcase, CreditCard, ShieldCheck, AlertTriangle } from 'lucide-react';
import { demoData } from '../data';

const Notifications = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('demo_notifications');
    return saved ? JSON.parse(saved) : demoData.notifications;
  });

  useEffect(() => {
    localStorage.setItem('demo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteOne = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare className="text-blue-500" size={20} />;
      case 'proposal': return <Briefcase className="text-primary" size={20} />;
      case 'payment': return <CreditCard className="text-emerald-500" size={20} />;
      case 'system': return <ShieldCheck className="text-amber-500" size={20} />;
      default: return <AlertTriangle className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      <div className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-1 px-1">
            <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
              {t('nav.notifications')}
            </h2>
            <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {notifications.filter(n => n.unread).length} {lang === 'ar' ? 'تنبيهات جديدة' : 'New Notifications'}
            </p>
          </div>
          
          <div className="flex gap-2">
             <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={markAllRead}
              className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-500/20"
              title={lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}
            >
              <CheckCircle2 size={20} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={clearAll}
              className="w-10 h-10 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center border border-red-500/20"
              title={lang === 'ar' ? 'حذف الكل' : 'Clear all'}
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`relative p-5 rounded-[32px] bg-[var(--surface-color)] border border-[var(--border-color)] group hover:border-primary/20 transition-all flex gap-4 ${n.unread ? 'shadow-lg shadow-primary/5' : 'opacity-80'}`}
                >
                  {n.unread && (
                    <div className="absolute top-4 end-4 w-2 h-2 bg-primary rounded-full" />
                  )}
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--bg-color)] shadow-sm shrink-0`}>
                    {getIcon(n.type)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-sm text-[var(--text-primary)]">{n.title}</h4>
                      <span className="text-[8px] font-bold text-[var(--text-secondary)] opacity-40">{n.time}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-bold leading-relaxed">{n.body}</p>
                    
                    <button 
                      onClick={() => deleteOne(n.id)}
                      className="text-[10px] font-black text-red-500 pt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-20 h-20 bg-[var(--surface-color)] rounded-[32px] flex items-center justify-center text-slate-300">
                  <Bell size={40} />
                </div>
                <p className="font-black text-[var(--text-secondary)] opacity-40">{lang === 'ar' ? 'لا توجد إشعارات حالياً' : 'No notifications yet'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
