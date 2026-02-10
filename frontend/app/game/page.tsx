"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Hooks de Lógica
import { useGameState } from "@/hooks/useGameState";
import { useGameEngine } from "@/hooks/useGameEngine";

// Datos
import { OBRAS_DISPONIBLES } from "@/data/obras";

// Componentes del Dashboard
import StatBadge from "@/components/game/StatBadge";
import ObraCard from "@/components/game/ObraCard";
import CityMap from "@/components/game/CityMap";
import DilemaModal from "@/components/game/DilemaModal";
import VoxPopuli from "@/components/game/VoxPopuli";

export default function GamePage() {
  // 1. Estado Global del Juego
  const { stats, applyEffect } = useGameState();
  
  // 2. Estados Locales de la Sesión
  const [builtObras, setBuiltObras] = useState<string[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [activeDilema, setActiveDilema] = useState<any>(null);

  // 3. Callbacks para el Motor de Eventos (Memorizados para evitar re-renders)
  const addComment = useCallback((newComment: any) => {
    setComments((prev) => [...prev.slice(-9), newComment]); // Mantenemos un feed limpio de 10 items
  }, []);

  const triggerDilema = useCallback((dilema: any) => {
    setActiveDilema(dilema);
  }, []);

  // 4. Inicialización del Motor de Eventos Aleatorios
  useGameEngine(addComment, triggerDilema, activeDilema);

  // 5. Handlers de Interacción
  const handleBuild = (obra: any) => {
    applyEffect({
      budget: -obra.cost,
      corruption: obra.corruption,
      popularity: obra.popularity
    });
    setBuiltObras((prev) => [...prev, obra.id]);
  };

  const handleDecision = (effects: any) => {
    applyEffect(effects);
    setActiveDilema(null);
  };

  return (
    <main className="h-screen w-full bg-[#344E41] p-4 flex flex-col gap-4 overflow-hidden font-sans text-slate-200">
      
      {/* --- HEADER: PANEL DE ESTADO SUPERIOR --- */}
      <header className="bg-black/30 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 flex justify-between items-center shadow-2xl z-20">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-blue-400 uppercase leading-none">
            Locuras Municipales
          </h1>
          <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest italic">
            {stats.municipio || "Villa Caos"}
          </span>
        </div>

        <div className="flex gap-4">
          <StatBadge icon="💵" label="Presupuesto" value={stats.budget} isCurrency />
          <StatBadge icon="❤️" label="Popularidad" value={stats.popularity} />
          <StatBadge 
            icon="💼" 
            label="Corrupción" 
            value={stats.corruption} 
            color={stats.corruption > 50 ? "text-red-400" : "text-yellow-500"} 
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-600 px-6 py-2 rounded-2xl font-black text-sm shadow-lg border border-white/20">
            📅 Día {stats.day}
          </div>
          {/* Avatar del Intendente */}
          <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-slate-800 overflow-hidden shadow-inner">
             <img src="/api/placeholder/100/100" alt="Avatar" className="object-cover" />
          </div>
        </div>
      </header>

      {/* --- CUERPO PRINCIPAL --- */}
      <div className="flex-1 flex gap-4 overflow-hidden relative">
        
        {/* SIDEBAR IZQUIERDO: GESTIÓN DE OBRAS */}
        <aside className="w-80 bg-[#1A2A2D]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 flex flex-col shadow-2xl z-10">
          <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
             <span className="text-blue-400 font-black">🏗️</span>
             <h2 className="font-black uppercase text-sm tracking-tighter">Obras Públicas</h2>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {OBRAS_DISPONIBLES.map((obra) => (
              <ObraCard 
                key={obra.id}
                obra={obra}
                isBuilt={builtObras.includes(obra.id)}
                canAfford={stats.budget >= obra.cost}
                onBuild={() => handleBuild(obra)}
              />
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
             <p className="text-[10px] italic opacity-40 font-medium tracking-tight">
               "Gobernar es transformar... el presupuesto en votos."
             </p>
          </div>
        </aside>

        {/* ÁREA CENTRAL: MAPA Y MODALES */}
        <section className="flex-1 relative rounded-[3rem] border border-white/5 bg-gradient-to-br from-black/20 to-transparent overflow-hidden shadow-inner">
          
          {/* Mapa de la Ciudad */}
          <CityMap builtItems={builtObras} />

          {/* Dilemas Emergentes */}
          <AnimatePresence>
            {activeDilema && (
              <DilemaModal 
                dilema={activeDilema} 
                onOptionSelect={handleDecision} 
              />
            )}
          </AnimatePresence>

          {/* Controles de Mapa Flotantes */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
             <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center font-black hover:bg-blue-600">+</button>
             <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center font-black hover:bg-blue-600">-</button>
             <button className="w-10 h-10 bg-arg-gold text-black rounded-xl border border-white/10 flex items-center justify-center font-black shadow-lg">🎯</button>
          </div>
        </section>

        {/* SIDEBAR DERECHO: VOX POPULI (FEED SOCIAL) */}
        <VoxPopuli comments={comments} />

      </div>

      {/* --- OVERLAY DE DERROTA (Opcional) --- */}
      <AnimatePresence>
        {stats.popularity <= 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-6xl font-black text-red-500 mb-4 uppercase">¡TE SACARON EN HELICÓPTERO!</h2>
            <p className="text-xl text-white mb-8">La popularidad llegó a 0. El pueblo tomó la municipalidad.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest"
            >
              Intentar otra vez (Reiniciar)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}