import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { ChevronLeft, MapPin, DollarSign, Calendar, FileText, Plus, Trash2, Zap, Clock, User } from 'lucide-react';

const CreateRequest = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const { crafts, craftsmen } = demoData;

    // Check for pre-filled state
    const prefilledCraft = location.state?.prefilledCraft || '';
    const craftsmanId = location.state?.craftsmanId || null;
    const selectedCraftsman = useMemo(() => 
        craftsmanId ? craftsmen.find(m => m.id === craftsmanId) : null
    , [craftsmanId, craftsmen]);
    
    const [formData, setFormData] = useState({
        craft: prefilledCraft,
        title: '',
        description: '',
        budget: '',
        date: '',
        timeHours: '12',
        timeMinutes: '00',
        location: '',
        requirements: [],
    });

    const [newRequirement, setNewRequirement] = useState('');

    const handleCraftChange = (craftId) => {
        setFormData({ ...formData, craft: craftId });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addRequirement = () => {
        if (newRequirement.trim()) {
            setFormData({
                ...formData,
                requirements: [...formData.requirements, newRequirement],
            });
            setNewRequirement('');
        }
    };

    const removeRequirement = (index) => {
        setFormData({
            ...formData,
            requirements: formData.requirements.filter((_, i) => i !== index),
        });
    };

    const [isBroadcasting, setIsBroadcasting] = useState(false);

    const handleSubmit = () => {
        if (!formData.craft || !formData.title || !formData.description) {
            alert(t('request.fillRequired'));
            return;
        }
        
        setIsBroadcasting(true);
        
        // Simulate broadcasting delay for "Life" effect
        setTimeout(() => {
            const orderId = `ord_${Math.random().toString(36).substr(2, 9)}`;
            const newOrder = {
                id: orderId,
                ...formData,
                clientId: 'u1', // Associate with demo user
                status: 'pending',
                date: lang === 'ar' ? 'اليوم' : 'Today',
                createdAt: new Date().toISOString(),
                craftsmanId: craftsmanId,
                totalPrice: formData.budget || '0'
            };
            
            // Save to local storage
            const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
            orders.unshift(newOrder);
            localStorage.setItem('demo_orders', JSON.stringify(orders));

            // Start simulation of experts applying
            import('../utils/simulation').then(({ startOrderSimulation }) => {
                startOrderSimulation(orderId, formData.craft);
            });
            
            navigate('/payment');
        }, 2500);
    };

    return (
        <div className="page-container with-nav-padding pt-6 relative overflow-hidden">
            <AnimatePresence>
                {isBroadcasting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center text-center px-10"
                    >
                        <div className="relative mb-10">
                            <motion.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-primary/30 rounded-full blur-2xl"
                            />
                            <div className="w-32 h-32 bg-primary rounded-[40px] flex items-center justify-center text-white relative z-10 shadow-2xl shadow-primary/40">
                                <Zap size={48} fill="white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{lang === 'ar' ? 'جاري النشر للحرفيين...' : 'Broadcasting to experts...'}</h3>
                        <p className="text-slate-400 font-bold text-sm max-w-xs">{lang === 'ar' ? 'نقوم الآن بإرسال طلبك لأقرب الحرفيين المتاحين في منطقتك' : 'We are sending your request to the nearest available experts in your area'}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col space-y-6 flex-1 min-h-0 w-full relative z-10"
            >
                {/* Header Section */}
                <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
                        {t('request.newTitle')}
                    </h2>
                    <p className="text-[var(--text-secondary)] font-bold text-sm opacity-60">
                        {t('request.newDesc')}
                    </p>
                </div>

                {/* Craftsman Preview (If selected) */}
                {selectedCraftsman && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary/5 border-2 border-primary/20 p-5 rounded-[32px] flex items-center gap-5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl shrink-0 relative z-10">
                            <img src={selectedCraftsman.image} alt={selectedCraftsman.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{t('craftsmen.bookingWith') || 'حجز مع'}</p>
                            <h4 className="text-xl font-black text-[var(--text-primary)] truncate">{selectedCraftsman.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary font-black text-[9px] uppercase rounded-md">
                                    {crafts.find(c => c.id === selectedCraftsman.craftId)?.[lang === 'ar' ? 'nameAr' : 'nameEn']}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 1: Craft Selection (Only if not pre-filled) */}
                {!selectedCraftsman && (
                    <div className="bg-[var(--surface-color)] p-5 rounded-[32px] border border-[var(--border-color)] shadow-sm space-y-4">
                        <label className="block text-xs font-black text-primary uppercase tracking-[0.2em] px-1">
                            {t('request.step1')}
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                            {crafts.map((craft) => (
                                <motion.button
                                    key={craft.id}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleCraftChange(craft.id)}
                                    className={`shrink-0 w-24 h-24 rounded-[24px] border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.craft === craft.id
                                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'border-[var(--border-color)] bg-[var(--bg-color)]'
                                        }`}
                                >
                                    <img 
                                        src={craft.image} 
                                        alt={craft.nameEn} 
                                        className={`w-8 h-8 object-contain ${formData.craft === craft.id ? 'brightness-0 invert' : ''}`} 
                                    />
                                    <span className={`text-[9px] font-black text-center leading-tight ${formData.craft === craft.id ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                                        {lang === 'ar' ? craft.nameAr : craft.nameEn}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Main Details */}
                <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-5">
                    <label className="block text-xs font-black text-primary uppercase tracking-[0.2em] px-1">
                        {t('request.step2')}
                    </label>
                    
                    <div className="space-y-4">
                        <div className="relative group">
                            <User size={18} className="absolute start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder={t('request.titlePlaceholder')}
                                className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl ps-14 pe-6 outline-none font-bold text-base shadow-sm transition-all text-[var(--text-primary)]"
                            />
                        </div>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder={t('request.descPlaceholder')}
                            className="w-full h-32 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-3xl px-6 py-4 outline-none font-bold text-base shadow-sm transition-all text-[var(--text-primary)] resize-none"
                        />
                    </div>
                </div>

                {/* Step 3: Schedule & Budget */}
                <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-6">
                    <label className="block text-xs font-black text-primary uppercase tracking-[0.2em] px-1">
                        {t('request.step3')}
                    </label>

                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5 opacity-60">
                            <Calendar size={12} /> {t('request.date')}
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 outline-none font-black text-base shadow-sm transition-all text-[var(--text-primary)]"
                        />
                    </div>

                    {/* Improved Time Picker - Numeric Friendly */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5 opacity-60">
                            <Clock size={12} /> {t('request.time') || 'الوقت'}
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative group">
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    name="timeHours"
                                    value={formData.timeHours}
                                    onChange={handleInputChange}
                                    inputMode="numeric"
                                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-4 outline-none font-black text-xl text-center shadow-sm transition-all text-[var(--text-primary)]"
                                />
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-white dark:bg-slate-900 text-[8px] font-black text-slate-400 uppercase rounded-full border border-slate-100 dark:border-slate-800">HR</span>
                            </div>
                            <span className="font-black text-2xl text-slate-300">:</span>
                            <div className="flex-1 relative group">
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    name="timeMinutes"
                                    value={formData.timeMinutes}
                                    onChange={handleInputChange}
                                    inputMode="numeric"
                                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-4 outline-none font-black text-xl text-center shadow-sm transition-all text-[var(--text-primary)]"
                                />
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-white dark:bg-slate-900 text-[8px] font-black text-slate-400 uppercase rounded-full border border-slate-100 dark:border-slate-800">MIN</span>
                            </div>
                            <div className="flex h-14 bg-[var(--bg-color)] rounded-2xl p-1 border border-[var(--border-color)]">
                                <button type="button" className="flex-1 px-4 rounded-xl font-black text-[10px] bg-primary text-white shadow-sm">AM</button>
                                <button type="button" className="flex-1 px-4 rounded-xl font-black text-[10px] text-slate-400">PM</button>
                            </div>
                        </div>
                    </div>

                    {/* Location & Budget Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5 opacity-60">
                                <MapPin size={12} /> {t('request.location')}
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="..."
                                className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-5 outline-none font-bold text-sm shadow-sm transition-all text-[var(--text-primary)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5 opacity-60">
                                <DollarSign size={12} /> {t('request.budget')}
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                inputMode="numeric"
                                placeholder="0"
                                className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-5 outline-none font-black text-xl shadow-sm transition-all text-[var(--text-primary)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4 pb-12">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="w-full h-18 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                        <Zap size={22} fill="white" />
                        {t('request.submit')}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateRequest;
