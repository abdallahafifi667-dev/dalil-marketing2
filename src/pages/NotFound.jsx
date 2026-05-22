import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.notFoundTitle'),
    "description": t('seo.notFoundDesc'),
    "url": "https://dalil-marketing.vercel.app/404"
  };

  return (
    <>
      <SEO
        title={t('seo.notFoundTitle')}
        description={t('seo.notFoundDesc')}
        url="https://dalil-marketing.vercel.app/404"
        type="website"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
            <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-blue-600 to-teal-500 rounded-[3rem] flex items-center justify-center shadow-2xl">
              <AlertCircle size={64} className="text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-8xl md:text-9xl font-black text-[var(--text-primary)]">
              404
            </h1>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)]">
              {t('notFound.title')}
            </h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
              {t('notFound.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              <Home size={24} />
              {t('notFound.home')}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto h-16 px-10 bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              <Search size={24} />
              {t('notFound.back')}
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
