import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle, Apple } from 'lucide-react';

const Payment = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState('pay');

  const handlePay = () => {
    setStep('success');
    
    // Simulate craftsman message after payment
    import('../utils/simulation').then(({ simulateCraftsmanArrival }) => {
      // In a real app we'd get the craftsmanId from state/URL
      simulateCraftsmanArrival('m1'); 
    });

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="flex flex-col h-full min-h-0 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-[var(--surface-color)] rounded-2xl flex items-center justify-center text-primary border border-[var(--border-color)] shadow-sm"
          >
            <ChevronLeft size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
          </motion.button>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
               {t('payment.title')}
            </h2>
            <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
              {t('payment.desc')}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'pay' ? (
            <motion.div
              key="pay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col space-y-8 flex-1 min-h-0"
            >
              {/* Amount Card - Premium */}
              <div className="bg-gradient-to-br from-primary via-primary/90 to-indigo-600 text-white p-10 rounded-[48px] text-center shadow-2xl shadow-primary/30 relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[50px] rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 blur-[40px] rounded-full -ml-16 -mb-16" />
                
                <div className="relative z-10">
                    <p className="text-[10px] opacity-70 mb-2 font-black uppercase tracking-[0.2em]">{t('payment.total')}</p>
                    <h3 className="text-5xl font-black tracking-tighter flex items-center justify-center gap-2">
                        550.00 <span className="text-xl font-normal opacity-60">{t('account.currency')}</span>
                    </h3>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-[var(--text-primary)] px-2">{t('payment.methods')}</h3>

                {/* Method Card */}
                <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-5 p-6 bg-[var(--surface-color)] rounded-[32px] cursor-pointer border-2 border-primary shadow-xl shadow-primary/5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-[var(--border-color)] group-hover:scale-105 transition-transform shrink-0"><CreditCard size={32} /></div>
                  <div className="flex-1 space-y-1 relative z-10">
                    <b className="block text-lg text-[var(--text-primary)] font-black leading-tight">Visa / Mastercard</b>
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">**** **** **** 4582</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-4 border-primary flex items-center justify-center bg-white dark:bg-slate-900 shadow-inner">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                  </div>
                </motion.div>

                {/* Other Methods */}
                <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-5 p-6 bg-[var(--surface-color)] rounded-[32px] cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[var(--text-primary)] shadow-sm border border-[var(--border-color)] shrink-0"><Apple size={32} /></div>
                  <div className="flex-1 space-y-1">
                    <b className="block text-lg text-[var(--text-primary)] font-black leading-tight">Apple Pay</b>
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">Express Checkout</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-4 border-[var(--border-color)]"></div>
                </motion.div>

                <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-5 p-6 bg-[var(--surface-color)] rounded-[32px] cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 font-black text-2xl shadow-sm border border-amber-200 shrink-0">W</div>
                  <div className="flex-1 space-y-1">
                    <b className="block text-lg text-[var(--text-primary)] font-black leading-tight">{t('payment.wallet')}</b>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t('payment.balance')}: 1250 {t('account.currency')}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-4 border-[var(--border-color)]"></div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <ShieldCheck size={14} />
                    <span>{t('payment.secure')}</span>
                </div>
                
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePay} 
                    className="w-full h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all"
                >
                    {t('payment.complete')}
                </motion.button>
              </div>
              <div className="pb-10" />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-1 py-12 text-center"
            >
              <div className="relative mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-40 h-40 bg-green-500 text-white rounded-[56px] flex items-center justify-center shadow-2xl shadow-green-500/40 relative z-10"
                  >
                    <CheckCircle size={80} strokeWidth={3} />
                  </motion.div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 blur-[60px] rounded-full -z-10 animate-pulse" />
              </div>

              <div className="space-y-3 mb-12">
                <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">{t('payment.success')}</h2>
                <p className="text-sm text-[var(--text-secondary)] font-bold max-w-[240px] mx-auto opacity-70 leading-relaxed">
                    {t('payment.successDesc')}
                </p>
              </div>

              <div className="w-48 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-primary rounded-full absolute shadow-lg"
                />
              </div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-4 opacity-50">{t('payment.redirecting')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;
