interface Leader {
  _id?: ObjectId;
  option: number;
  name: string;
  img: string;
  ideology: string;
  stats: {
    money: number;
    corruption: number;
    popularity: number;
    influence: number;
    satisfaction: number;
    unemployment: number;
    crime: number;
    health: number;
    education: number;
  };
}

interface UserData {
  id: string; // Identificador único del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario (opcional)
  leader?: Leader; // Información del líder elegido (si ya ha elegido uno)
  decisions?: Decision[]; // Historial de decisiones tomadas por el usuario
  stats?: GameStats; // Estadísticas del juego del usuario
  createdAt: Date; // Fecha de creación del usuario
  updatedAt: Date;
}

interface LeaderStats {
  money: number;
  corruption: number;
  popularity: number;
  influence: number;
  satisfaction: number;
  unemployment: number;
  crime: number;
  health: number;
  education: number;
}

interface Decision {
  decisionId: string; // Identificador único de la decisión
  decisionType: string; // Tipo de decisión (por ejemplo, política, económica, social)
  description: string; // Descripción de la decisión
  impact: Impact; // Impacto de la decisión en las estadísticas del juego
  createdAt: Date; // Fecha en que se tomó la decisión
}

interface Impact {
  money: number;
  corruption: number;
  popularity: number;
  influence: number;
  satisfaction: number;
  unemployment: number;
  crime: number;
  health: number;
  education: number;
}

interface GameStats {
  money: number;
  corruption: number;
  popularity: number;
  influence: number;
  satisfaction: number;
  unemployment: number;
  crime: number;
  health: number;
  education: number;
}

interface Event {
  id: number;
  title: string;
}

interface DayProps {
  day: number;
  currentDay: number;
  advanceDay: (day: number) => void;
  events: Event[];
}