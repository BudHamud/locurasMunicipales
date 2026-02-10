"use client";
import { motion } from "framer-motion";

export default function ObraCard({ obra, canAfford, onBuild, isBuilt }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${isBuilt ? 'bg-blue-500/10 border-blue-500/30 opacity-60' : 'bg-white/5 border-white/5'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isBuilt ? 'bg-blue-500' : 'bg-slate-800'}`}>
          {obra.icon}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-xs font-black uppercase leading-none mb-1">{obra.title}</span>
          <span className="text-[9px] opacity-50 font-medium">
            Cost: ${obra.cost.toLocaleString()} {obra.corruption > 0 && `+ ${obra.corruption}% Corrupción`}
          </span>
        </div>
      </div>
      
      {!isBuilt && (
        <button 
          onClick={() => onBuild(obra)}
          disabled={!canAfford}
          className={`w-full mt-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all
            ${canAfford ? 'bg-blue-600 hover:bg-blue-400 text-white shadow-lg' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}
        >
          {canAfford ? 'Construir' : 'Fondos Insuficientes'}
        </button>
      )}
      {isBuilt && <div className="text-center mt-2 text-[9px] font-black text-blue-400 uppercase tracking-widest">Inaugurado</div>}
    </div>
  );
}