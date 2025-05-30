
type ResumenCardProps = {
    icon: React.ReactNode;         // Icono (puede ser emoji o SVG)
    label: string;                 // Texto (Ej: Colonias)
    value: number | string;        // Número o texto destacado
    className?: string;            // Estilo adicional opcional
  };
  
  export default function ResumenCard({ icon, label, value, className = '' }: ResumenCardProps) {
    return (
      <div className={`bg-purple-600 text-white rounded-xl p-6 shadow-md flex items-center gap-4 ${className}`}>
        {/* Icono */}
        <div className="text-4xl">{icon}</div>
  
        {/* Texto */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold font-poppins">{label}</span>
          <span className="text-2xl font-bold font-poppins">{value}</span>
        </div>
      </div>
    );
  }
  