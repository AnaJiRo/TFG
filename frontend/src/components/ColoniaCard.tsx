import { Colonia } from '../types/index'; //types/index.ts

type ColoniaCardProps = {
  colonia: Colonia;
  editable?: boolean;
  onClick?: (id: string) => void;
};

const diasOrden = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function ColoniaCard({ colonia, editable = true, onClick }: ColoniaCardProps) {
  return (
    <div
      onClick={() => onClick?.(colonia.id)}
      className="bg-fuchsia-300/80 p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
        <span>📍</span>
        {colonia.nombre}
      </h2>
      <p className="text-purple-100 mb-4">Zona: {colonia.zona}</p>

      {/* Días de la semana */}
      <div className="flex justify-between font-semibold text-sm mb-1">
        {diasOrden.map((dia) => (
          <span key={dia}>{dia}</span>
        ))}
      </div>
      <div className="flex justify-between text-xl">
        {diasOrden.map((dia) => (
          <span
            key={dia}
            className={colonia.dias[dia] ? 'text-green-400' : 'text-red-400'}
          >
            {colonia.dias[dia] ? '🟢' : '🔴'}
          </span>
        ))}
      </div>

      {/* Botón editable */}
      {editable && (
        <div className="mt-4 flex justify-center">
          <button className="bg-fuchsiaTheme-primary text-white border border-purpleTheme-primary hover:bg-purple-700 
          px-4 py-2 rounded-lg font-poppins transition-colors duration-300">
            Ver detalles
          </button>
        </div>
      )}
    </div>
  );
}
