"use client";
import { useState, useEffect } from "react";

interface GameState {
  budget: number;
  popularity: number;
  corruption: number;
  day: number;
  municipio: string;
}

export function useGameState() {
  const [stats, setStats] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("locuras_municipales_save");
      if (saved) {
        try {
          return {
            budget: 1240500,
            popularity: 64,
            corruption: 12,
            day: 42,
            municipio: "Villa Caos",
            ...JSON.parse(saved)
          };
        } catch (e) {
          console.error("Failed to parse game state", e);
        }
      }
    }
    return {
      budget: 1240500,
      popularity: 64,
      corruption: 12,
      day: 42,
      municipio: "Villa Caos"
    };
  });

  const applyEffect = (effects: { budget?: number; popularity?: number; corruption?: number }) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        budget: prev.budget + (effects.budget || 0),
        popularity: Math.min(100, Math.max(0, prev.popularity + (effects.popularity || 0))),
        corruption: Math.min(100, Math.max(0, prev.corruption + (effects.corruption || 0))),
        day: prev.day + 1
      };
      localStorage.setItem("locuras_municipales_save", JSON.stringify(newStats));
      return newStats;
    });
  };

  return { stats, applyEffect };
}