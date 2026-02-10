"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GameDashboard() {
  return (
    <main className="h-screen w-full bg-[#344E41] p-4 flex flex-col gap-4 overflow-hidden font-sans text-slate-200">
      
      {/* --- TOP BAR (STATS) --- */}
      <header className="flex items-center justify-between bg-black/30 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-blue-400 uppercase leading-none">Locuras Municipales</h1>
          <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Municipio de Villa Caos</span>
        </div>

        <div className="flex gap-4">
          <StatBadge icon="💵" label="Presupuesto" value="$1.240.500" />
          <StatBadge icon="❤️" label="Popularidad" value="64%" />
          <StatBadge icon="💼" label="Corrupción" value="12%" color="text-yellow-500" />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-600 px-6 py-2 rounded-2xl font-black text-sm shadow-lg border border-white/20">
            📅 Día 42
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-slate-800 overflow-hidden">
             {/* Imagen del líder elegido */}
             <img src="/api/placeholder/100/100" alt="Intendente" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* --- LEFT SIDEBAR (OBRAS PÚBLICAS) --- */}
        <aside className="w-72 bg-[#1A2A2D]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 flex flex-col shadow-2xl">
          <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
             <span className="text-blue-400 font-black">🏗️</span>
             <h2 className="font-black uppercase text-sm tracking-tighter">Obras Públicas</h2>
             <span className="ml-auto text-[8px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">PLAN 2024</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <ObraItem title="Estadio 'El Diego'" desc="Costo: $500.000 + Votos infinitos" active />
            <ObraItem title="Plaza Central" desc="Costo: $25.000" />
            <ObraItem title="Planta Eléctrica" desc="Desbloqueo en Nivel 5" locked />
            <ObraItem title="Comisaría Modelo" desc="Costo: $120.000" />
          </div>

          <p className="mt-4 text-[10px] italic opacity-40 text-center">"Gobernar es dar trabajo... a mis primos."</p>
        </aside>

        {/* --- MAP AREA (VACÍO PARA EL MAPA) --- */}
        <section className="flex-1 relative rounded-[3rem] border-2 border-white/5 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
           {/* Aquí iría el mapa interactivo de la ciudad */}
           <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <MapControl icon="+" />
              <MapControl icon="-" />
              <MapControl icon="🎯" active />
           </div>

           {/* --- MODAL DE DILEMA --- */}
           <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] bg-[#1A2326] border-2 border-yellow-500/50 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50"
           >
              <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <span className="animate-pulse">⚠️</span> Urgente: Dilema Político
              </div>

              <div className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/5">
                  🎓
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 leading-tight">Los maestros reclaman aumento</h3>
                  <p className="text-sm opacity-60 leading-relaxed">
                    El gremio docente ha sitiado la municipalidad. Argumentan que el sueldo no les alcanza ni para el boleto. ¿Qué hacemos, Jefe?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DecisionButton 
                  title="Darles Vouchers de Choripán" 
                  effect="Costo: $5.000 | +5 Popularidad" 
                  color="bg-blue-500" 
                />
                <DecisionButton 
                  title="Ignorarlos y construir una estatua" 
                  effect="Costo: $100.000 | +10% Corrupción" 
                  color="bg-slate-700" 
                />
              </div>
           </motion.div>
        </section>

        {/* --- RIGHT PANEL (VOX POPULI) --- */}
        <aside className="w-80 bg-[#1A2A2D]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400">💬</span>
            <h2 className="font-black uppercase text-sm tracking-tighter">Vox Populi</h2>
            <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </div>

          <div className="space-y-4">
            <Comment sector="Sector Sur" time="Hace 2m" text="¡No hay luz pero hay esperanza!" sentiment="neutral" />
            <Comment sector="Casco Céntrico" time="Hace 15m" text="Los impuestos son impagables" sentiment="bad" />
            <Comment sector="Barrio Humilde" time="Hace 1h" text="La plaza nueva está de diez" sentiment="good" />
          </div>
        </aside>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---

function StatBadge({ icon, label, value, color = "text-white" }: any) {
  return (
    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-2xl flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <div className="flex flex-col leading-none">
        <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">{label}</span>
        <span className={`text-sm font-black ${color}`}>{value}</span>
      </div>
    </div>
  );
}

function ObraItem({ title, desc, active, locked }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${active ? 'bg-blue-500/20 border-blue-500 shadow-lg' : 'bg-white/5 border-white/5'} ${locked ? 'opacity-30' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-blue-500' : 'bg-slate-800'}`}>🏢</div>
        <div className="flex flex-col">
          <span className="text-xs font-black uppercase leading-none mb-1">{title}</span>
          <span className="text-[9px] opacity-50 font-medium leading-none">{desc}</span>
        </div>
        {locked && <span className="ml-auto text-xs">🔒</span>}
      </div>
    </div>
  );
}

function Comment({ sector, time, text, sentiment }: any) {
  const colorMap: any = { good: 'border-green-500/50', bad: 'border-red-500/50', neutral: 'border-white/10' };
  return (
    <div className={`p-4 rounded-2xl border bg-black/20 ${colorMap[sentiment]}`}>
      <div className="flex justify-between text-[8px] font-black uppercase opacity-40 mb-2">
        <span>{sector}</span>
        <span>{time}</span>
      </div>
      <p className="text-xs font-bold italic leading-snug">"{text}"</p>
    </div>
  );
}

function DecisionButton({ title, effect, color }: any) {
  return (
    <button className={`${color} p-4 rounded-3xl text-left border border-white/20 hover:scale-[1.02] transition-transform shadow-xl`}>
      <h4 className="font-black text-xs uppercase mb-1">{title}</h4>
      <p className="text-[9px] opacity-70 font-bold">{effect}</p>
    </button>
  );
}

function MapControl({ icon, active }: any) {
  return (
    <button className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center font-black ${active ? 'bg-yellow-500 text-black' : 'bg-black/40 text-white'}`}>
      {icon}
    </button>
  );
}