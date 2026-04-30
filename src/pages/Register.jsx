import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData, loginAs } from '../data';
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const { t, lang } = useLanguage();
  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Create new user object
    const newUser = {
      id: 'u_' + Date.now(),
      name,
      email,
      password,
      role,
      balance: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      image: role === 'client' 
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop'
    };

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));

    // Use the login helper which handles persistence and reload
    loginAs(newUser.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="auth-page h-[100dvh] flex flex-col justify-center px-8 py-4 relative overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="flex flex-col items-center text-center space-y-4 relative z-10 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-[32px] flex items-center justify-center shadow-2xl border border-white/10"
        >
          <img src="/favicon.png" alt="Logo" className="w-10 h-10 object-contain" />
        </motion.div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">{t('register')}</h1>
          <p className="text-white/40 font-bold text-xs uppercase tracking-widest">{t('auth.registerDesc')}</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10 w-full max-w-xs mx-auto">
        {/* Role Selector */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all text-xs ${role === 'client' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
            onClick={() => setRole('client')}
          >
            <User size={14} />
            <span>{t('auth.client')}</span>
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all text-xs ${role === 'craftsman' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
            onClick={() => setRole('craftsman')}
          >
            <Briefcase size={14} />
            <span>{t('auth.craftsman')}</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
            <div className="relative group">
                <User size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder={t('auth.fullName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-13 bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl ps-12 pe-4 outline-none transition-all font-bold text-sm text-white shadow-inner"
                    required
                />
            </div>

            <div className="relative group">
                <Mail size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-13 bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl ps-12 pe-4 outline-none transition-all font-bold text-sm text-white shadow-inner"
                    required
                />
            </div>

            <div className="relative group">
                <Lock size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                    type="password"
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-13 bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl ps-12 pe-4 outline-none transition-all font-bold text-sm text-white shadow-inner"
                    required
                />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-14 bg-primary text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-primary/20 mt-4"
            >
              <span>{t('register')}</span>
              <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
            </motion.button>
        </form>

        <div className="text-center pt-2">
            <p className="text-white/40 text-xs font-bold">
              {t('auth.hasAccount')}
              <span onClick={() => navigate('/login')} className="text-primary font-black cursor-pointer hover:underline ms-2"> {t('login')}</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
