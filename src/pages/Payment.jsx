import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle, Apple, Wallet, Banknote } from 'lucide-react';

const Payment = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState('pay');

  const [selectedMethod, setSelectedMethod] = useState('card');

  const handlePay = () => {
    if (!selectedMethod) return;
    setStep('success');
    
    // Simulate craftsman message after payment
    import('../utils/simulation').then(({ simulateCraftsmanArrival }) => {
      simulateCraftsmanArrival('m1'); 
    });

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const methods = [
    { id: 'card', name: 'Visa / Mastercard', desc: '**** **** **** 4582', icon: <CreditCard size={32} />, color: 'text-primary', bg: 'bg-primary/5' },
    { id: 'apple', name: 'Apple Pay', desc: 'Express Checkout', icon: <Apple size={32} />, color: 'text-slate-900 dark:text-white', bg: 'bg-slate-100 dark:bg-white/10' },
    { id: 'cash', name: lang === 'ar' ? 'دفع نقدي' : 'Cash on Delivery', desc: lang === 'ar' ? 'الدفع للحرفي مباشرة' : 'Pay craftsman directly', icon: <Banknote size={32} />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'wallet', name: t('payment.wallet'), desc: `${t('payment.balance')}: 1250 ${t('account.currency')}`, icon: <Wallet size={32} />, color: 'text-amber-500', bg: 'bg-amber-500/10' }
  ];

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      
      <div className="flex flex-col h-full min-h-0 relative z-10">
        <div className="flex items-center gap-4 mb-8 px-2">
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
              <div className="mx-2 bg-gradient-to-br from-primary via-primary/90 to-indigo-600 text-white p-10 rounded-[48px] text-center shadow-2xl shadow-primary/30 relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[50px] rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 blur-[40px] rounded-full -ml-16 -mb-16" />
                
                <div className="relative z-10">
                    <p className="text-[10px] opacity-70 mb-2 font-black uppercase tracking-[0.2em]">{t('payment.total')}</p>
                    <h3 className="text-5xl font-black tracking-tighter flex items-center justify-center gap-2">
                        550.00 <span className="text-xl font-normal opacity-60">{t('account.currency')}</span>
                    </h3>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-black text-[var(--text-primary)] px-4">{t('payment.methods')}</h3>

                <div className="space-y-3 px-2">
                  {methods.map((method) => (
                    <motion.div 
                      key={method.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-5 p-5 rounded-[32px] cursor-pointer transition-all border-2 ${selectedMethod === method.id ? 'border-primary bg-[var(--surface-color)] shadow-xl shadow-primary/5' : 'border-transparent bg-slate-50 dark:bg-slate-900/50 opacity-60'}`}
                    >
                      <div className={`w-14 h-14 ${method.bg} ${method.color} rounded-2xl flex items-center justify-center shadow-sm shrink-0`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <b className="block text-base text-[var(--text-primary)] font-black leading-tight">{method.name}</b>
                        <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">{method.desc}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-primary' : 'border-slate-300 dark:border-slate-700'}`}>
                        {selectedMethod === method.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 mt-4 px-2">
                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <ShieldCheck size={14} />
                    <span>{t('payment.secure')}</span>
                </div>
                
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePay} 
                    disabled={!selectedMethod}
                    className={`w-full h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 transition-all ${!selectedMethod ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
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
