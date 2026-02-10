"use client";

import { motion } from "framer-motion";
import { Obra } from "@/data/obras";

interface ConfirmationModalProps {
    obra: Obra;
    currentBudget: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({ obra, currentBudget, onConfirm, onCancel }: ConfirmationModalProps) {
    const budgetAfter = currentBudget - obra.cost;
    const isTight = budgetAfter < 100000 && budgetAfter > 0;
    const cantAfford = budgetAfter < 0;

    const getFlavorText = () => {
        if (cantAfford) return "¡No hay guita! Vas a tener que conseguir más fondos.";
        if (isTight) return "Te va a quedar la caja medio floja, ¿seguro?";
        if (obra.corruption > 15) return "Esto huele a coima de lejos...";
        if (obra.cost > 1000000) return "Una obra faraónica. Los medios van a estar encima.";
        return "¿Confirmás la obra?";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
                {/* Icon */}
                <div className="text-6xl text-center mb-4">
                    {obra.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-white text-center mb-2 uppercase tracking-tight">
                    {obra.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-white/60 text-center mb-6 italic">
                    {obra.description}
                </p>

                {/* Cost Breakdown */}
                <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-white/60 text-sm">Costo Total</span>
                        <span className="text-yellow-400 font-black text-lg">
                            ${obra.cost.toLocaleString()}
                        </span>
                    </div>

                    <div className="h-px bg-white/10 mb-3" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-white/60">Presupuesto Actual</span>
                            <span className="text-white font-bold">${currentBudget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/60">Presupuesto Después</span>
                            <span className={`font-black ${cantAfford ? "text-red-400" : isTight ? "text-orange-400" : "text-green-400"}`}>
                                ${budgetAfter.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Effects */}
                <div className="flex gap-4 justify-center mb-6">
                    {obra.popularity !== 0 && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                            <span className="text-2xl">❤️</span>
                            <span className={`font-black ${obra.popularity > 0 ? "text-green-400" : "text-red-400"}`}>
                                {obra.popularity > 0 ? "+" : ""}{obra.popularity}
                            </span>
                        </div>
                    )}
                    {obra.corruption !== 0 && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                            <span className="text-2xl">💼</span>
                            <span className={`font-black ${obra.corruption > 0 ? "text-red-400" : "text-green-400"}`}>
                                {obra.corruption > 0 ? "+" : ""}{obra.corruption}
                            </span>
                        </div>
                    )}
                </div>

                {/* Flavor Text */}
                <div className={`text-center text-sm font-bold mb-6 p-3 rounded-xl ${cantAfford ? "bg-red-500/20 text-red-400" :
                        isTight ? "bg-orange-500/20 text-orange-400" :
                            "bg-blue-500/20 text-blue-400"
                    }`}>
                    {getFlavorText()}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black text-white uppercase tracking-wider transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={cantAfford}
                        className={`flex-1 py-3 px-6 rounded-xl font-black uppercase tracking-wider transition-all ${cantAfford
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/50"
                            }`}
                    >
                        {cantAfford ? "Sin Fondos" : "Confirmar"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
