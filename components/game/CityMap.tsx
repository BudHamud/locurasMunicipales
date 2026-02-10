"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Tile } from "./Tile";
import TileInspector from "./TileInspector";
import { CityTile } from "@/data/mapSchema";
import { Obra } from "@/data/obras";

const GRID_SIZE = 20; // 20x20 celdas

interface CityMapProps {
  mapData: CityTile[];
  setMapData: (data: CityTile[] | ((prev: CityTile[]) => CityTile[])) => void;
  placementMode: Obra | null;
  onPlacementSelect: (tile: CityTile) => void;
  onTileAction: (actionId: string, tile: CityTile) => void;
  currentBudget: number;
  scale: number; // New prop
}

export default function CityMap({
  mapData,
  setMapData,
  placementMode,
  onPlacementSelect,
  onTileAction,
  currentBudget,
  scale // Destructure new prop
}: CityMapProps) {
  const constraintsRef = useRef(null);
  // Removed local scale state
  const [selectedTile, setSelectedTile] = useState<CityTile | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);

  const handleTileClick = (tile: CityTile) => {
    if (placementMode) {
      // In placement mode - try to place the obra
      if (tile.type === 'empty') {
        onPlacementSelect(tile);
      }
    } else {
      // In inspection mode - select the tile
      setSelectedTile(tile.id === selectedTile?.id ? null : tile);
    }
  };

  const handleTileAction = (actionId: string, tile: CityTile) => {
    onTileAction(actionId, tile);
    setSelectedTile(null); // Close inspector after action
  };

  const isValidPlacement = (tile: CityTile) => {
    if (!placementMode) return true;
    return tile.type === 'empty';
  };

  return (
    <div className="relative w-full h-full bg-[#1b2621] overflow-hidden" ref={constraintsRef}>
      {/* Placement Mode Indicator */}
      {placementMode && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg border-2 border-white/30 animate-pulse">
          <span className="text-2xl mr-2">{placementMode.icon}</span>
          Haz click en un terreno baldío para colocar {placementMode.title}
        </div>
      )}

      {/* Tile Inspector */}
      {selectedTile && !placementMode && (
        <TileInspector
          tile={selectedTile}
          onClose={() => setSelectedTile(null)}
          onAction={handleTileAction}
          currentBudget={currentBudget}
        />
      )}

      <motion.div
        drag
        dragConstraints={constraintsRef}
        animate={{ scale }} // La escala ahora viene del padre
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="origin-center shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 60px)`,
          width: GRID_SIZE * 60,
          height: GRID_SIZE * 60,
          x: "-25%", y: "-25%"
        }}
      >
        {mapData.map((tile) => (
          <Tile
            key={tile.id}
            type={tile.type}
            condition={tile.condition}
            isSelected={selectedTile?.id === tile.id}
            isHovered={hoveredTileId === tile.id}
            isPlacementPreview={placementMode !== null && hoveredTileId === tile.id}
            isValidPlacement={isValidPlacement(tile)}
            onClick={() => handleTileClick(tile)}
            onMouseEnter={() => setHoveredTileId(tile.id)}
            onMouseLeave={() => setHoveredTileId(null)}
          />
        ))}
      </motion.div>
    </div>
  );
}
