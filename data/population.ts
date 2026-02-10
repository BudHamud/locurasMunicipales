import { CityTile } from "./mapSchema";

export interface Citizen {
    id: string;
    name: string;
    age: number;
    household: string; // Household ID
    employment: 'employed' | 'unemployed' | 'homeless';
    happiness: number; // 0-100
    needs: {
        housing: number; // 0-100, 0 = homeless
        food: number; // 0-100
        healthcare: number; // 0-100
        safety: number; // 0-100
    };
    location?: { x: number; y: number }; // Which building they live in
}

export interface Household {
    id: string;
    members: string[]; // Citizen IDs
    income: number;
    location?: { x: number; y: number };
}

export interface PopulationStats {
    total: number;
    employed: number;
    unemployed: number;
    homeless: number;
    averageHappiness: number;
    housingCapacity: number;
    housingOccupied: number;
}

export interface CityState {
    budget: number;
    popularity: number;
    corruption: number;
    mapData: CityTile[];
}

export interface PopulationEvent {
    type: 'immigration' | 'emigration' | 'homeless_crisis' | 'unemployment_crisis' | 'happiness_boost';
    count?: number;
    message?: string;
}

// Helper functions for citizen AI
function calculateHousingNeed(citizen: Citizen, cityState: CityState): number {
    if (citizen.employment === 'homeless') return 0;

    // Check if there's available housing
    const houses = cityState.mapData.filter(t =>
        ['house', 'hospital', 'school'].includes(t.type) &&
        t.condition !== 'ruined'
    );

    const housingAvailable = houses.length > 0;
    return housingAvailable ? 80 : 20;
}

function calculateFoodNeed(citizen: Citizen, cityState: CityState): number {
    // Food availability based on markets and budget
    const markets = cityState.mapData.filter(t => t.type === 'market').length;
    const baseFood = 50 + (markets * 10);

    // Homeless have less access to food
    if (citizen.employment === 'homeless') return baseFood * 0.5;
    if (citizen.employment === 'unemployed') return baseFood * 0.7;

    return Math.min(100, baseFood);
}

function calculateHealthcareNeed(citizen: Citizen, cityState: CityState): number {
    const hospitals = cityState.mapData.filter(t =>
        t.type === 'hospital' && t.condition !== 'ruined'
    ).length;

    return Math.min(100, 30 + (hospitals * 20));
}

function calculateSafetyNeed(citizen: Citizen, cityState: CityState): number {
    const police = cityState.mapData.filter(t =>
        t.type === 'police' && t.condition !== 'ruined'
    ).length;

    // High corruption reduces safety
    const corruptionPenalty = cityState.corruption * 0.5;
    const baseSafety = 50 + (police * 15) - corruptionPenalty;

    return Math.max(0, Math.min(100, baseSafety));
}

function determineEmployment(citizen: Citizen, cityState: CityState): Citizen['employment'] {
    // Simple employment logic based on city infrastructure
    const totalBuildings = cityState.mapData.filter(t =>
        !['empty', 'street'].includes(t.type)
    ).length;

    // More buildings = more jobs
    const employmentRate = Math.min(0.8, totalBuildings / 100);

    if (citizen.employment === 'homeless') {
        // Homeless need housing first
        const hasHousing = citizen.needs.housing > 50;
        if (hasHousing && Math.random() < 0.3) {
            return 'unemployed';
        }
        return 'homeless';
    }

    if (citizen.employment === 'unemployed') {
        // Chance to get employed
        if (Math.random() < employmentRate) {
            return 'employed';
        }
    }

    if (citizen.employment === 'employed') {
        // Small chance to lose job if corruption is high
        if (cityState.corruption > 70 && Math.random() < 0.1) {
            return 'unemployed';
        }
    }

    return citizen.employment;
}

export function updateCitizen(citizen: Citizen, cityState: CityState): Citizen {
    // Calculate needs based on city infrastructure
    const housing = calculateHousingNeed(citizen, cityState);
    const food = calculateFoodNeed(citizen, cityState);
    const healthcare = calculateHealthcareNeed(citizen, cityState);
    const safety = calculateSafetyNeed(citizen, cityState);

    // Calculate happiness from needs
    const happiness = (housing + food + healthcare + safety) / 4;

    // Determine employment based on city economy
    const employment = determineEmployment(citizen, cityState);

    return {
        ...citizen,
        needs: { housing, food, healthcare, safety },
        happiness,
        employment
    };
}

