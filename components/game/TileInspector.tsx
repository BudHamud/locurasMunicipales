"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CityTile } from "@/data/mapSchema";
import { getAvailableActions } from "@/data/tileActions";
import { X } from "lucide-react";

interface TileInspectorProps {
    tile: CityTile | null;
    onClose: () => void;
    onAction: (actionId: string, tile: CityTile) => void;
    currentBudget: number;
}

export default function TileInspector({ tile, onClose, onAction, currentBudget }: TileInspectorProps) {
    if (!tile) return null;

    const actions = getAvailableActions(tile.type, tile.condition);

    const getTileTypeName = (type: string) => {
        const names: Record<string, string> = {
            street: "Calle",
            house: "Casa",
            hospital: "Hospital",
            school: "Escuela",
            police: "Comisaría",
            park: "Parque",
            plaza: "Plaza",
            market: "Mercado",
            parrilla: "Parrilla",
            monument: "Monumento",
            theater: "Teatro",
            government_palace: "Palacio",
            empty: "Terreno Baldío",
            corruption_site: "Sitio Corrupto",
            construction: "En Construcción"
        };
        return names[type] || type;
    };

    const getConditionName = (condition: string) => {
        const names: Record<string, string> = {
            ruined: "Ruinoso",
            poor: "Malo",
            good: "Bueno",
            pristine: "Impecable"
        };
        return names[condition] || condition;
    };

    const getConditionColor = (condition: string) => {
        const colors: Record<string, string> = {
            ruined: "text-red-400",
            poor: "text-orange-400",
            good: "text-green-400",
            pristine: "text-blue-400"
        };
        return colors[condition] || "text-gray-400";
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-24 left-8 z-50 w-80 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight">
                            {getTileTypeName(tile.type)}
                        </h3>
                        <p className={`text-sm font-bold ${getConditionColor(tile.condition)}`}>
                            Estado: {getConditionName(tile.condition)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Tile Info */}
                <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-xs text-white/60 space-y-1">
                        <p>Posición: ({tile.x}, {tile.y})</p>
                        {tile.builtObraId && (
                            <p className="text-blue-400">Obra: {tile.builtObraId}</p>
                        )}
                    </div>
                </div>

                {/* Available Actions */}
                {actions.length > 0 ? (
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                            Acciones Disponibles
                        </p>
                        {actions.map((action) => {
                            const canAfford = currentBudget >= action.cost;
                            return (
                                <button
                                    key={action.id}
                                    onClick={() => canAfford && onAction(action.id, tile)}
                                    disabled={!canAfford}
                                    className={`w-full p-3 rounded-xl border transition-all ${canAfford
                                            ? "bg-blue-600/20 border-blue-400/40 hover:bg-blue-600/30 hover:border-blue-400 cursor-pointer"
                                            : "bg-gray-800/20 border-gray-600/40 opacity-50 cursor-not-allowed"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-white">{action.label}</span>
                                        <span className={`text-xs font-black ${canAfford ? "text-yellow-400" : "text-gray-500"}`}>
                                            ${action.cost.toLocaleString()}
                                        </span>
                                    </div>
                                    {action.effects && (
                                        <div className="flex gap-2 mt-1 text-[10px]">
                                            {action.effects.popularity !== undefined && (
                                                <span className={action.effects.popularity > 0 ? "text-green-400" : "text-red-400"}>
                                                    {action.effects.popularity > 0 ? "+" : ""}{action.effects.popularity} ❤️
                                                </span>
                                            )}
                                            {action.effects.corruption !== undefined && (
                                                <span className={action.effects.corruption > 0 ? "text-red-400" : "text-green-400"}>
                                                    {action.effects.corruption > 0 ? "+" : ""}{action.effects.corruption} 💼
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-sm text-white/40 italic">
                            No hay acciones disponibles para este tile
                        </p>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
