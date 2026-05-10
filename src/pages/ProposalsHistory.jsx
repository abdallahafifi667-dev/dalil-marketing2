import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Clock, CheckCircle2, XCircle, ChevronRight, MessageSquare, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProposalsHistory = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Simulate fetching proposals sent by this craftsman
    const saved = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
    setProposals(saved.map(p => ({
      ...p,
      status: p.status || 'pending', // pending, accepted, rejected
      date: new Date().toLocaleDateString('ar-EG'),
      title: t('proposals.mockTitle') || (lang === 'ar' ? 'تركيب سباكة حمام' : 'Bathroom Plumbing Installation')
    })));
  }, [lang]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-emerald-500 bg-emerald-500/10';
      case 'rejected': return 'text-red-500 bg-red-500/10';
      default: return 'text-amber-500 bg-amber-500/10';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'accepted': return t('proposals.accepted');
      case 'rejected': return t('proposals.rejected');
      default: return t('proposals.pending');
    }
  };

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />

      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
          {t('proposals.title')}
        </h2>
        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
          {t('proposals.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {proposals.length > 0 ? (
          proposals.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[40px] space-y-4 relative overflow-hidden group shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-black text-base text-[var(--text-primary)]">
                    {prop.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] opacity-60 font-bold">
                    <Clock size={12} /> {prop.date}
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest ${getStatusColor(prop.status)}`}>
                  {getStatusLabel(prop.status)}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-1.5 text-primary font-black">
                  <DollarSign size={16} />
                  <span className="text-sm">{prop.price === 'inspection' ? t('order.priceOnInspection') : prop.price}</span>
                  {prop.price !== 'inspection' && <span className="text-[10px] opacity-60 uppercase">{t('account.currency')}</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/chat/client_${prop.id}`)}
                    className="w-10 h-10 bg-[var(--bg-color)] text-[var(--text-secondary)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <MessageSquare size={18} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/order/${prop.orderId}`)}
                    className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 hover:bg-primary hover:text-white transition-all"
                  >
                    <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-[var(--bg-color)] rounded-[48px] border-2 border-dashed border-[var(--border-color)]">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Clock size={32} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-[var(--text-secondary)] opacity-40">
              {t('proposals.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalsHistory;

