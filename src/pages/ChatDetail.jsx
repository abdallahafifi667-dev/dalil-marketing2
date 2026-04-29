import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { demoData } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Send, Phone, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';

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
      { id: 1, text: chat?.lastMessage || "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    const initialMsg = [{ id: 1, text: "مرحباً! كيف يمكنني مساعدتك؟", sender: 'partner', time: '10:00 AM' }];
    setMessages(initialMsg);
    localStorage.setItem(`chat_messages_${id}`, JSON.stringify(initialMsg));
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full -ml-24 -z-10" />

      {/* Fixed Header with Partner Info */}
      <div className="h-24 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 z-[1001] flex items-center px-6 gap-4 shrink-0 relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10"
        >
          <ChevronLeft size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
        </motion.button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img src={partner?.image} className="w-11 h-11 rounded-xl object-cover border border-white/10" alt={partner?.name} />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-white text-base truncate">{partner?.name}</h4>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{t('chat.online') || 'متصل الآن'}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setShowMenu(!showMenu)}
              className={`w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-colors ${showMenu ? 'text-primary' : 'text-white/60'}`}
            >
              <MoreVertical size={18} />
            </motion.button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-14 end-0 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
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
        className="flex-1 overflow-y-auto px-6 space-y-6 scroll-smooth py-6 scrollbar-hide"
      >
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-[28px] text-sm font-bold shadow-sm relative ${msg.sender === 'me'
                  ? 'bg-primary text-white rounded-br-none shadow-primary/20'
                  : 'bg-white/5 text-white rounded-bl-none border border-white/10 backdrop-blur-md'
                }`}>
                {msg.text}
                <div className={`text-[8px] mt-2 flex items-center gap-1 ${msg.sender === 'me' ? 'justify-end opacity-70' : 'justify-start opacity-40'}`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 p-5 rounded-[28px] rounded-bl-none border border-white/10">
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
      <div className="px-6 py-4 bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-3 max-w-lg mx-auto">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="w-12 h-12 bg-white/5 text-white/40 rounded-2xl flex items-center justify-center border border-white/10 hover:text-primary transition-colors shrink-0"
          >
            <ImageIcon size={22} />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chat.typeMessage') || 'اكتب رسالتك هنا...'}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-[24px] ps-5 pe-12 outline-none focus:border-primary/50 font-bold text-sm text-white transition-all shadow-inner"
            />
            <button type="button" className="absolute end-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-primary transition-colors"><Smile size={20} /></button>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-14 h-14 bg-primary text-white rounded-[22px] flex items-center justify-center shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all shrink-0"
          >
            <Send size={22} className={lang === 'ar' ? 'rotate-180' : ''} />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
