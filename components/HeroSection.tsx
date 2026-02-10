"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  onPlay: () => void;
}

export default function HeroSection({ onPlay }: HeroSectionProps) {
  return (
    <section className="relative h-screen bg-gradient-to-b from-arg-lightblue via-white to-arg-lightblue/30 flex flex-col items-center pt-12 px-4 overflow-hidden">
      
      {/* Nubes y Billetes (Decoración) */}
      <motion.div animate={{ x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 left-10 text-6xl opacity-40 select-none">☁️</motion.div>
      <motion.div animate={{ x: [0, -70, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-40 right-20 text-7xl opacity-30 select-none">☁️</motion.div>
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * 400 - 200, opacity: 0 }}
          animate={{ y: 1000, opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 2 }}
          className="absolute text-3xl z-0"
        >💵</motion.div>
      ))}

      {/* Contenido Principal */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
        className="text-7xl mb-6 z-10 drop-shadow-xl"
      >☀️</motion.div>

      <h1 className="text-6xl md:text-9xl font-black text-arg-darkblue text-center tracking-tighter mb-8 z-10 drop-shadow-[0_5px_0_white]">
        LOCURAS <br />
        <span className="text-arg-gold drop-shadow-[0_5px_0_var(--arg-darkblue)]">MUNICIPALES</span>
      </h1>

      <div className="relative max-w-5xl w-full flex flex-col items-center">
        {/* Burbuja Flotante */}
        <motion.div 
          initial={{ scale: 0, rotate: -10 }} 
          animate={{ scale: 1, rotate: -5 }} 
          className="absolute -left-4 top-0 bg-white border-4 border-arg-darkblue p-6 rounded-3xl shadow-[8px_8px_0px_var(--arg-darkblue)] z-30 max-w-xs"
        >
          <p className="font-black text-xl text-arg-darkblue uppercase italic leading-tight">
            "¡Elegí a tu líder, gestioná el caos y no te dejes intervenir!"
          </p>
          <button 
            onClick={onPlay}
            className="mt-4 w-full bg-arg-gold text-arg-darkblue px-6 py-3 rounded-xl font-black border-2 border-arg-darkblue hover:bg-white transition-all shadow-[4px_4px_0px_var(--arg-darkblue)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            ¡JUGAR AHORA!
          </button>
        </motion.div>

        {/* Frame de la Ciudad */}
        <div className="ml-auto w-11/12 md:w-4/5 border-[10px] border-white rounded-3xl overflow-hidden shadow-2xl rotate-2 bg-white">
          <Image src="/img1.avif" alt="City Image" width={1200} height={600} className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}