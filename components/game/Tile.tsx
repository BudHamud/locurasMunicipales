import { TileType } from "@/data/mapSchema";

interface TileProps {
  type: TileType;
  condition: string;
  isSelected?: boolean;
  isHovered?: boolean;
  isPlacementPreview?: boolean;
  isValidPlacement?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Tile({
  type,
  condition,
  isSelected = false,
  isHovered = false,
  isPlacementPreview = false,
  isValidPlacement = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: TileProps) {
  const getVisuals = () => {
    switch (type) {
      case 'empty':
        return {
          icon: '',
          color: 'bg-white/5 hover:bg-white/10' // Subtle visibility for empty lots
        };
      case 'street':
        return {
          icon: '', // NO ICON - just color
          color: condition === 'ruined' ? 'bg-gray-700' :
            condition === 'poor' ? 'bg-gray-600' :
              condition === 'good' ? 'bg-gray-500' : 'bg-gray-400'
        };
      case 'house':
        return {
          icon: condition === 'ruined' ? '🏚️' : '🏠',
          color: condition === 'ruined' ? 'bg-orange-900/20' : 'bg-orange-800/30'
        };
      case 'hospital':
        return {
          icon: '🏥',
          color: condition === 'ruined' ? 'bg-red-900/20' : 'bg-red-800/30'
        };
      case 'school':
        return {
          icon: '🏫',
          color: condition === 'ruined' ? 'bg-blue-900/20' : 'bg-blue-800/30'
        };
      case 'police':
        return {
          icon: '🚔',
          color: condition === 'ruined' ? 'bg-indigo-900/20' : 'bg-indigo-800/30'
        };
      case 'park':
      case 'plaza':
        return {
          icon: type === 'plaza' ? '🧉' : '🌳',
          color: condition === 'ruined' ? 'bg-green-900/20' : 'bg-green-800/30'
        };
      case 'market':
        return {
          icon: '🥪',
          color: condition === 'ruined' ? 'bg-yellow-900/20' : 'bg-yellow-800/30'
        };
      case 'parrilla':
        return {
          icon: '🥩',
          color: 'bg-red-700/30'
        };
      case 'monument':
        return {
          icon: '🗼',
          color: 'bg-gray-600/40'
        };
      case 'theater':
        return {
          icon: '🎭',
          color: 'bg-purple-800/30'
        };
      case 'government_palace':
        return {
          icon: '🏛️',
          color: 'bg-pink-700/30'
        };
      case 'corruption_site':
        return {
          icon: '💰',
          color: 'bg-yellow-600/40'
        };
      case 'construction':
        return {
          icon: '🚧',
          color: 'bg-orange-600/40'
        };
      default:
        return {
          icon: '',
          color: 'bg-transparent'
        };
    }
  };

  const { icon, color } = getVisuals();

  // Build dynamic classes
  const baseClasses = "w-full h-full border-[0.5px] border-white/5 flex items-center justify-center relative group transition-all duration-200";
  const interactiveClasses = onClick ? "cursor-pointer hover:border-white/20" : "";
  const selectedClasses = isSelected ? "ring-2 ring-blue-400 ring-inset z-10 shadow-lg shadow-blue-400/50" : "";
  const hoveredClasses = isHovered && !isPlacementPreview ? "border-white/30 bg-white/5" : "";
  const previewClasses = isPlacementPreview ? (isValidPlacement ? "bg-green-500/20 border-green-400" : "bg-red-500/20 border-red-400") : "";

  return (
    <div
      className={`${baseClasses} ${color} ${interactiveClasses} ${selectedClasses} ${hoveredClasses} ${previewClasses}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`text-2xl transition-all ${condition === 'ruined' ? 'grayscale opacity-50' : ''} ${isSelected ? 'scale-110' : ''}`}>
        {icon}
      </span>

      {/* Efecto de baches para calles en mal estado */}
      {type === 'street' && condition === 'ruined' && (
        <div className="absolute inset-0 flex flex-wrap gap-1 p-1 opacity-30">
          <div className="w-1 h-1 bg-black rounded-full" />
          <div className="w-2 h-1 bg-black/50 rounded-full mt-2" />
        </div>
      )}

      {/* Indicator for placement preview */}
      {isPlacementPreview && (
        <div className="absolute top-0 right-0 text-xs">
          {isValidPlacement ? '✓' : '✗'}
        </div>
      )}

      {/* Hover tooltip hint */}
      {isHovered && !isPlacementPreview && onClick && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Click para inspeccionar
        </div>
      )}
    </div>
  );
}