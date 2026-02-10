import { TileType } from "./mapSchema";

export interface Obra {
  id: string;
  title: string;
  cost: number;
  corruption: number;
  popularity: number;
  icon: string;
  level: number;
  tileType: TileType;
  description: string;
}

export const OBRAS_DISPONIBLES: Obra[] = [
  {
    id: "sanguchitos",
    title: "Min. de Sánguches",
    cost: 50000,
    corruption: 5,
    popularity: 2,
    icon: "🥪",
    level: 1,
    tileType: "market",
    description: "Un mercado de sánguches que nadie pidió"
  },
  {
    id: "estadio",
    title: "Estadio 'El Diego'",
    cost: 500000,
    corruption: 15,
    popularity: 25,
    icon: "⚽",
    level: 2,
    tileType: "park",
    description: "Para que el pueblo tenga pan y circo"
  },
  {
    id: "plaza",
    title: "Plaza Central",
    cost: 25000,
    corruption: 0,
    popularity: 8,
    icon: "🌳",
    level: 1,
    tileType: "park",
    description: "Un espacio verde que realmente necesitaban"
  },
  {
    id: "comisaria",
    title: "Comisaría",
    cost: 120000,
    corruption: -5,
    popularity: 10,
    icon: "🚔",
    level: 2,
    tileType: "police",
    description: "Reduce la corrupción... en teoría"
  },
  {
    id: "mate_plaza",
    title: "Plaza del Mate",
    cost: 80000,
    corruption: 0,
    popularity: 15,
    icon: "🧉",
    level: 2,
    tileType: "plaza",
    description: "Un lugar para tomar mate y hablar de política"
  },
  {
    id: "parrilla",
    title: "Parrilla Municipal",
    cost: 150000,
    corruption: 8,
    popularity: 20,
    icon: "🥩",
    level: 3,
    tileType: "parrilla",
    description: "Asados gratis los domingos (con fondos públicos)"
  },
  {
    id: "hospital_publico",
    title: "Hospital Público",
    cost: 300000,
    corruption: 5,
    popularity: 30,
    icon: "🏥",
    level: 3,
    tileType: "hospital",
    description: "Salud para todos (si hay insumos)"
  },
  {
    id: "escuela",
    title: "Escuela Primaria",
    cost: 200000,
    corruption: 2,
    popularity: 25,
    icon: "🏫",
    level: 3,
    tileType: "school",
    description: "Educación pública de calidad (en teoría)"
  },
  // Iconic Argentine Landmarks
  {
    id: "el_pincho",
    title: "El Pincho",
    cost: 800000,
    corruption: 25,
    popularity: 40,
    icon: "🗼",
    level: 5,
    tileType: "monument",
    description: "Un obelisco que nadie pidió pero todos fotografían. Costo inflado 300%"
  },
  {
    id: "teatro_gardel",
    title: "Teatro Gardel",
    cost: 1200000,
    corruption: 15,
    popularity: 50,
    icon: "🎭",
    level: 5,
    tileType: "theater",
    description: "Ópera de clase mundial. Los vecinos prefieren cumbia, pero queda lindo"
  },
  {
    id: "palacio_municipal",
    title: "Palacio Municipal",
    cost: 2000000,
    corruption: 30,
    popularity: 35,
    icon: "🏛️",
    level: 6,
    tileType: "government_palace",
    description: "Sede del poder. Color rosa porque sí. Incluye helipuerto para emergencias"
  }
];