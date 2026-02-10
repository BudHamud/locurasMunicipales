export type TileType = 
  | 'street' | 'house' | 'hospital' | 'school' | 'empty' | 'park'
  | 'police' | 'plaza' | 'market' | 'corruption_site' | 'construction'
  | 'municipalidad' | 'parrilla' | 'monument' | 'theater' | 'government_palace';

export interface CityTile {
  id: string;
  type: TileType;
  condition: 'ruined' | 'poor' | 'good' | 'pristine';
  x: number; // Posición en la grilla
  y: number;
  builtObraId?: string; // Links to OBRAS_DISPONIBLES
  repairCost?: number; // Dynamic cost based on condition
  lastModified?: number; // Timestamp for decay system
}

export interface TileAction {
  id: string;
  label: string;
  cost: number;
  effects: {
    budget?: number;
    popularity?: number;
    corruption?: number;
  };
  condition?: ('ruined' | 'poor' | 'good' | 'pristine')[]; // Only available in certain conditions
}