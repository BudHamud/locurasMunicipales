"use client";
import { useEffect } from "react";
import { COMENTARIOS_POOL, DILEMAS_POOL } from "@/data/events";

export function useGameEngine(onNewComment: any, onNewDilema: any, activeDilema: any) {
  useEffect(() => {
    const interval = setInterval(() => {
      // 70% de probabilidad de nuevo comentario
      if (Math.random() < 0.7) {
        const randomComment = COMENTARIOS_POOL[Math.floor(Math.random() * COMENTARIOS_POOL.length)];
        onNewComment({ ...randomComment, id: Date.now(), time: "Ahora" });
      }

      // 30% de probabilidad de nuevo dilema (si no hay uno activo)
      if (Math.random() < 0.3 && !activeDilema) {
        const randomDilema = DILEMAS_POOL[Math.floor(Math.random() * DILEMAS_POOL.length)];
        onNewDilema(randomDilema);
      }
    }, 10000); // Chequea cada 10 segundos

    return () => clearInterval(interval);
  }, [activeDilema, onNewComment, onNewDilema]);
}