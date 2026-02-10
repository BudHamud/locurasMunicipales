import { OBRAS_DISPONIBLES, Obra } from "@/data/obras";
import ObraCard from "../ObraCard";

interface SidebarLeftProps {
    budget: number;
    builtObras: string[];
    onObraClick: (obra: Obra) => void;
}

export default function SidebarLeft({ budget, builtObras, onObraClick }: SidebarLeftProps) {
    return (
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
                        canAfford={budget >= obra.cost}
                        onBuild={() => onObraClick(obra)}
                    />
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] italic opacity-40 font-medium tracking-tight">
                    "Gobernar es transformar... el presupuesto en votos."
                </p>
            </div>
        </aside>
    );
}
