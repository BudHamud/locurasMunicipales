"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Hooks de Lógica
import { useGameState } from "@/hooks/useGameState";
import { useGameEngine } from "@/hooks/useGameEngine";
import { usePopulation } from "@/hooks/usePopulation";
import { useCitySimulation } from "@/hooks/useCitySimulation";

// Datos
import { OBRAS_DISPONIBLES, Obra } from "@/data/obras";
import { CityTile } from "@/data/mapSchema";
import { TILE_ACTIONS } from "@/data/tileActions";

// Componentes del Dashboard
import CityMap from "@/components/game/CityMap";
import DilemaModal from "@/components/game/DilemaModal";
import ConfirmationModal from "@/components/game/ConfirmationModal";

// Layout Components
import Header from "@/components/game/layout/Header";
import SidebarLeft from "@/components/game/layout/SidebarLeft";
import SidebarRight from "@/components/game/layout/SidebarRight";
import MapControls from "@/components/game/layout/MapControls";

const GRID_SIZE = 25; // Larger grid for better block layout

// Generamos un mapa con bloques argentinos (4x2 edificios por manzana)
export const generateMap = (): CityTile[] => {
  const tiles: CityTile[] = [];

  // Block configuration
  const BLOCK_WIDTH = 4;  // 4 buildings wide
  const BLOCK_HEIGHT = 2; // 2 buildings deep (front and back)
  const STREET_WIDTH = 1; // 1 tile wide streets
  const BLOCKS_X = 4;     // 4 blocks horizontally
  const BLOCKS_Y = 4;     // 4 blocks vertically

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let type: any = 'empty';
      let condition: any = 'poor';

      // Calculate which block we're in
      const blockX = Math.floor(x / (BLOCK_WIDTH + STREET_WIDTH));
      const blockY = Math.floor(y / (BLOCK_HEIGHT + STREET_WIDTH));
      const inBlockX = x % (BLOCK_WIDTH + STREET_WIDTH);
      const inBlockY = y % (BLOCK_HEIGHT + STREET_WIDTH);

      // Determine if this is a street or building slot
      const isStreetX = inBlockX === BLOCK_WIDTH;
      const isStreetY = inBlockY === BLOCK_HEIGHT;

      if (isStreetX || isStreetY) {
        // This is a street
        type = 'street';
        condition = Math.random() > 0.5 ? 'poor' : 'ruined';
      } else if (blockX < BLOCKS_X && blockY < BLOCKS_Y) {
        // This is within a block - building slot
        // Randomly place some initial buildings
        const rand = Math.random();
        if (rand > 0.7) {
          type = 'house';
          condition = Math.random() > 0.6 ? 'ruined' : 'poor';
        } else {
          type = 'empty'; // Available for building
          condition = 'poor';
        }
      }

      // Add a few special buildings
      if (x === 2 && y === 1) {
        type = 'hospital';
        condition = 'poor';
      }
      if (x === 17 && y === 16) {
        type = 'school';
        condition = 'poor';
      }

      tiles.push({
        id: `${x}-${y}`,
        type,
        condition,
        x,
        y,
        lastModified: Date.now()
      });
    }
  }
  return tiles;
};

