import { ColoniaAsignacion, DiaSemana } from "../types/index"; //types/index.ts
import { diasSemana } from "../utils/constants";

type ColoniaCardProps = {
  colonia: ColoniaAsignacion;
  editable?: boolean;
  onClick?: (id: string) => void;
};

const diasApi = [
  { key: "monday", label: "L" },
  { key: "tuesday", label: "M" },
  { key: "wednesday", label: "X" },
  { key: "thursday", label: "J" },
  { key: "friday", label: "V" },
  { key: "saturday", label: "S" },
  { key: "sunday", label: "D" },
];

export default function ColoniaCard({
  colonia,
  editable = true,
  onClick,
}: ColoniaCardProps) {
  console.log("ColoniaCard", colonia);
  return (
    <div
      onClick={() => onClick?.(colonia.id)}
      className="bg-fuchsia-300/80 p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
        <span>📍</span>
        {colonia.colonia}
      </h2>
      <p className="text-purple-100 mb-4">Zona: {colonia.zona}</p>

      {/* Días de la semana */}
      <div className="flex justify-between font-semibold text-sm mb-1">
        {diasSemana.map((dia) => (
          <span key={dia}>{dia || "-"}</span>
        ))}
      </div>
      <div className="flex justify-between text-xl">
        {diasApi.map(({ key }) => (
          <span
            key={key}
            className={
              colonia.asignaciones[key as DiaSemana]
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {colonia.asignaciones[key as DiaSemana] ? "🟢" : "🔴"}
          </span>
        ))}
      </div>

      {/* Botón editable */}
      {editable && (
        <div className="mt-4 flex justify-center">
          <button
            className="bg-fuchsiaTheme-primary text-white border border-purpleTheme-primary hover:bg-purple-700 
          px-4 py-2 rounded-lg font-poppins transition-colors duration-300"
          >
            Ver detalles
          </button>
        </div>
      )}
    </div>
  );
}
