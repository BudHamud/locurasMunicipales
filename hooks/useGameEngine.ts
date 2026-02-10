"use client";
import { useEffect } from "react";
import { COMENTARIOS_POOL, DILEMAS_POOL } from "@/data/events";
import { PopulationStats } from "@/data/population";

export function useGameEngine(
  onNewComment: any,
  onNewDilema: any,
  activeDilema: any,
  populationStats: PopulationStats,
  budget: number,
  corruption: number
) {
  useEffect(() => {
    const interval = setInterval(() => {
      // POPULATION-BASED EVENTS (not random!)

      // Homeless crisis
      if (populationStats.homeless > 30 && !activeDilema) {
        const homelessDilema = DILEMAS_POOL.find(d => d.title.toLowerCase().includes('vivienda'));
        if (homelessDilema) {
          onNewDilema(homelessDilema);
          onNewComment({
            sector: "Barrio Marginal",
            text: `${populationStats.homeless} personas sin hogar. La crisis habitacional es grave.`,
            sentiment: "bad",
            id: Date.now(),
            time: "Ahora"
          });
          return;
        }
      }

      // Budget crisis
      if (budget < 100000 && !activeDilema) {
        const budgetDilema = DILEMAS_POOL.find(d => d.title.toLowerCase().includes('presupuesto'));
        if (budgetDilema) {
          onNewDilema(budgetDilema);
          onNewComment({
            sector: "Municipalidad",
            text: "La caja está vacía. Necesitamos fondos urgente.",
            sentiment: "bad",
            id: Date.now(),
            time: "Ahora"
          });
          return;
        }
      }

      // Corruption scandal
      if (corruption > 60 && !activeDilema) {
        const corruptionDilema = DILEMAS_POOL.find(d => d.title.toLowerCase().includes('corrupción'));
        if (corruptionDilema) {
          onNewDilema(corruptionDilema);
          onNewComment({
            sector: "Prensa",
            text: "Denuncian irregularidades en la gestión municipal.",
            sentiment: "bad",
            id: Date.now(),
            time: "Ahora"
          });
          return;
        }
      }

      // Unemployment crisis
      const unemploymentRate = populationStats.total > 0
        ? (populationStats.unemployed / populationStats.total) * 100
        : 0;
      if (unemploymentRate > 40 && !activeDilema) {
        onNewComment({
          sector: "Centro de Empleo",
          text: `${populationStats.unemployed} desempleados. La gente pide trabajo.`,
          sentiment: "bad",
          id: Date.now(),
          time: "Ahora"
        });
      }

      // Happiness-based comments
      if (populationStats.averageHappiness > 70) {
        // Positive comments when people are happy
        if (Math.random() < 0.5) {
          const positiveComment = COMENTARIOS_POOL.filter(c => c.sentiment === 'good')[0];
          if (positiveComment) {
            onNewComment({ ...positiveComment, id: Date.now(), time: "Ahora" });
          }
        }
      } else if (populationStats.averageHappiness < 30) {
        // Negative comments when people are unhappy
        if (Math.random() < 0.7) {
          const negativeComment = COMENTARIOS_POOL.filter(c => c.sentiment === 'bad')[0];
          if (negativeComment) {
            onNewComment({ ...negativeComment, id: Date.now(), time: "Ahora" });
          }
        }
      } else {
        // Occasional random comments when things are neutral
        if (Math.random() < 0.3) {
          const randomComment = COMENTARIOS_POOL[Math.floor(Math.random() * COMENTARIOS_POOL.length)];
          onNewComment({ ...randomComment, id: Date.now(), time: "Ahora" });
        }
      }

      // Occasional random dilemas (much less frequent now)
      if (Math.random() < 0.1 && !activeDilema) {
        const randomDilema = DILEMAS_POOL[Math.floor(Math.random() * DILEMAS_POOL.length)];
        onNewDilema(randomDilema);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [activeDilema, onNewComment, onNewDilema, populationStats, budget, corruption]);
}