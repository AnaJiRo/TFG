type ColoniaMiniCardProps = {
    nombre: string;
    zona: string;
    mensaje: string;
    onClick?: () => void;
  };
  
  export default function ColoniaMiniCard({ nombre, zona, mensaje, onClick }: ColoniaMiniCardProps) {
    return (
      <div
        onClick={onClick}
        className="bg-purple-300/70 rounded-xl shadow-md p-4 w-full max-w-xs cursor-pointer hover:bg-purple-300 transition-colors flex flex-col gap-1"
      >
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📍</span> {nombre}
        </h3>
        <p className="text-white/80 text-sm">Zona: {zona}</p>
        <p className="text-white text-sm mt-1 flex items-center gap-1">
          <span>❌</span> {mensaje}
        </p>
      </div>
    );
  }
  