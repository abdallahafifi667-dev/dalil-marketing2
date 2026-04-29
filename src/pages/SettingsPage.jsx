import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Camera, Shield, Bell, HelpCircle } from 'lucide-react';
import { demoData } from '../data';

const SettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  
  // Load initial settings from localStorage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('user_settings');
    return saved ? JSON.parse(saved) : {
      notifications: {
        app: true,
        email: false,
        chat: true,
        orders: true
      },
      security: {
        biometric: true,
        twoFactor: false
      },
      profile: {
        name: demoData.user.name,
        email: demoData.user.email,
        phone: "+20 123 456 789"
      }
    };
  });

  const [saveStatus, setSaveStatus] = useState('');

  const saveSettings = () => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const updateProfile = (field, value) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const toggleSetting = (section, field) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: !prev[section][field] }
    }));
  };

  const getPageInfo = () => {
    switch (id) {
      case 'profile': return { title: t('account.editProfile'), icon: <Camera /> };
      case 'notifications': return { title: t('account.notifications'), icon: <Bell /> };
      case 'security': return { title: t('account.security'), icon: <Shield /> };
      case 'help': return { title: t('account.help'), icon: <HelpCircle /> };
      default: return { title: t('account.settings'), icon: null };
    }
  };

  const { title } = getPageInfo();

  const Toggle = ({ active, onToggle, label }) => (
    <div className="flex justify-between items-center py-4 border-b border-[var(--border-color)] last:border-0">
      <span className="font-bold text-[var(--text-primary)] text-sm">{label}</span>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${lang === 'ar' ? (active ? 'left-1' : 'right-1') : (active ? 'right-1' : 'left-1')}`} />
      </button>
    </div>
  );

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10"
      >
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-[var(--surface-color)] rounded-2xl flex items-center justify-center text-primary border border-[var(--border-color)] shadow-sm"
            >
              <ChevronLeft size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
            </motion.button>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">{title}</h2>
              <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
                {t('settings.desc')}
              </p>
            </div>
          </div>
          {saveStatus === 'success' && (
             <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20">
                {lang === 'ar' ? 'تم الحفظ بنجاح' : 'Saved Successfully'}
             </motion.div>
          )}
        </div>

        <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[40px] p-8 shadow-sm relative overflow-hidden">
          {id === 'profile' && (
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-[40px] border-4 border-[var(--bg-color)] shadow-2xl overflow-hidden bg-white dark:bg-slate-800">
                  <img src={demoData.user.image} alt="User" className="w-full h-full object-cover" />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -end-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-[var(--bg-color)] shadow-lg"
                >
                  <Camera size={18} />
                </motion.button>
              </div>

              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{t('auth.fullName')}</label>
                  <input 
                    type="text" 
                    value={settings.profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-[var(--border-color)] focus:border-primary/20 rounded-2xl px-6 outline-none font-bold text-base transition-all text-[var(--text-primary)]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{t('auth.email')}</label>
                  <input 
                    type="email" 
                    value={settings.profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-[var(--border-color)] focus:border-primary/20 rounded-2xl px-6 outline-none font-bold text-base transition-all text-[var(--text-primary)]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{t('settings.phone')}</label>
                  <input 
                    type="tel" 
                    value={settings.profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-[var(--border-color)] focus:border-primary/20 rounded-2xl px-6 outline-none font-bold text-base transition-all text-[var(--text-primary)]" 
                  />
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={saveSettings}
                className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform mt-4"
              >
                {t('settings.save')}
              </motion.button>
            </div>
          )}

          {id === 'notifications' && (
            <div className="flex flex-col gap-2">
              <Toggle 
                label={lang === 'ar' ? 'تنبيهات التطبيق' : 'App Notifications'} 
                active={settings.notifications.app} 
                onToggle={() => toggleSetting('notifications', 'app')} 
              />
              <Toggle 
                label={lang === 'ar' ? 'تنبيهات البريد الإلكتروني' : 'Email Notifications'} 
                active={settings.notifications.email} 
                onToggle={() => toggleSetting('notifications', 'email')} 
              />
              <Toggle 
                label={lang === 'ar' ? 'تنبيهات المحادثات' : 'Chat Notifications'} 
                active={settings.notifications.chat} 
                onToggle={() => toggleSetting('notifications', 'chat')} 
              />
              <Toggle 
                label={lang === 'ar' ? 'تحديثات الطلبات' : 'Order Updates'} 
                active={settings.notifications.orders} 
                onToggle={() => toggleSetting('notifications', 'orders')} 
              />
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={saveSettings}
                className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform mt-8"
              >
                {t('settings.save')}
              </motion.button>
            </div>
          )}

          {id === 'security' && (
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                 <Toggle 
                    label={lang === 'ar' ? 'تسجيل الدخول بالبصمة' : 'Biometric Login'} 
                    active={settings.security.biometric} 
                    onToggle={() => toggleSetting('security', 'biometric')} 
                  />
                  <Toggle 
                    label={lang === 'ar' ? 'التحقق بخطوتين' : 'Two-Factor Auth'} 
                    active={settings.security.twoFactor} 
                    onToggle={() => toggleSetting('security', 'twoFactor')} 
                  />
              </div>
              
              <div className="pt-6 border-t border-[var(--border-color)]">
                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">{lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</h4>
                <div className="space-y-4">
                  <input type="password" placeholder={lang === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'} className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl px-4 outline-none font-bold text-sm" />
                  <input type="password" placeholder={lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'} className="w-full h-12 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl px-4 outline-none font-bold text-sm" />
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={saveSettings}
                className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform mt-4"
              >
                {t('settings.save')}
              </motion.button>
            </div>
          )}

          {id === 'help' && (
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {[
                  { q: lang === 'ar' ? 'كيف يمكنني طلب خدمة؟' : 'How to request a service?', a: lang === 'ar' ? 'يمكنك الذهاب للرئيسية والضغط على "طلب جديد".' : 'Go to Home and click "New Request".' },
                  { q: lang === 'ar' ? 'هل الدفع آمن؟' : 'Is payment secure?', a: lang === 'ar' ? 'نعم، نستخدم أحدث تقنيات التشفير لحماية بياناتك.' : 'Yes, we use the latest encryption technologies.' },
                  { q: lang === 'ar' ? 'كيف أتواصل مع الحرفي؟' : 'How to contact a craftsman?', a: lang === 'ar' ? 'من خلال نظام المحادثات المدمج في التطبيق.' : 'Through the built-in chat system.' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                    <h5 className="font-black text-sm text-[var(--text-primary)] mb-2">{item.q}</h5>
                    <p className="text-xs text-[var(--text-secondary)] font-bold opacity-60 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-full h-14 bg-[var(--bg-color)] text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-2xl font-black text-sm flex items-center justify-center gap-2"
              >
                <HelpCircle size={20} className="text-primary" />
                {lang === 'ar' ? 'تواصل مع الدعم الفني' : 'Contact Support'}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
