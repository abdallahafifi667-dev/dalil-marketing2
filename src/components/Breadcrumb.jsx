import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const { t } = useTranslation();

  const generateBreadcrumbSchema = () => {
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('breadcrumb.home'),
          "item": "https://dalil-marketing.vercel.app/"
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.name,
          "item": item.url ? `https://dalil-marketing.vercel.app${item.url}` : undefined
        }))
      ]
    };
    return breadcrumbList;
  };

  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <nav 
        aria-label="breadcrumb" 
        className={`flex items-center gap-2 py-4 px-6 ${isRtl ? 'flex-row-reverse' : ''}`}
      >
        <ol className={`flex items-center gap-2 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-primary transition-colors font-medium"
            >
              <Home size={16} />
              <span>{t('breadcrumb.home')}</span>
            </Link>
          </li>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="text-[var(--text-secondary)] opacity-50">/</li>
              <li>
                {item.url ? (
                  <Link 
                    to={item.url} 
                    className="text-[var(--text-secondary)] hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-[var(--text-primary)] font-bold">
                    {item.name}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
