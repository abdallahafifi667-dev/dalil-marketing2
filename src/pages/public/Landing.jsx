import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Smartphone, 
  Heart, 
  CheckCircle,
  Star
} from 'lucide-react';

const Landing = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const isRtl = lang === 'ar';

  const galleryImages = [
    "WhatsApp Image 2026-05-03 at 12.48.44 AM (1).jpeg",
    "WhatsApp Image 2026-05-03 at 12.48.44 AM (2).jpeg",
    "WhatsApp Image 2026-05-03 at 12.48.44 AM (3).jpeg",
    "WhatsApp Image 2026-05-03 at 12.48.44 AM.jpeg",
    "WhatsApp Image 2026-05-03 at 12.48.45 AM (1).jpeg",
    "WhatsApp Image 2026-05-03 at 12.48.45 AM (2).jpeg"
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -ml-40 -mb-40" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center lg:text-start space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
            >
              <Sparkles size={16} className="text-teal-300" />
              <span className="text-xs font-black uppercase tracking-widest">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
              >
                {t('hero.cta')}
                <ArrowRight size={24} className={isRtl ? 'rotate-180' : ''} />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="w-full sm:w-auto h-16 px-10 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg backdrop-blur-sm"
              >
                {t('nav.about')}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl border-8 border-white/10">
              <img 
                src="/WhatsApp Image 2026-05-03 at 12.48.46 AM.jpeg" 
                alt="دليل الحرفيين" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-24 px-6 bg-[var(--bg-color)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight">
              {t('home.app.title')}
            </h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed">
              {t('home.app.subtitle')}
            </p>
            <ul className="space-y-6">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-teal-400">
                    <CheckCircle size={24} />
                  </div>
                  <span className="text-lg font-bold text-[var(--text-primary)]">{t(`home.app.feature${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <img 
              src="/home.png" 
              alt="App Preview" 
              className="rounded-[3rem] shadow-2xl border-4 border-[var(--border-color)]"
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6">{t('home.stats.title')}</h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto">{t('home.stats.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'speed', icon: <Smartphone />, color: 'bg-blue-100 text-blue-600' },
              { key: 'verified', icon: <Shield />, color: 'bg-teal-100 text-teal-600' },
              { key: 'quality', icon: <Heart />, color: 'bg-purple-100 text-purple-600' }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-[var(--surface-color)] rounded-[3rem] shadow-xl border border-[var(--border-color)] space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)]">{t(`home.features.items.${f.key}.title`)}</h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                  {t(`home.features.items.${f.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[var(--bg-color)]">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">{t('home.faq.title')}</h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium">{t('home.faq.subtitle')}</p>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-3xl bg-[var(--surface-color)] border border-[var(--border-color)]">
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {t(`home.faq.q${i}`)}
                </h3>
                <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
                  {t(`home.faq.a${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]">{t('home.gallery.title')}</h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium">{t('home.gallery.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-[var(--border-color)]"
              >
                <img src={`/${img}`} alt={t('home.gallery.alt')} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Testimonials Style */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[var(--surface-color)] rounded-[3rem] p-12 md:p-20 shadow-2xl border border-[var(--border-color)] text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-8 leading-tight">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed font-medium mb-12">
              {t('home.testimonials.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              {['transparency', 'security', 'growth'].map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-3xl font-black text-primary mb-1">0{i+1}</div>
                  <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-40">
                    {t(`home.cta.values.${v}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
