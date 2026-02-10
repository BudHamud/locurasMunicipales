"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function VoxPopuli({ comments }: { comments: any[] }) {
  return (
    <aside className="w-full md:w-80 bg-[#1A2A2D]/90 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 flex flex-col h-full shadow-2xl">
      <h2 className="text-xs font-black uppercase text-yellow-500 mb-6 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Vox Populi
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {[...comments].reverse().map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-2xl border bg-black/20 ${c.sentiment === 'good' ? 'border-green-500/30' :
                  c.sentiment === 'bad' ? 'border-red-500/30' : 'border-white/5'
                }`}
            >
              <div className="flex justify-between text-[8px] font-black uppercase opacity-40 mb-1">
                <span>{c.sector}</span>
                <span>{c.time}</span>
              </div>
              <p className="text-[11px] font-bold italic leading-tight text-slate-300 italic">"{c.text}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
}