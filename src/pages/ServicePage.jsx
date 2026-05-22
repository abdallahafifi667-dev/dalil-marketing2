import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Phone, MapPin, Wrench, CheckCircle, Star, ChevronRight, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { services, cities } from '../data/seoData';
import { useLanguage } from '../context/LanguageContext';

const ServicePage = () => {
  const { serviceSlug, citySlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  const currentServices = services[lang] || services.ar;
  const currentCities = cities[lang] || cities.ar;

  const service = currentServices.find(s => s.slug === serviceSlug || s.id === serviceSlug);
  const city = currentCities.find(c => c.slug === citySlug || c.id === citySlug);

  if (!service) {
    navigate('/404');
    return null;
  }

  const pageTitle = city 
    ? `${service.name} ${lang === 'ar' ? 'في' : 'in'} ${city.name} | Dalil Al-Harafeen`
    : `${service.name} | Dalil Al-Harafeen`;

  const pageDescription = city
    ? (lang === 'ar' 
      ? `ابحث عن أفضل ${service.name} في ${city.name}. ${service.description} احصل على عروض من الحرفيين الموثقين في منطقتك.`
      : `Find the best ${service.name} in ${city.name}. ${service.description} Get quotes from verified craftsmen in your area.`)
    : (lang === 'ar'
      ? `ابحث عن أفضل ${service.name} في مصر. ${service.description} احصل على عروض من الحرفيين الموثقين.`
      : `Find the best ${service.name} in Egypt. ${service.description} Get quotes from verified craftsmen.`);

  const pageKeywords = [
    service.name,
    ...service.alternateNames,
    city ? `${service.name} ${lang === 'ar' ? 'في' : 'in'} ${city.name}` : '',
    city ? city.neighborhoods.map(n => `${service.name} ${lang === 'ar' ? 'في' : 'in'} ${n}`) : [],
    lang === 'ar' ? 'أفضل حرفيين' : 'Best craftsmen',
    lang === 'ar' ? 'مصر' : 'Egypt',
    'Dalil Al-Harafeen'
  ].filter(Boolean).join(', ');

  const canonicalUrl = city
    ? `https://dalil-marketing.vercel.app/services/${service.slug}/${city.slug}`
    : `https://dalil-marketing.vercel.app/services/${service.slug}`;

  const organizationName = lang === 'ar' ? 'دليل الحرفيين' : 'Dalil Al-Harafeen';
  const countryName = lang === 'ar' ? 'مصر' : 'Egypt';
  const servicesLabel = lang === 'ar' ? 'الخدمات' : 'Services';
  const homeLabel = lang === 'ar' ? 'الرئيسية' : 'Home';

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": service.name,
        "alternateName": service.alternateNames,
        "description": pageDescription,
        "provider": {
          "@type": "Organization",
          "name": organizationName,
          "url": "https://dalil-marketing.vercel.app/"
        },
        "areaServed": city ? {
          "@type": "City",
          "name": city.name
        } : {
          "@type": "Country",
          "name": countryName
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": homeLabel,
            "item": "https://dalil-marketing.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": servicesLabel,
            "item": "https://dalil-marketing.vercel.app/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.name,
            "item": `https://dalil-marketing.vercel.app/services/${service.slug}`
          },
          ...(city ? [{
            "@type": "ListItem",
            "position": 4,
            "name": city.name,
            "item": canonicalUrl
          }] : [])
        ]
      }
    ]
  };

  const breadcrumbItems = [
    { name: servicesLabel, url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
    ...(city ? [{ name: city.name }] : [])
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        url={canonicalUrl}
        type="website"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-[var(--bg-color)]">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-full font-bold text-lg">
                <span className="text-2xl">{service.icon}</span>
                <span>{service.name}</span>
                {city && (
                  <>
                    <span className="opacity-50">•</span>
                    <MapPin size={20} />
                    <span>{city.name}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-tight">
                {city 
                  ? (lang === 'ar' ? `أفضل ${service.name} في ${city.name}` : `Best ${service.name} in ${city.name}`)
                  : (lang === 'ar' ? `أفضل ${service.name} في مصر` : `Best ${service.name} in Egypt`)
                }
              </h1>
              
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium max-w-3xl mx-auto">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <button
                  onClick={() => navigate('/register')}
                  className="h-16 px-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <Wrench size={24} />
                  {city 
                    ? (lang === 'ar' ? 'اطلب خدمة الآن' : 'Book Service Now')
                    : (lang === 'ar' ? 'ابحث عن حرفي' : 'Find a Craftsman')
                  }
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="h-16 px-10 bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-black text-lg shadow-xl flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <Phone size={24} />
                  {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              {[
                { 
                  icon: Shield, 
                  title: lang === 'ar' ? 'مضمون 100%' : '100% Guaranteed', 
                  desc: lang === 'ar' ? 'جميع الخدمات محفوظة ومضمونة من قبلنا' : 'All services are protected and guaranteed by us' 
                },
                { 
                  icon: Star, 
                  title: lang === 'ar' ? 'حرفيين موثقين' : 'Verified Craftsmen', 
                  desc: lang === 'ar' ? 'فحص شامل لجميع الحرفيين قبل قبولهم' : 'Comprehensive check for all craftsmen before acceptance' 
                },
                { 
                  icon: CheckCircle, 
                  title: lang === 'ar' ? 'جودة عالية' : 'High Quality', 
                  desc: lang === 'ar' ? 'أعلى معايير الجودة والاحترافية' : 'The highest quality and professional standards' 
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-[var(--surface-color)] rounded-3xl border border-[var(--border-color)] shadow-xl"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-[var(--surface-color)] rounded-3xl p-8 md:p-12 border border-[var(--border-color)]">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-8">
                {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)]"
                  >
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-start gap-3">
                      <span className="text-primary text-2xl">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-medium flex items-start gap-3">
                      <span className="text-green-500 text-2xl">A:</span>
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {city && city.neighborhoods && city.neighborhoods.length > 0 && (
              <div className="bg-[var(--surface-color)] rounded-3xl p-8 md:p-12 border border-[var(--border-color)]">
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-8">
                  {lang === 'ar' 
                    ? `${service.name} في أحياء ${city.name}`
                    : `${service.name} in ${city.name} Neighborhoods`
                  }
                </h2>
                <div className="flex flex-wrap gap-4">
                  {city.neighborhoods.map((neighborhood, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/services/${service.slug}/${city.slug}/${encodeURIComponent(neighborhood)}`)}
                      className="px-6 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl font-bold hover:bg-primary/10 hover:border-primary hover:text-primary transition-all"
                    >
                      {lang === 'ar' 
                        ? `${service.name} في ${neighborhood}`
                        : `${service.name} in ${neighborhood}`
                      }
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-12 pb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-6">
                {lang === 'ar' ? 'جاهز لبدء عملك؟' : 'Ready to start your job?'}
              </h2>
              <p className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                {lang === 'ar' 
                  ? 'اطلب خدمتك الآن واحصل على عروض من أفضل الحرفيين في منطقتك!'
                  : 'Book your service now and get quotes from the best craftsmen in your area!'
                }
              </p>
              <button
                onClick={() => navigate('/register')}
                className="h-16 px-12 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/30 flex items-center gap-3 hover:scale-105 transition-transform mx-auto"
              >
                {lang === 'ar' ? 'ابدأ الآن مجاناً' : 'Start for Free Now'}
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
