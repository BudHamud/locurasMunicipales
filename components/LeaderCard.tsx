"use client";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
}

interface LeaderCardProps {
  name: string;
  title: string;
  career: string;
  stats: Stat[];
  onSelect?: () => void;
  isSelected?: boolean;
}

export default function LeaderCard({
  name,
  title,
  career,
  stats,
  onSelect,
  isSelected,
}: LeaderCardProps) {
  const maxValue = Math.max(...stats.map(s => s.value));

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -5 }}
      className={`relative bg-white border-[6px] rounded-[3.5rem] p-4 md:p-8 flex flex-col gap-6 min-h-[450px] transition-all cursor-pointer
        ${isSelected
          ? "border-arg-gold shadow-[15px_15px_0px_#F6B40E] ring-8 ring-arg-gold/30"
          : "border-arg-darkblue shadow-[15px_15px_0px_rgba(0,0,0,0.1)]"}
      `}
    >
      {/* 1. HEADER: 100% ANCHO */}
      <div className="w-full text-center border-b-4 border-slate-100 pb-4">
        <h3 className="font-black text-2xl text-arg-darkblue uppercase tracking-tighter leading-none mb-2">
          {name}
        </h3>
        <span className={`inline-block text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] transition-colors
          ${isSelected ? "bg-arg-gold text-white" : "bg-arg-darkblue text-white"}`}>
          {title}
        </span>
      </div>

      {/* 2. CONTENIDO INFERIOR */}
      <div className="flex flex-col md:flex-row gap-8 flex-1">

        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col w-full md:w-56 shrink-0 items-center justify-between">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            {/* Anillo de Giro - Ahora cambia a arg-gold */}
            <div className={`absolute inset-0 rounded-full border-4 border-dashed transition-colors
              ${isSelected ? "border-arg-gold animate-spin-slow" : "border-arg-lightblue/20"}`}
            />
            {/* Borde del circulo del avatar - Ahora cambia a arg-gold */}
            <div className={`absolute inset-2 bg-slate-50 border-4 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-inner z-10 transition-colors
              ${isSelected ? "border-arg-gold" : "border-arg-darkblue"}`}>
              👤
            </div>
          </div>

          <div className={`relative border-2 rounded-2xl p-4 w-full transition-colors mt-4
            ${isSelected ? "bg-arg-gold/10 border-arg-gold" : "bg-slate-50 border-arg-darkblue/20"}`}>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap
              ${isSelected ? "bg-arg-gold text-white" : "bg-arg-darkblue text-white"}`}>
              CV REVISADO
            </div>
            <p className="text-[11px] font-bold text-arg-darkblue/70 leading-tight italic text-center mt-2 md:mt-0">
              {career}
            </p>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col flex-grow justify-between py-1">
          <div className="grid grid-cols-1 gap-3">
            {stats.map((stat, i) => {
              const isHighest = stat.value === maxValue;
              const useGold = isSelected || isHighest;
              return (
                <div key={i} className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-1 px-1">
                    <span className="text-arg-darkblue opacity-60">{stat.label}</span>
                    <span className={useGold ? "text-arg-gold" : "text-arg-lightblue"}>
                      {stat.value * 10}%
                    </span>
                  </div>
                  <div className="w-full bg-white h-3 rounded-full border-2 border-arg-darkblue overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value * 10}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full transition-colors ${useGold ? "bg-arg-gold" : "bg-arg-lightblue"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className={`w-full font-black py-4 rounded-2xl border-[3px] transition-all uppercase text-sm tracking-widest mt-6
              ${isSelected
                ? "bg-white border-arg-gold text-arg-darkblue shadow-[6px_6px_0px_#F6B40E]"
                : "bg-arg-gold border-arg-darkblue text-arg-darkblue shadow-[6px_6px_0px_#00355E] hover:bg-white"}
              active:shadow-none active:translate-x-1 active:translate-y-1`}
          >
            {isSelected ? "SELECCIONADO" : "¡LO QUIERO!"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}