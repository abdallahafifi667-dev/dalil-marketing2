import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Send, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const scrollRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const chat = demoData.chats.find(c => c.id === id);
  const partnerId = chat?.participants.find(p => p !== demoData.user.id);
  const partner = demoData.users.find(u => u.id === partnerId) || demoData.craftsmen.find(m => m.id === partnerId);

  // Initialize messages from localStorage or demoData
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`chat_messages_${id}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: chat?.lastMessage || t('chat.welcome') || "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Polling for simulated messages
  useEffect(() => {
    const pollInterval = setInterval(() => {
      const saved = localStorage.getItem(`chat_messages_${id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > messages.length) {
          setMessages(parsed);
        }
      }
    }, 2000);
    return () => clearInterval(pollInterval);
  }, [id, messages.length]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, id]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputText('');

    // Auto-reply logic
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const replies = [
          t('chat.replies.ok') || "تمام، جاري العمل على طلبك",
          t('chat.replies.working') || "سأكون هناك في الموعد المحدد",
          t('chat.replies.gotIt') || "فهمت التفاصيل، شكراً لك",
          t('chat.replies.welcome') || "أهلاً بك في أي وقت"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const replyMsg = {
          id: Date.now() + 1,
          text: randomReply,
          sender: 'partner',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, replyMsg]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const clearChat = () => {
    const initialMsg = [{ id: 1, text: t('chat.welcome') || "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }];
    setMessages(initialMsg);
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(initialMsg));
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-color)] overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full -ml-24 -z-10" />

      {/* Fixed Header with Partner Info */}
      <div className="h-24 glass border-b border-white/5 z-[1001] flex items-center px-4 gap-4 shrink-0 relative">
        <div className="w-full flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ms-2 text-[var(--text-secondary)] hover:text-primary transition-colors">
            <ChevronLeft size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img 
                src={partner?.image || `https://ui-avatars.com/api/?name=${partner?.name || 'U'}&background=random`} 
                className="w-12 h-12 rounded-[18px] object-cover border-2 border-[var(--surface-color)] shadow-sm" 
                alt={partner?.name} 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[var(--surface-color)] shadow-sm" />
            </div>
            <div className="min-w-0">
              <h4 className="font-black text-[var(--text-primary)] text-base truncate">{partner?.name}</h4>
              <p className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                {partner?.online !== false ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {t('chat.online') || 'متصل الآن'}
                  </>
                ) : (
                  <span className="text-[var(--text-secondary)] opacity-60">
                    {t('chat.activeAgo')}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setShowMenu(!showMenu)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${showMenu ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-[var(--surface-color)] text-[var(--text-primary)] border-[var(--border-color)] shadow-sm hover:border-primary/30'}`}
            >
              <MoreVertical size={20} />
            </motion.button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-14 end-0 w-48 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                   <button 
                    onClick={clearChat}
                    className="w-full text-start px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
                   >
                     <span>{t('chat.clear') || 'مسح الدردشة'}</span>
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 space-y-6 scroll-smooth py-6 scrollbar-hide"
      >
        <div className="w-full flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-5 py-3 rounded-[32px] shadow-sm relative group ${msg.sender === 'me' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-[var(--surface-color)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none'
                }`}>
                <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                <span className={`text-[8px] font-black uppercase tracking-widest mt-1.5 block opacity-40 ${msg.sender === 'me' ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                  {msg.time}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-[var(--surface-color)] p-5 rounded-[28px] rounded-bl-none border border-[var(--border-color)] shadow-sm">
                <div className="flex gap-1.5">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area - Compact & Fixed */}
      <div className="px-4 py-4 glass border-t border-[var(--border-color)] shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-3 w-full">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="w-12 h-12 bg-[var(--surface-color)] text-[var(--text-secondary)] rounded-2xl flex items-center justify-center border border-[var(--border-color)] hover:text-primary transition-all shrink-0 shadow-sm"
          >
            <ImageIcon size={22} />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chat.typeMessage') || 'اكتب رسالتك هنا...'}
              className="w-full h-14 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-[24px] ps-5 pe-12 outline-none focus:border-primary/50 font-bold text-sm text-[var(--text-primary)] transition-all shadow-inner"
            />
            <button type="button" className="absolute end-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-primary transition-colors"><Smile size={20} /></button>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-14 h-14 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-primary/30 hover:opacity-90 transition-all shrink-0"
          >
            <Send size={22} className={lang === 'ar' ? 'rotate-180' : ''} />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;

