import React from 'react';
import { motion } from 'framer-motion';

const Splash = () => {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[9999] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-8 relative z-10"
      >
        <div className="relative">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-10 blur-2xl rounded-full"
            />
            <div className="w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-[56px] flex items-center justify-center shadow-2xl border border-white/10 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <img src="/favicon.png" alt="Logo" className="w-[60%] h-[60%] object-contain drop-shadow-2xl" />
            </div>
        </div>
      </motion.div>

      <div className="absolute bottom-20 w-40 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </div>
  );
};

export default Splash;
