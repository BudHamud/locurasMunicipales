import StatBadge from "../StatBadge";
import { PopulationStats } from "@/data/population";
import { CityState } from "@/data/population"; // Assuming CityState is exported from population or mapSchema, check imports

// Header uses stats from useGameState (budget, etc) and usePopulation
interface HeaderProps {
    stats: {
        municipio: string;
        budget: number;
        popularity: number;
        corruption: number;
        day: number;
    };
    populationStats: PopulationStats;
}

export default function Header({ stats, populationStats }: HeaderProps) {
    return (
        <header className="sticky top-0 bg-black/30 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 flex flex-col md:flex-row justify-between items-center shadow-2xl z-20 gap-4">
            <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <h1 className="text-xl font-black tracking-tighter text-blue-400 uppercase leading-none hidden md:block">
                    Locuras Municipales
                </h1>
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest italic">
                    {stats.municipio || "Villa Caos"}
                </span>
            </div>

            <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
                <StatBadge icon="💵" label="Presupuesto" value={stats.budget} isCurrency />
                <StatBadge icon="❤️" label="Popularidad" value={stats.popularity} />
                <StatBadge
                    icon="💼"
                    label="Corrupción"
                    value={stats.corruption}
                    color={stats.corruption > 50 ? "text-red-400" : "text-yellow-500"}
                />
                <StatBadge icon="👥" label="Población" value={populationStats.total} />
                <StatBadge icon="🏚️" label="Sin Hogar" value={populationStats.homeless} />
                <StatBadge icon="💼" label="Empleados" value={populationStats.employed} />
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
    );
}
