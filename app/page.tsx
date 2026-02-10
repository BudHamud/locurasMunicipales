"use client";
import LeaderCard from "@/components/LeaderCard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [showSelection, setShowSelection] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState("");

  const leaders = [
    {
      id: "ing",
      name: "Juan 'Ing' Perez",
      title: "Empresario",
      stats: [
        { label: "Obra", value: 9 },
        { label: "Economía", value: 8 },
        { label: "Social", value: 4 },
      ],
      career:
        "Promete asfalto hasta en tu patio. Experto en licitaciones dudosas.",
    },
    {
      id: "pan",
      name: "Maria Panqueque",
      title: "Militante",
      stats: [
        { label: "Social", value: 10 },
        { label: "Oratoria", value: 9 },
        { label: "Gestión", value: 6 },
      ],
      career:
        "Conoce a cada vecino. Su récord: 5 cambios de partido en un año.",
    },
    {
      id: "cho",
      name: "Pedro Choripan",
      title: "Gremialista",
      stats: [
        { label: "Piquete", value: 10 },
        { label: "Calle", value: 10 },
        { label: "Caja", value: 5 },
      ],
      career:
        "Si hay humo, está él. Organiza paros y asados con la misma pasión.",
    },
    {
      id: "lib",
      name: "Nacho 'Bot'",
      title: "Influencer",
      stats: [
        { label: "Redes", value: 10 },
        { label: "Venta", value: 9 },
        { label: "Realidad", value: 2 },
      ],
      career:
        "Quiere privatizar hasta el aire del despacho. Gestión vía TikTok.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      <AnimatePresence mode="wait">
        {!showSelection ? (
          /* SECTION 1: HERO (Se desliza hacia ABAJO al salir) */
          <motion.section
            key="hero"
            initial={{ y: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 h-screen bg-gradient-to-b from-arg-lightblue via-white to-arg-lightblue/30 flex flex-col items-center pt-12 px-4 overflow-hidden z-20"
          >
            {/* Decoración de Fondo */}
            <motion.div
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-20 left-10 text-6xl opacity-40 select-none"
            >
              ☁️
            </motion.div>
            <motion.div
              animate={{ x: [0, -70, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-40 right-20 text-7xl opacity-30 select-none"
            >
              ☁️
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="text-7xl mb-6 z-10 drop-shadow-xl"
            >
              ☀️
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black text-arg-darkblue text-center tracking-tighter mb-8 z-10 drop-shadow-[0_5px_0_white]">
              LOCURAS <br />
              <span className="text-arg-gold drop-shadow-[0_5px_0_var(--arg-darkblue)]">
                MUNICIPALES
              </span>
            </h1>

            <div className="relative max-w-5xl w-full flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: -5 }}
                className="absolute -left-4 top-0 bg-white border-4 border-arg-darkblue p-6 rounded-3xl shadow-[8px_8px_0px_var(--arg-darkblue)] z-30 max-w-xs"
              >
                <p className="font-black text-xl text-arg-darkblue uppercase italic leading-tight">
                  ¡Elegí a tu líder, gestioná el caos y no te dejes intervenir!
                </p>
                <button
                  onClick={() => setShowSelection(true)}
                  className="mt-4 w-full bg-arg-gold text-arg-darkblue px-6 py-3 rounded-xl font-black border-2 border-arg-darkblue hover:bg-white transition-all shadow-[4px_4px_0px_var(--arg-darkblue)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  ¡JUGAR AHORA!
                </button>
              </motion.div>

              <div className="ml-auto w-11/12 md:w-4/5 border-[10px] border-white rounded-3xl overflow-hidden shadow-2xl rotate-2 bg-white relative">
                <Image
                  src="/img1.avif"
                  alt="City Image"
                  width={1200}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.section>
        ) : (
          /* SECTION 2: SELECTION (Se desliza hacia ARRIBA al entrar) */
          <motion.section
            key="selection"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="min-h-screen bg-slate-50 py-20 px-4 border-t-8 border-arg-gold z-10"
          >
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setShowSelection(false)}
                className="mb-8 text-arg-darkblue font-bold flex items-center gap-2 hover:underline"
              >
                ← VOLVER
              </button>
              <h2 className="text-center text-4xl font-black text-arg-darkblue uppercase mb-12 italic">
                Seleccioná tu líder político
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-20">
                {leaders.map((leader) => (
                  <LeaderCard
                    key={leader.id}
                    {...leader}
                    isSelected={selectedLeaderId === leader.id} // Necesitas un estado: const [selectedLeaderId, setSelectedLeaderId] = useState("");
                    onSelect={() => setSelectedLeaderId(leader.id)}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
