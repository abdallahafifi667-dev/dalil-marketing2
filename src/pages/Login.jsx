import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { demoData, loginAs } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const foundUser = demoData.users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      loginAs(foundUser.id);
      onLogin();
    } else {
      setError(t('auth.invalid'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="auth-page h-[100dvh] flex flex-col justify-center px-8 py-6 relative overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="flex flex-col items-center text-center space-y-6 relative z-10 mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-[40px] flex items-center justify-center shadow-2xl border border-white/10"
        >
          <img src="/favicon.png" alt="Logo" className="w-12 h-12 object-contain" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">{t('login')}</h1>
          <p className="text-white/40 font-bold text-xs px-10 leading-relaxed uppercase tracking-widest">
             {t('auth.loginDesc')}
          </p>
        </div>
      </div>

      <div className="space-y-6 relative z-10 w-full max-w-xs mx-auto">
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
                <div className="relative group">
                  <Mail size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl ps-12 pe-4 outline-none transition-all text-sm font-bold text-white shadow-inner"
                    required
                  />
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="relative group">
                  <Lock size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl ps-12 pe-4 outline-none transition-all text-sm font-bold text-white shadow-inner"
                    required
                  />
                </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 text-red-500 p-3 rounded-xl flex items-center gap-2 text-[10px] font-black border border-red-500/20"
              >
                <AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-14 bg-primary text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all mt-4"
            >
              <span>{t('login')}</span>
              <LogIn size={20} />
            </motion.button>
        </form>

        <div className="flex flex-col items-center gap-4 pt-2">
            <p className="text-white/40 text-xs font-bold">
                {t('auth.noAccount')}
                <span onClick={() => navigate('/register')} className="text-primary font-black cursor-pointer hover:underline ms-2"> {t('register')}</span>
            </p>
            
            <button 
                onClick={() => {
                    setEmail('client.male@example.com');
                    setPassword('123');
                }}
                className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-primary transition-colors mt-2"
            >
                {t('auth.demoLogin')}
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
