"use client";
import { motion, AnimatePresence } from "framer-motion";
import { OBRAS_DISPONIBLES } from "../../data/obras";

export default function CityMap({ builtItems }: { builtItems: string[] }) {
  // Coordenadas fijas para que cada obra aparezca en un lugar lógico
  const positions: any = {
    sanguchitos: { top: '20%', left: '30%' },
    estadio: { top: '40%', left: '60%' },
    plaza: { top: '55%', left: '25%' },
  };

  return (
    <div className="relative w-full h-full bg-[#2D3E35] overflow-hidden">
      {/* Grilla decorativa estilo plano técnico */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <AnimatePresence>
        {builtItems.map((id) => {
          const obra = OBRAS_DISPONIBLES.find(o => o.id === id);
          if (!obra) return null;
          
          return (
            <motion.div
              key={id}
              initial={{ scale: 0, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="absolute p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col items-center"
              style={{ top: positions[id]?.top, left: positions[id]?.left }}
            >
              <span className="text-4xl drop-shadow-2xl">{obra.icon}</span>
              <span className="text-[8px] font-black uppercase text-white/50 mt-1">{obra.title}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}