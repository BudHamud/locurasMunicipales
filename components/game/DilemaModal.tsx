"use client";
import { motion } from "framer-motion";

export default function DilemaModal({ dilema, onOptionSelect }: any) {
  if (!dilema) return null;

  {/* Zona Central (Mapa) */}
        // <section className="flex-1 bg-gradient-to-br from-black/20 to-transparent rounded-[3rem] relative border border-white/5">
        //   <DilemaModal 
        //     dilema={activeDilema} 
        //     onOptionSelect={handleDecision} 
        //   />
        // </section>

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0, scale: 0.9 }} 
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#1A2326] border-2 border-yellow-500/50 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50"
    >
      <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-4">
        <span className="animate-pulse">⚠️</span> Dilema Político Urgente
      </div>

      <div className="flex gap-6 mb-8">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl border border-white/5 shadow-inner">
          {dilema.icon}
        </div>
        <div>
          <h3 className="text-xl font-black mb-2 text-white">{dilema.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{dilema.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {dilema.options.map((opt: any, i: number) => (
          <button 
            key={i}
            onClick={() => onOptionSelect(opt.effects)}
            className="group relative bg-slate-800/50 hover:bg-blue-600 p-4 rounded-3xl text-left border border-white/10 transition-all active:scale-95"
          >
            <h4 className="font-black text-xs uppercase mb-1 text-white group-hover:text-white">{opt.text}</h4>
            <p className="text-[9px] text-blue-400 font-bold group-hover:text-blue-100 italic">
              {opt.flavorEffect}
            </p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}