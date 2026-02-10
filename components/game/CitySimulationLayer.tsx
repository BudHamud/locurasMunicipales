import { motion } from "framer-motion";
import { Agent } from "@/hooks/useCitySimulation";

interface CitySimulationLayerProps {
    agents: Agent[];
    gridSize: number;
}

export default function CitySimulationLayer({ agents, gridSize }: CitySimulationLayerProps) {
    // Tile is 60px wide/high
    const TILE_SIZE = 60;

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            {agents.map((agent) => (
                <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: agent.x * TILE_SIZE + (agent.offsetX * TILE_SIZE) - (TILE_SIZE / 4), // Center roughly
                        y: agent.y * TILE_SIZE + (agent.offsetY * TILE_SIZE) - (TILE_SIZE / 4)
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }} // Smooth movement between updates
                    className="absolute w-3 h-3 rounded-full shadow-sm border border-black/20"
                    style={{ backgroundColor: agent.color }}
                />
            ))}
        </div>
    );
}
