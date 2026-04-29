import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { demoData } from '../data';
import { ChevronLeft, MapPin, DollarSign, Calendar, FileText, Plus, Trash2, Zap } from 'lucide-react';

const CreateRequest = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const { crafts } = demoData;

    // Check for pre-filled state from Craftsman Profile
    const prefilledCraft = location.state?.prefilledCraft || '';
    
    const [formData, setFormData] = useState({
        craft: prefilledCraft,
        title: '',
        description: '',
        budget: '',
        date: '',
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

    const handleSubmit = () => {
        if (!formData.craft || !formData.title || !formData.description) {
            alert(t('request.fillRequired'));
            return;
        }
        
        const orderId = `ord_${Math.random().toString(36).substr(2, 9)}`;
        const newOrder = {
            id: orderId,
            ...formData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Save to local storage for demo
        const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
        orders.unshift(newOrder);
        localStorage.setItem('demo_orders', JSON.stringify(orders));
        
        // Trigger simulation
        import('../utils/simulation').then(({ startOrderSimulation }) => {
            startOrderSimulation(orderId, formData.craft);
        });

        navigate('/payment');
    };

    return (
        <div className="page-container with-nav-padding pt-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[130px] rounded-full -mr-40 -mt-40 -z-10" />
            <div className="absolute bottom-40 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -ml-32 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-primary/5 blur-[150px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col space-y-8 flex-1 min-h-0 w-full relative z-10"
            >
                <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
                        {t('request.newTitle')}
                    </h2>
                    <p className="text-[var(--text-secondary)] font-bold text-sm">
                        {t('request.newDesc')}
                    </p>
                </div>

                {/* Craft Selection - Premium Grid */}
                <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-4">
                    <label className="block text-xs font-black text-primary uppercase tracking-[0.2em] px-2">
                        {t('request.step1')}
                        <span className="text-red-500 ms-1">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                        {crafts.map((craft) => (
                            <motion.button
                                key={craft.id}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCraftChange(craft.id)}
                                className={`p-3 aspect-square rounded-[24px] border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.craft === craft.id
                                    ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'border-[var(--border-color)] bg-[var(--bg-color)]'
                                    }`}
                            >
                                <img 
                                    src={craft.image} 
                                    alt={craft.nameEn} 
                                    className={`w-8 h-8 object-contain transition-all ${formData.craft === craft.id ? 'brightness-0 invert' : ''}`} 
                                />
                                <span className={`text-[9px] font-black text-center leading-tight ${formData.craft === craft.id ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                                    {lang === 'ar' ? craft.nameAr : craft.nameEn}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Main Details Card */}
                <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-6">
                    <label className="block text-xs font-black text-primary uppercase tracking-[0.2em] px-2">
                        {t('request.step2')}
                    </label>
                    
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2">
                            {t('request.title')}
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder={t('request.titlePlaceholder')}
                            className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 outline-none font-bold text-base shadow-sm transition-all text-[var(--text-primary)]"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2">
                            {t('request.description')}
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder={t('request.descPlaceholder')}
                            className="w-full h-32 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 py-4 outline-none font-bold text-base shadow-sm transition-all text-[var(--text-primary)] resize-none"
                        />
                    </div>
                </div>

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-6">
                        {/* Budget */}
                        <div className="space-y-2">
                             <label className="text-xs font-black text-primary uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                <DollarSign size={16} />
                                {t('request.step3')}
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="flex-1 h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 outline-none font-black text-xl shadow-sm transition-all text-[var(--text-primary)]"
                                />
                                <div className="h-14 bg-primary text-white px-6 rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-primary/20">
                                    {t('account.currency')}
                                </div>
                            </div>
                        </div>

                        {/* Date & Location Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5">
                                    <Calendar size={12} /> {t('request.date')}
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-4 outline-none font-bold text-xs shadow-sm transition-all text-[var(--text-primary)]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest px-2 flex items-center gap-1.5">
                                    <MapPin size={12} /> {t('request.location')}
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder={t('request.locationPlaceholder')}
                                    className="w-full h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-4 outline-none font-bold text-xs shadow-sm transition-all text-[var(--text-primary)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="bg-[var(--surface-color)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm space-y-4">
                        <label className="text-xs font-black text-primary uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                            <FileText size={16} />
                            {t('request.step4')}
                        </label>
                        
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                                placeholder={t('request.reqPlaceholder')}
                                className="flex-1 h-14 bg-[var(--bg-color)] border-2 border-transparent focus:border-primary/20 rounded-2xl px-6 outline-none font-bold text-sm shadow-sm transition-all text-[var(--text-primary)]"
                            />
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={addRequirement}
                                className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20"
                            >
                                <Plus size={24} />
                            </motion.button>
                        </div>

                        {/* Requirements List */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {formData.requirements.map((req, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] group"
                                >
                                    <span className="text-xs font-bold text-[var(--text-primary)]">{req}</span>
                                    <button
                                        onClick={() => removeRequirement(index)}
                                        className="text-red-500 opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 pb-12">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="w-full h-16 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                        {t('request.submit')}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateRequest;