export default function GamePage() {
  // 1. Estado Global del Juego
  const { stats, applyEffect } = useGameState();

  // 2. Estados Locales de la Sesión
  const [isClient, setIsClient] = useState(false);
  const [mapData, setMapData] = useState<CityTile[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMap = localStorage.getItem("locuras_municipales_map");
      if (savedMap) {
        try {
          return JSON.parse(savedMap);
        } catch (e) {
          console.error("Failed to load map", e);
        }
      }
    }
    return generateMap();
  });

  const [builtObras, setBuiltObras] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedBuilt = localStorage.getItem("locuras_municipales_built");
      if (savedBuilt) {
        try {
          return JSON.parse(savedBuilt);
        } catch (e) {
          console.error("Failed to load built obras", e);
        }
      }
    }
    return [];
  });
  const [comments, setComments] = useState<any[]>([]);
  const [activeDilema, setActiveDilema] = useState<any>(null);
  const [placementMode, setPlacementMode] = useState<Obra | null>(null);
  const [pendingPlacement, setPendingPlacement] = useState<{ obra: Obra; tile: CityTile } | null>(null);

  // Mobile Navigation State
  const [mobileTab, setMobileTab] = useState<'map' | 'build' | 'social'>('map');

  // Scale state for MapControls
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save Map Data
  useEffect(() => {
    if (isClient && mapData.length > 0) {
      localStorage.setItem("locuras_municipales_map", JSON.stringify(mapData));
    }
  }, [mapData, isClient]);

  // Save Built Obras
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("locuras_municipales_built", JSON.stringify(builtObras));
    }
  }, [builtObras, isClient]);



  // Population System
  const { stats: populationStats, getPopulationEvents } = usePopulation(
    mapData,
    stats.budget,
    stats.popularity,
    stats.corruption,
    200, // initial population
    0.1  // 10% homeless
  );

  // Motor de Eventos
  const addComment = useCallback((newComment: any) => {
    // Ensure every comment has a TRULY unique ID, even if the source provides one (that might be duplicated)
    const uniqueId = newComment.id
      ? `${newComment.id}-${Math.random().toString(36).substr(2, 5)}`
      : `c-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const commentWithId = {
      ...newComment,
      id: uniqueId,
      time: newComment.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setComments((prev) => [...prev.slice(-9), commentWithId]); // Mantenemos un feed limpio de 10 items
  }, []);

  const triggerDilema = useCallback((dilema: any) => {
    setActiveDilema(dilema);
  }, []);

  // 4. Inicialización del Motor de Eventos (ahora basado en población)
  useGameEngine(addComment, triggerDilema, activeDilema, populationStats, stats.budget, stats.corruption);

  // 5. Handlers de Interacción
  const handleObraClick = (obra: Obra) => {
    // Enter placement mode instead of building immediately
    setPlacementMode(obra);
  };

  const handlePlacementSelect = (tile: CityTile) => {
    if (!placementMode) return;
    // Show confirmation modal
    setPendingPlacement({ obra: placementMode, tile });
  };

  const handleConfirmPlacement = () => {
    if (!pendingPlacement) return;

    const { obra, tile } = pendingPlacement;

    // Apply effects
    applyEffect({
      budget: -obra.cost,
      corruption: obra.corruption,
      popularity: obra.popularity
    });

    // Update map
    setMapData(prev => prev.map(t =>
      t.id === tile.id
        ? { ...t, type: obra.tileType, condition: 'pristine', builtObraId: obra.id, lastModified: Date.now() }
        : t
    ));

    // Update built obras
    setBuiltObras(prev => [...prev, obra.id]);

    // Add comment
    addComment({
      sector: `Zona (${tile.x}, ${tile.y})`,
      text: `¡Construyeron ${obra.title}! ${obra.description}`,
      sentiment: obra.popularity > 0 ? 'good' : 'neutral'
    });

    // Reset states
    setPlacementMode(null);
    setPendingPlacement(null);
  };

  const handleCancelPlacement = () => {
    setPendingPlacement(null);
  };

  const handleTileAction = (actionId: string, tile: CityTile) => {
    const action = TILE_ACTIONS[actionId];
    if (!action) return;

    // Check if can afford
    if (stats.budget < action.cost) {
      addComment({
        sector: "Municipalidad",
        text: "No hay fondos para esa acción. La caja está vacía.",
        sentiment: "bad"
      });
      return;
    }

    // Apply effects
    applyEffect({
      budget: -action.cost,
      ...action.effects
    });

    // Update tile condition
    setMapData(prev => prev.map(t => {
      if (t.id !== tile.id) return t;

      let newCondition = t.condition;
      let newType = t.type;

      if (actionId.includes('repair') || actionId.includes('upgrade')) {
        const conditionOrder = ['ruined', 'poor', 'good', 'pristine'];
        const currentIndex = conditionOrder.indexOf(t.condition);
        if (currentIndex < conditionOrder.length - 1) {
          newCondition = conditionOrder[currentIndex + 1] as any;
        }
      } else if (actionId === 'demolish') {
        return { ...t, type: 'empty', condition: 'ruined', builtObraId: undefined, lastModified: Date.now() };
      } else if (actionId === 'build_street') {
        // Build a new street
        return { ...t, type: 'street', condition: 'pristine', lastModified: Date.now() };
      } else if (actionId === 'remove_street') {
        // Remove street, turn back to empty
        return { ...t, type: 'empty', condition: 'poor', lastModified: Date.now() };
      }

      return { ...t, condition: newCondition, type: newType, lastModified: Date.now() };
    }));

    // Add comment
    addComment({
      sector: `Zona (${tile.x}, ${tile.y})`,
      text: `${action.label} completado. ${action.effects.popularity ? 'Los vecinos lo notan.' : ''}`,
      sentiment: action.effects.popularity && action.effects.popularity > 0 ? 'good' : 'neutral'
    });
  };

  const handleDecision = (effects: any) => {
    applyEffect(effects);
    setActiveDilema(null);
  };

  // Zoom handlers
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleResetScale = () => setScale(1);

  // 6. Simulation Layer
  const agents = useCitySimulation(mapData);

  if (!isClient) {
    return <div className="h-screen w-full bg-[#344E41] flex items-center justify-center text-white font-black text-2xl">Cargando Villa Caos...</div>;
  }

  return (
    <main className="h-screen w-full bg-[#344E41] p-4 flex flex-col gap-4 overflow-hidden font-sans text-slate-200">

      {/* --- HEADER --- */}
      <Header stats={stats} populationStats={populationStats} />

      {/* --- CUERPO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden relative">

        {/* SIDEBAR IZQUIERDO: GESTIÓN DE OBRAS */}
        {/* On mobile, only show if tab is 'build'. On desktop, always show. */}
        <div className={`md:flex ${mobileTab === 'build' ? 'flex' : 'hidden'} flex-1 md:flex-none h-full`}>
          <SidebarLeft
            budget={stats.budget}
            builtObras={builtObras}
            onObraClick={handleObraClick}
          />
        </div>

        {/* ÁREA CENTRAL: MAPA Y MODALES */}
        {/* On mobile, only show if tab is 'map'. On desktop, always show. */}
        <section className={`flex-1 relative rounded-[3rem] border border-white/5 bg-gradient-to-br from-black/20 to-transparent overflow-hidden shadow-inner ${mobileTab === 'map' ? 'flex' : 'hidden md:flex'}`}>

          {/* Mapa de la Ciudad */}
          <CityMap
            mapData={mapData}
            setMapData={setMapData}
            placementMode={placementMode}
            onPlacementSelect={handlePlacementSelect}
            onTileAction={handleTileAction}
            currentBudget={stats.budget}
            scale={scale}
            gridSize={GRID_SIZE}
            agents={agents}
          />

          {/* Dilemas Emergentes */}
          <AnimatePresence>
            {activeDilema && (
              <DilemaModal
                dilema={activeDilema}
                onOptionSelect={handleDecision}
              />
            )}
          </AnimatePresence>

          {/* Confirmation Modal for Obra Placement */}
          <AnimatePresence>
            {pendingPlacement && (
              <ConfirmationModal
                obra={pendingPlacement.obra}
                currentBudget={stats.budget}
                onConfirm={handleConfirmPlacement}
                onCancel={handleCancelPlacement}
              />
            )}
          </AnimatePresence>

          {/* Controles de Mapa Flotantes */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetScale}
          />
        </section>

        {/* SIDEBAR DERECHO: VOX POPULI */}
        {/* On mobile, only show if tab is 'social'. On desktop, always show. */}
        <div className={`md:flex ${mobileTab === 'social' ? 'flex' : 'hidden'} flex-1 md:flex-none h-full`}>
          <SidebarRight comments={comments} />
        </div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden bg-[#1A2A2D] p-4 rounded-2xl flex justify-around items-center border-t border-white/10 shrink-0 z-50">
        <button
          onClick={() => setMobileTab('build')}
          className={`flex flex-col items-center gap-1 ${mobileTab === 'build' ? 'text-arg-gold' : 'text-slate-400'}`}
        >
          <span className="text-2xl">🏗️</span>
          <span className="text-[10px] uppercase font-black tracking-widest">Obras</span>
        </button>
        <button
          onClick={() => setMobileTab('map')}
          className={`flex flex-col items-center gap-1 ${mobileTab === 'map' ? 'text-arg-gold' : 'text-slate-400'}`}
        >
          <span className="text-2xl">🗺️</span>
          <span className="text-[10px] uppercase font-black tracking-widest">Mapa</span>
        </button>
        <button
          onClick={() => setMobileTab('social')}
          className={`flex flex-col items-center gap-1 ${mobileTab === 'social' ? 'text-arg-gold' : 'text-slate-400'}`}
        >
          <span className="text-2xl">📢</span>
          <span className="text-[10px] uppercase font-black tracking-widest">VoxPop</span>
        </button>
      </nav>

      {/* --- OVERLAY DE DERROTA (Opcional) --- */}
      <AnimatePresence>
        {stats.popularity <= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-6xl font-black text-red-500 mb-4 uppercase">¡TE SACARON EN HELICÓPTERO!</h2>
            <p className="text-xl text-white mb-8">La popularidad llegó a 0. El pueblo tomó la municipalidad.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest"
            >
              Intentar otra vez (Reiniciar)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
