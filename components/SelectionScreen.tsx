"use client";
import { useState } from "react";
import LeaderCard from "./LeaderCard";

export default function SelectionScreen({ onBack }: { onBack: () => void }) {
  const [municipio, setMunicipio] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="h-screen max-h-[1080px] w-full overflow-hidden flex flex-col bg-[#F8FAFC] py-4 px-8">
      <button
        onClick={onBack}
        className="text-[10px] font-black text-arg-darkblue uppercase opacity-40 hover:opacity-100 transition-opacity"
      >
        ← Volver al inicio
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <header className="text-center mb-6">
          <h2 className="text-4xl font-black text-arg-darkblue italic uppercase tracking-tighter">
            Armá tu boleta electoral
          </h2>
          <input
            type="text"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            placeholder="NOMBRE DEL MUNICIPIO..."
            className="mt-2 w-full max-w-sm bg-transparent border-b-4 border-arg-darkblue text-center text-2xl font-black text-arg-darkblue focus:outline-none placeholder:opacity-20 uppercase"
          />
        </header>

        {/* Grilla 2x2 */}
        <div className="grid grid-cols-2 gap-6 items-center">
          {leaders.map((leader) => (
            <LeaderCard
              key={leader.id}
              {...leader}
              isSelected={selectedId === leader.id}
              onSelect={() => setSelectedId(leader.id)}
            />
          ))}
        </div>

        <footer className="mt-8 flex justify-center">
          <button
            disabled={!selectedId || !municipio}
            className={`px-12 py-4 rounded-full font-black uppercase tracking-widest transition-all border-4
              ${
                selectedId && municipio
                  ? "bg-arg-darkblue text-white border-arg-darkblue shadow-[8px_8px_0px_#F6B40E] hover:translate-y-1 hover:shadow-none"
                  : "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed opacity-50"
              }
            `}
          >
            Comenzar Gestión
          </button>
        </footer>
      </div>
    </div>
  );
}