export function simulatePopulation(
    citizens: Citizen[],
    cityState: CityState
): { citizens: Citizen[]; events: PopulationEvent[] } {
    const events: PopulationEvent[] = [];

    // Update all citizens
    const updatedCitizens = citizens.map(c => updateCitizen(c, cityState));

    // Calculate stats
    const avgHappiness = updatedCitizens.reduce((sum, c) => sum + c.happiness, 0) / updatedCitizens.length;
    const homelessCount = updatedCitizens.filter(c => c.employment === 'homeless').length;
    const unemployedCount = updatedCitizens.filter(c => c.employment === 'unemployed').length;

    // Migration logic
    if (avgHappiness > 70 && updatedCitizens.length < 1000) {
        // People want to move in
        const immigrantCount = Math.floor(Math.random() * 5) + 1;
        events.push({
            type: 'immigration',
            count: immigrantCount,
            message: `${immigrantCount} nuevas familias llegaron a la ciudad`
        });
    } else if (avgHappiness < 30 && updatedCitizens.length > 50) {
        // People want to leave
        const emigrantCount = Math.floor(Math.random() * 3) + 1;
        events.push({
            type: 'emigration',
            count: emigrantCount,
            message: `${emigrantCount} familias se fueron de la ciudad`
        });
    }

    // Generate events based on population state
    if (homelessCount > 20) {
        events.push({
            type: 'homeless_crisis',
            message: `Crisis de vivienda: ${homelessCount} personas sin hogar`
        });
    }

    if (unemployedCount > 30) {
        events.push({
            type: 'unemployment_crisis',
            message: `Crisis de empleo: ${unemployedCount} desempleados`
        });
    }

    if (avgHappiness > 80) {
        events.push({
            type: 'happiness_boost',
            message: 'La gente está contenta con la gestión'
        });
    }

    return { citizens: updatedCitizens, events };
}

export function calculatePopulationStats(citizens: Citizen[], mapData: CityTile[]): PopulationStats {
    const total = citizens.length;
    const employed = citizens.filter(c => c.employment === 'employed').length;
    const unemployed = citizens.filter(c => c.employment === 'unemployed').length;
    const homeless = citizens.filter(c => c.employment === 'homeless').length;
    const averageHappiness = citizens.reduce((sum, c) => sum + c.happiness, 0) / total || 0;

    // Calculate housing capacity
    const houses = mapData.filter(t =>
        ['house', 'hospital', 'school'].includes(t.type) &&
        t.condition !== 'ruined'
    );
    const housingCapacity = houses.length * 4; // 4 people per building
    const housingOccupied = total - homeless;

    return {
        total,
        employed,
        unemployed,
        homeless,
        averageHappiness: Math.round(averageHappiness),
        housingCapacity,
        housingOccupied
    };
}

// Generate initial population
export function generateInitialPopulation(count: number, homelessPercent: number = 0.1): Citizen[] {
    const citizens: Citizen[] = [];
    const argentineNames = [
        "Juan", "María", "Carlos", "Ana", "Diego", "Laura", "Martín", "Sofía",
        "Pablo", "Lucía", "Fernando", "Valentina", "Javier", "Camila", "Rodrigo"
    ];

    for (let i = 0; i < count; i++) {
        const isHomeless = Math.random() < homelessPercent;
        const isUnemployed = !isHomeless && Math.random() < 0.2;

        citizens.push({
            id: `citizen-${i}`,
            name: argentineNames[Math.floor(Math.random() * argentineNames.length)],
            age: Math.floor(Math.random() * 60) + 18,
            household: `household-${Math.floor(i / 3)}`, // 3 people per household
            employment: isHomeless ? 'homeless' : isUnemployed ? 'unemployed' : 'employed',
            happiness: 50,
            needs: {
                housing: isHomeless ? 0 : 70,
                food: 60,
                healthcare: 50,
                safety: 50
            }
        });
    }

    return citizens;
}
