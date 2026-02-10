"use client";

import { useEffect, useState, useRef } from "react";
import { CityTile } from "@/data/mapSchema";
import { findPath, Point } from "@/utils/pathfinding";

export interface Agent {
    id: string;
    type: 'pedestrian' | 'car';
    x: number;
    y: number;
    // Visual offset within the tile (0-1)
    offsetX: number;
    offsetY: number;
    path: Point[];
    currentPathIndex: number;
    color: string;
    speed: number;
}

const GRID_SIZE = 25;
const MAX_AGENTS = 50;

export function useCitySimulation(mapData: CityTile[]) {
    const [agents, setAgents] = useState<Agent[]>([]);
    const mapRef = useRef(mapData);

    // Keep map reference up to date without triggering re-runs of the interval
    useEffect(() => {
        mapRef.current = mapData;
    }, [mapData]);

    useEffect(() => {
        const spawnAgent = () => {
            if (agents.length >= MAX_AGENTS) return;

            const map = mapRef.current;

            // 1. Find potential start points (Houses)
            const houses = map.filter(t => t.type === 'house');
            if (houses.length === 0) return;
            const startTile = houses[Math.floor(Math.random() * houses.length)];

            // 2. Find potential end points (Work, Shops, Parks)
            const destinations = map.filter(t =>
                ['market', 'park', 'hospital', 'school', 'police', 'municipalidad'].includes(t.type)
            );
            if (destinations.length === 0) return;
            const endTile = destinations[Math.floor(Math.random() * destinations.length)];

            if (startTile.id === endTile.id) return;

            // 3. Calculate Path
            // Allow walking on streets and the start/end tiles themselves
            const isWalkable = (x: number, y: number) => {
                const tile = map.find(t => t.x === x && t.y === y);
                if (!tile) return false;
                // Pedestrians can walk on streets and their start/destinations
                return tile.type === 'street' || tile.id === startTile.id || tile.id === endTile.id;
            };

            const path = findPath(
                { x: startTile.x, y: startTile.y },
                { x: endTile.x, y: endTile.y },
                isWalkable,
                GRID_SIZE
            );

            if (path && path.length > 0) {
                const newAgent: Agent = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: 'pedestrian',
                    x: startTile.x,
                    y: startTile.y,
                    offsetX: 0.5,
                    offsetY: 0.5,
                    path: path,
                    currentPathIndex: 0,
                    color: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'][Math.floor(Math.random() * 4)],
                    speed: 0.05 + Math.random() * 0.05 // Random speed
                };

                setAgents(prev => [...prev, newAgent]);
            }
        };

        // Game Loop
        const interval = setInterval(() => {
            // 1. Spawn Chance
            if (Math.random() < 0.1) {
                spawnAgent();
            }

            // 2. Move Agents
            setAgents(prevAgents => {
                return prevAgents.map(agent => {
                    // If finished path, mark for removal (or handle as arrived)
                    if (agent.currentPathIndex >= agent.path.length - 1) {
                        return null; // Will filter out nulls
                    }

                    const target = agent.path[agent.currentPathIndex + 1];
                    const dx = target.x - agent.x;
                    const dy = target.y - agent.y;

                    // Simple movement logic: move towards next point
                    // We can interpolate offsetX/Y for smooth movement between tiles

                    // For now, let's just jump to next tile if we are "close enough"
                    // In a real implementation we'd animate offsetX/Y

                    // Let's implement logical Grid movement for now
                    // A real smooth movement would require delta time and tracking strict float positions

                    // Simplified: Agents just hop tiles for this iteration
                    // To make it look "alive", we should probably use CSS transitions for the visual part 
                    // and just update the logical tile every N ticks.

                    return {
                        ...agent,
                        currentPathIndex: agent.currentPathIndex + 1,
                        x: target.x,
                        y: target.y
                    };
                }).filter(Boolean) as Agent[];
            });

        }, 1000); // Update every second for "turn based" movement, or faster for smooth?

        return () => clearInterval(interval);
    }, []);

    // Use a faster loop for smooth animation if we were doing interpolation, 
    // but for a React state update loop, 1000ms is chunky. 
    // Let's try 500ms to see.

    return agents;
}
