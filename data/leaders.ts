export interface Leader {
    id: string;
    name: string;
    title: string;
    icon: string;
    description: string;
    startingConditions: {
        budget: number;
        popularity: number;
        corruption: number;
        population: {
            total: number;
            homeless: number;
            unemployedPercent: number;
        };
    };
    traits: {
        economicBonus: number; // % bonus to budget income
        popularityDecay: number; // How fast popularity drops
        corruptionTendency: number; // How fast corruption grows
    };
}

export const LEADERS: Leader[] = [
    {
        id: "populist",
        name: "El Populista",
        title: "\"Del pueblo para el pueblo\"",
        icon: "👔",
        description: "Mucha plata, mucha gente, pero la corrupción ya está instalada. Arrancás con presupuesto alto y popularidad, pero la coima es parte del sistema.",
        startingConditions: {
            budget: 2000000,
            popularity: 80,
            corruption: 30,
            population: {
                total: 500,
                homeless: 50,
                unemployedPercent: 0.3
            }
        },
        traits: {
            economicBonus: 20,
            popularityDecay: 0.5,
            corruptionTendency: 2
        }
    },
    {
        id: "technocrat",
        name: "El Tecnócrata",
        title: "\"Eficiencia ante todo\"",
        icon: "💼",
        description: "Presupuesto ajustado, poca gente, pero todo en orden. Empezás con menos recursos pero sin corrupción. La gestión es prolija.",
        startingConditions: {
            budget: 800000,
            popularity: 50,
            corruption: 5,
            population: {
                total: 200,
                homeless: 10,
                unemployedPercent: 0.1
            }
        },
        traits: {
            economicBonus: 5,
            popularityDecay: 1,
            corruptionTendency: 0.5
        }
    },
    {
        id: "caudillo",
        name: "El Caudillo",
        title: "\"Mano dura y corazón grande\"",
        icon: "🎖️",
        description: "Popularidad alta, mucha gente sin casa, presupuesto medio. La gente te ama pero hay mucho por hacer. Carisma sobre gestión.",
        startingConditions: {
            budget: 1200000,
            popularity: 90,
            corruption: 15,
            population: {
                total: 600,
                homeless: 150,
                unemployedPercent: 0.5
            }
        },
        traits: {
            economicBonus: 10,
            popularityDecay: 0.3,
            corruptionTendency: 1.5
        }
    }
];
