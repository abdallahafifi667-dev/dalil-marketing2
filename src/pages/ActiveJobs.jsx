import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, MessageCircle, Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActiveJobs = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  
  // Simulated active jobs
  const [jobs, setJobs] = useState([
    { 
      id: 'aj1', 
      clientName: 'أحمد علي', 
      service: lang === 'ar' ? 'تصليح سخان غاز' : 'Gas Heater Repair',
      status: 'ongoing', // ongoing, arriving
      address: 'القاهرة، المعادي، شارع 9',
      price: '300',
      startTime: '10:30 AM'
    }
  ]);

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[130px] rounded-full -ml-40 -mt-40 -z-10" />

      <div className="space-y-1 px-1">
        <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
          {t('activeJobs.title')}
        </h2>
        <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-60">
          {t('activeJobs.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            layout
            className="bg-[var(--surface-color)] border border-[var(--border-color)] p-6 rounded-[48px] shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6"
          >
            {/* Header Info */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <Play size={24} fill="currentColor" className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-[var(--text-primary)]">{job.service}</h4>
                  <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60">{job.clientName}</p>
                </div>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl font-black text-xs">
                {job.startTime}
              </div>
            </div>

            {/* Address & Actions */}
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[var(--bg-color)] rounded-3xl border border-[var(--border-color)]">
                    <MapPin size={18} className="text-primary mt-0.5" />
                    <p className="text-sm font-bold text-[var(--text-primary)]">{job.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="h-14 bg-slate-100 dark:bg-slate-800 text-[var(--text-primary)] rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                    >
                        <Phone size={18} /> {t('activeJobs.call')}
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/chat/client_${job.id}`)}
                        className="h-14 bg-primary/10 text-primary rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                    >
                        <MessageCircle size={18} /> {t('activeJobs.chat')}
                    </motion.button>
                </div>
            </div>

            {/* Completion Button */}
            <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-emerald-500 text-white rounded-[24px] font-black text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3"
            >
                <CheckCircle size={20} />
                {t('activeJobs.finish')}
            </motion.button>
          </motion.div>
        ))}

        {jobs.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-[var(--bg-color)] rounded-[48px] border-2 border-dashed border-[var(--border-color)]">
             <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <AlertCircle size={32} className="text-slate-300" />
             </div>
             <p className="text-sm font-bold text-[var(--text-secondary)] opacity-40">
                {t('activeJobs.noneFound')}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveJobs;

