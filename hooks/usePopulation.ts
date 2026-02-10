import { useState, useEffect, useCallback } from "react";
import {
    Citizen,
    CityState,
    PopulationStats,
    PopulationEvent,
    simulatePopulation,
    calculatePopulationStats,
    generateInitialPopulation
} from "@/data/population";
import { CityTile } from "@/data/mapSchema";

export function usePopulation(
    mapData: CityTile[],
    budget: number,
    popularity: number,
    corruption: number,
    initialCount: number = 200,
    initialHomelessPercent: number = 0.1
) {
    const [citizens, setCitizens] = useState<Citizen[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCitizens = localStorage.getItem("locuras_municipales_citizens");
            if (savedCitizens) {
                try {
                    return JSON.parse(savedCitizens);
                } catch (e) {
                    console.error("Failed to load citizens", e);
                }
            }
        }
        return generateInitialPopulation(initialCount, initialHomelessPercent);
    });

    const [stats, setStats] = useState<PopulationStats>(() =>
        calculatePopulationStats(citizens, mapData)
    );
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    // Update population every 10 seconds (game day)
    useEffect(() => {
        if (citizens.length === 0) return; // Wait for initialization

        const interval = setInterval(() => {
            const cityState: CityState = {
                budget,
                popularity,
                corruption,
                mapData
            };

            const { citizens: updated, events } = simulatePopulation(citizens, cityState);

            // Handle migration events
            let finalCitizens = [...updated];
            events.forEach(event => {
                if (event.type === 'immigration' && event.count) {
                    // Add new citizens
                    const newCitizens = generateInitialPopulation(event.count, 0);
                    finalCitizens = [...finalCitizens, ...newCitizens];
                } else if (event.type === 'emigration' && event.count) {
                    // Remove random citizens
                    finalCitizens = finalCitizens.slice(0, -event.count);
                }
            });

            setCitizens(finalCitizens);
            // Save to localStorage
            localStorage.setItem("locuras_municipales_citizens", JSON.stringify(finalCitizens));

            setStats(calculatePopulationStats(finalCitizens, mapData));
            setLastUpdate(Date.now());
        }, 10000); // Every 10 seconds

        return () => clearInterval(interval);
    }, [mapData, budget, popularity, corruption, citizens]);

    // Recalculate stats when map changes (buildings added/removed)
    useEffect(() => {
        setStats(calculatePopulationStats(citizens, mapData));
    }, [mapData, citizens]);

    const getPopulationEvents = useCallback((): PopulationEvent[] => {
        const cityState: CityState = {
            budget,
            popularity,
            corruption,
            mapData
        };
        const { events } = simulatePopulation(citizens, cityState);
        return events;
    }, [citizens, budget, popularity, corruption, mapData]);

    return {
        citizens,
        stats,
        lastUpdate,
        getPopulationEvents
    };
}
