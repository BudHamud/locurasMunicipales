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
  const border = isSelected ? "border-arg-gold" : "border-arg-darkblue";
  const ring = isSelected ? "ring-8 ring-arg-gold/40" : "";
  const spinColor = isSelected ? "border-arg-gold" : "border-arg-lightblue/20";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative bg-white border-[6px] ${border} rounded-[2.5rem] p-6 shadow-[15px_15px_0px_rgba(0,0,0,0.1)]
      flex flex-row gap-6 transition-all overflow-hidden ${ring}`}
    >
      {/* COLUMNA IZQUIERDA */}
      <div className="flex flex-col items-center justify-start w-56 shrink-0">
        {/* Header */}
        <h3 className="font-black text-2xl text-arg-darkblue uppercase tracking-tighter text-center">
          {name}
        </h3>
        <span className="mt-2 bg-arg-darkblue text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {title}
        </span>

        {/* Avatar */}
        <div className="relative w-36 h-36 mt-6">
          <div
            className={`absolute inset-0 rounded-full border-4 border-dashed 
            ${spinColor} ${isSelected ? "animate-spin-slow" : ""}`}
          />
          <div
            className={`absolute inset-2 bg-slate-100 border-4 ${
              isSelected ? "border-arg-gold" : "border-arg-darkblue"
            } rounded-full flex items-center justify-center text-5xl shadow-inner z-10`}
          >
            👤
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="flex flex-col flex-grow">
        {/* Stats */}
        <div className="space-y-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="flex justify-between text-[11px] font-black uppercase mb-1 px-1">
                <span className="text-arg-darkblue">{stat.label}</span>
                <span className="text-arg-lightblue">{stat.value * 10}%</span>
              </div>
              <div className="w-full bg-white h-4 rounded-lg border-2 border-arg-darkblue overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.value * 10}%` }}
                  transition={{
                    duration: 1,
                    delay: 0.1 + i * 0.1,
                    ease: "circOut",
                  }}
                  className={`h-full ${
                    stat.value > 7 ? "bg-arg-gold" : "bg-arg-lightblue"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="relative bg-arg-darkblue/5 border-2 border-arg-darkblue rounded-2xl p-4 mb-6">
          <div className="absolute top-0 left-0 bg-arg-darkblue text-white text-[9px] font-black px-2 py-0.5 rounded-br-lg">
            CV REVISADO
          </div>
          <p className="text-[13px] font-bold text-arg-darkblue/80 leading-snug pt-2">
            {career}
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="mt-auto bg-arg-gold hover:bg-white text-arg-darkblue font-black py-4 rounded-2xl
          border-[3px] border-arg-darkblue shadow-[6px_6px_0px_#00355E]
          active:shadow-none active:translate-x-1 active:translate-y-1 transition-all
          uppercase text-sm tracking-widest"
        >
          ELEGIR
        </button>
      </div>
    </motion.div>
  );
}
