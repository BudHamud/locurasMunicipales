interface MapControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
}

export default function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
    return (
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-30">
            <button
                onClick={onZoomIn}
                className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center font-black hover:bg-blue-600 transition-colors"
            >
                +
            </button>
            <button
                onClick={onZoomOut}
                className="w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center font-black hover:bg-blue-600 transition-colors"
            >
                -
            </button>
            <button
                onClick={onReset}
                className="w-10 h-10 bg-arg-gold text-black rounded-xl border border-white/10 flex items-center justify-center font-black shadow-lg active:scale-95 transition-transform"
            >
                🎯
            </button>
        </div>
    );
}