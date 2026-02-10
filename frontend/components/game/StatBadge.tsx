import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function StatBadge({ icon, label, value, isCurrency }: any) {
  return (
    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-2xl flex items-center gap-3 min-w-[140px]">
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">{label}</span>
        <motion.span className="text-sm font-black text-white">
          {isCurrency ? `$${value.toLocaleString()}` : `${value}%`}
        </motion.span>
      </div>
    </div>
  );
}