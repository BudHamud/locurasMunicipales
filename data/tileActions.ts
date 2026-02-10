import { TileAction } from "./mapSchema";

export const TILE_ACTIONS: Record<string, TileAction> = {
    repair_street_ruined: {
        id: "repair_street_ruined",
        label: "Reparar Calle",
        cost: 15000,
        effects: { popularity: 5 },
        condition: ["ruined"]
    },
    repair_street_poor: {
        id: "repair_street_poor",
        label: "Mejorar Calle",
        cost: 25000,
        effects: { popularity: 3 },
        condition: ["poor"]
    },
    upgrade_street: {
        id: "upgrade_street",
        label: "Asfalto Premium",
        cost: 40000,
        effects: { popularity: 2 },
        condition: ["good"]
    },
    maintain_street: {
        id: "maintain_street",
        label: "Mantenimiento Preventivo",
        cost: 8000,
        effects: { popularity: 1 },
        condition: ["good", "pristine"]
    },
    repair_building: {
        id: "repair_building",
        label: "Reparar Edificio",
        cost: 30000,
        effects: { popularity: 8 },
        condition: ["ruined", "poor"]
    },
    demolish: {
        id: "demolish",
        label: "Demoler",
        cost: 5000,
        effects: { popularity: -2 },
        condition: ["ruined", "poor", "good", "pristine"]
    },
    investigate_corruption: {
        id: "investigate_corruption",
        label: "Investigar Corrupción",
        cost: 50000,
        effects: { corruption: -10, popularity: -5 },
        condition: ["ruined", "poor", "good", "pristine"]
    },
    build_street: {
        id: "build_street",
        label: "Construir Calle",
        cost: 50000,
        effects: { popularity: -2 },
        condition: ["poor", "good", "pristine"]
    },
    remove_street: {
        id: "remove_street",
        label: "Demoler Calle",
        cost: 100000,
        effects: { popularity: -10, corruption: 5 },
        condition: ["ruined", "poor", "good", "pristine"]
    }
};

// Helper function to get available actions for a tile
export function getAvailableActions(
    tileType: string,
    condition: 'ruined' | 'poor' | 'good' | 'pristine'
): TileAction[] {
    const actions: TileAction[] = [];

    if (tileType === 'street') {
        if (condition === 'ruined') actions.push(TILE_ACTIONS.repair_street_ruined);
        if (condition === 'poor') actions.push(TILE_ACTIONS.repair_street_poor);
        if (condition === 'good') actions.push(TILE_ACTIONS.upgrade_street);
        if (condition === 'good' || condition === 'pristine') {
            actions.push(TILE_ACTIONS.maintain_street);
        }
    }

    if (['house', 'hospital', 'school', 'market', 'police'].includes(tileType)) {
        if (condition === 'ruined' || condition === 'poor') {
            actions.push(TILE_ACTIONS.repair_building);
        }
    }

    if (tileType === 'corruption_site') {
        actions.push(TILE_ACTIONS.investigate_corruption);
    }

    // Demolish is available for most building types
    if (!['empty', 'street', 'monument', 'theater', 'government_palace'].includes(tileType)) {
        actions.push(TILE_ACTIONS.demolish);
    }

    // Build street on empty tiles
    if (tileType === 'empty') {
        actions.push(TILE_ACTIONS.build_street);
    }

    // Remove street (expensive!)
    if (tileType === 'street') {
        actions.push(TILE_ACTIONS.remove_street);
    }

    return actions;
}
