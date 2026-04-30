import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  DollarSign,
  ChevronRight,
  Bell
} from 'lucide-react';

const CraftsmanDashboard = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const craftsman = demoData.user; // Use the actual logged-in user
  
  const stats = [
    { label: 'إجمالي الأرباح', labelEn: 'Total Earnings', value: craftsman.balance?.toLocaleString() || '0', icon: <DollarSign size={20} />, color: 'bg-emerald-500' },
    { label: 'طلبات مكتملة', labelEn: 'Jobs Done', value: craftsman.completedOrders || '0', icon: <CheckCircle2 size={20} />, color: 'bg-blue-500' },
    { label: 'التقييم العام', labelEn: 'Rating', value: craftsman.rating || '5.0', icon: <Zap size={20} />, color: 'bg-amber-500' },
  ];

  // Simulation of live market requests based on local state
  const [liveRequests] = useState([
    { id: 'lr1', title: 'تحتاج سباك فوراً - تسريب مياه', titleEn: 'Need Plumber - Water Leak', distance: '0.8 km', budget: '150', time: '2 mins ago' },
    { id: 'lr2', title: 'تركيب دش كامل في الحمام', titleEn: 'Full Shower Installation', distance: '2.1 km', budget: '450', time: '15 mins ago' },
    { id: 'lr3', title: 'صيانة صرف صحي للمطبخ', titleEn: 'Kitchen Drainage Maintenance', distance: '1.5 km', budget: '200', time: '30 mins ago' },
  ]);

  return (
    <div className="page-container with-nav-padding pt-8 space-y-8 overflow-x-hidden">
      {/* Header Profile Section */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[24px] border-4 border-primary/20 p-1">
             <img src={craftsman.image} className="w-full h-full rounded-[18px] object-cover" alt="Profile" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-[var(--text-primary)]">{craftsman.name}</h2>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">متصل الآن</span>
            </div>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-[var(--surface-color)] rounded-2xl flex items-center justify-center border border-[var(--border-color)] text-[var(--text-secondary)] relative">
          <Bell size={22} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-color)]" />
        </motion.button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-3 px-1">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[var(--surface-color)] p-4 rounded-[28px] border border-[var(--border-color)] flex flex-col items-center justify-center space-y-2 group hover:border-primary/30 transition-all">
            <div className={`${stat.color} text-white p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-center">
              <span className="block text-lg font-black text-[var(--text-primary)]">{stat.value}</span>
              <span className="block text-[8px] font-black text-[var(--text-secondary)] opacity-60 uppercase tracking-tighter">
                {lang === 'ar' ? stat.label : stat.labelEn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Market Section */}
      <section className="space-y-4 px-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">الطلبات المتاحة (سماعي)</h3>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black">2 جديد</span>
        </div>
        
        <div className="space-y-4">
          {liveRequests.map((order) => (
            <motion.div
              key={order.id}
              whileTap={{ scale: 0.98 }}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] p-5 rounded-[32px] space-y-4 relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-black text-base text-[var(--text-primary)] group-hover:text-primary transition-colors">
                    {lang === 'ar' ? order.title : order.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] opacity-60 font-bold">
                    <Clock size={12} /> {order.time}
                    <span className="w-1 h-1 bg-[var(--border-color)] rounded-full" />
                    <span>{order.distance}</span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full font-black text-xs">
                  {order.budget} {t('account.currency')}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 h-12 bg-primary text-white rounded-2xl font-black text-xs shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  تقديم عرض الآن
                </button>
                 <button className="w-12 h-12 bg-[var(--bg-color)] text-[var(--text-secondary)] opacity-60 rounded-2xl flex items-center justify-center border border-[var(--border-color)] hover:opacity-100 hover:text-primary transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance Graph Placeholder */}
      <section className="bg-gradient-to-br from-primary to-indigo-600 p-6 rounded-[40px] text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-center">
             <div>
               <h4 className="font-black text-lg">أداء الأسبوع</h4>
               <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">نمو بنسبة +12%</p>
             </div>
             <TrendingUp size={32} className="opacity-50" />
          </div>
          <div className="h-16 flex items-end gap-1.5">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-white/20 rounded-t-lg border-t border-white/30"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Options */}
      <div className="space-y-3 px-1 pb-10">
        {[
          { label: 'سجل العروض المقدمة', icon: <Clock size={20} /> },
          { label: 'إحصائيات الأرباح بالتفصيل', icon: <TrendingUp size={20} /> },
          { label: 'تعديل الملف المهني', icon: <Zap size={20} /> },
        ].map((item, i) => (
          <button key={i} className="w-full h-16 bg-[var(--surface-color)] rounded-3xl border border-[var(--border-color)] px-6 flex justify-between items-center group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-[var(--bg-color)] text-[var(--text-secondary)] opacity-60 group-hover:opacity-100 group-hover:text-primary rounded-xl flex items-center justify-center transition-colors">
                 {item.icon}
               </div>
               <span className="font-black text-sm text-[var(--text-primary)]">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CraftsmanDashboard;
