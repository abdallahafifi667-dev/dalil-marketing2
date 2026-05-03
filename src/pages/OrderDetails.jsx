import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, MapPin, Clock, CreditCard, User, CheckCircle2, MessageCircle, Star } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const order = demoData.orders.find(o => o.id === id) || 
                JSON.parse(localStorage.getItem('demo_orders') || '[]').find(o => o.id === id);
  const craftsman = demoData.craftsmen.find(m => m.id === order?.craftsmanId);

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = () => {
      const savedProposals = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
      const filtered = savedProposals.filter(p => p.orderId === id);
      
      // Map to full craftsman data
      const enriched = filtered.map(p => ({
        ...p,
        craftsman: demoData.craftsmen.find(m => m.id === p.craftsmanId)
      }));
      setProposals(enriched);
    };

    fetchProposals();
    const interval = setInterval(fetchProposals, 3000); // Check for new proposals every 3 seconds
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <div className="p-10 text-center font-black">{t('order.notFound')}</div>;

  const steps = [
    { label: t('order.statusOrdered'), time: '10:00 AM', completed: true },
    { label: t('order.statusProcessing'), time: '10:15 AM', completed: order.status !== 'pending' },
    { label: t('order.statusFinished'), time: '--', completed: order.status === 'completed' },
  ];

  return (
    <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-primary/5 blur-[150px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-8 flex-1 min-h-0 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
               {t('order.details')}
            </h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest">
              #{id.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Map / Visual Banner */}
        <div className="h-56 w-full rounded-[48px] overflow-hidden relative shadow-2xl border-4 border-[var(--surface-color)]">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*qV92t4STTh98E6NnS-dVTg.png"
            alt="Map"
            className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-6 end-6">
            <div className="bg-primary text-white px-5 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 border-2 border-white/20">
              {order.status}
            </div>
          </div>
          {/* Pulsing Dot on Map */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute" />
             <div className="w-4 h-4 bg-primary rounded-full relative border-2 border-white" />
          </div>
        </div>

        {/* Craftsman Card - Premium */}
        <div className="bg-[var(--surface-color)] rounded-[40px] p-6 border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="relative">
              <img
                src={craftsman?.image}
                alt={craftsman?.name}
                className="w-16 h-16 rounded-[24px] object-cover border-2 border-[var(--bg-color)] shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">✓</div>
            </div>
            <div className="flex-1 space-y-0.5">
              <h4 className="font-black text-xl text-[var(--text-primary)] leading-tight">{craftsman?.name}</h4>
              <p className="text-xs font-bold text-primary uppercase tracking-widest opacity-80">
                {demoData.crafts.find(c => c.id === craftsman?.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/chat/${craftsman?.id}`)}
              className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all"
            >
              <MessageCircle size={24} />
            </motion.button>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-dashed border-[var(--border-color)] relative z-10">
            <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('request.date')}</span>
                <div className="flex items-center gap-1.5 font-black text-sm text-[var(--text-primary)]">
                    <Clock size={14} className="text-primary" /> {order.date}
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center p-3 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-widest mb-1">{t('payment.total')}</span>
                <div className="flex items-center gap-1.5 font-black text-sm text-primary">
                    <CreditCard size={14} /> {order.totalPrice} <span className="text-[10px] font-bold">{t('account.currency')}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Proposals Section - "Life" in the app */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{lang === 'ar' ? 'العروض المقدمة' : 'Craftsman Proposals'}</h3>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">{lang === 'ar' ? 'حرفيين مهتمين بطلبك' : 'Experts interested in your job'}</p>
            </div>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black">
              {proposals.length} {lang === 'ar' ? 'عروض' : 'Offers'}
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {proposals.map((prop, i) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[var(--surface-color)] p-5 rounded-[40px] border border-[var(--border-color)] shadow-sm flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-[var(--bg-color)] shadow-md relative z-10 shrink-0">
                    <img src={prop.craftsman?.image} alt={prop.craftsman?.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-black text-base text-[var(--text-primary)] truncate">{prop.craftsman?.name}</h5>
                      <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                        <Star size={12} fill="currentColor" /> {prop.craftsman?.rating}
                      </div>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold mb-2 line-clamp-1 opacity-70">
                      "{prop.message}"
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-black text-sm">
                        {prop.price} {t('account.currency')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 relative z-10">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate(`/chat/chat_${prop.craftsmanId}`)}
                      className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-all"
                    >
                      <MessageCircle size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {proposals.length === 0 && (
              <div className="py-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-[var(--text-secondary)] opacity-40 italic">
                  {lang === 'ar' ? 'بانتظار وصول عروض من الحرفيين...' : 'Waiting for craftsmen to apply...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Section - Premium List */}
        <div className="space-y-5">
          <h3 className="text-xl font-black text-[var(--text-primary)] px-2">{t('order.liveTracking')}</h3>
          <div className="bg-[var(--surface-color)] rounded-[40px] p-8 border border-[var(--border-color)] shadow-sm space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-20 pointer-events-none" />
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                {i !== steps.length - 1 && (
                  <div className={`absolute start-[15px] top-9 w-0.5 h-10 ${step.completed ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                )}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 z-10 shadow-lg ${step.completed ? 'bg-primary text-white shadow-primary/20' : 'bg-[var(--bg-color)] text-[var(--text-secondary)] opacity-40 border border-[var(--border-color)]'}`}>
                  {step.completed ? <CheckCircle2 size={18} /> : <div className="w-2.5 h-2.5 bg-current rounded-full" />}
                </div>
                <div className="flex-1 -mt-1 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <b className={`text-base font-black ${step.completed ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-60'}`}>{step.label}</b>
                    <span className="text-[10px] font-black text-[var(--text-secondary)] opacity-50">{step.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">
                    {step.completed ? t('order.stageCompleted') : t('order.pendingStage')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full h-16 bg-[var(--surface-color)] border-2 border-[var(--border-color)] rounded-[32px] text-[var(--text-secondary)] font-black text-base hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
        >
          {t('order.contactSupport')}
        </motion.button>
        <div className="pb-10" />
      </motion.div>
    </div>
  );
};

export default OrderDetails;
