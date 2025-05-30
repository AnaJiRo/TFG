import ResumenCard from '../components/ResumenCard';
import { useNavigate } from 'react-router-dom';

// TODO: reemplazar por datos reales más adelante
const resumen = {
  colonias: 8,
  voluntarios: 12,
  diasSinCubrir: 5,
};

const coloniasSinCubrir = [
  { nombre: 'Triana', zona: 'Centro', dias: ['Martes'] },
  { nombre: 'Santa Cruz', zona: 'Este', dias: ['Domingo'] },
  { nombre: 'Los Ratones', zona: 'Norte', dias: [] }, // sin ningún voluntario
];

const voluntariosHoy = [
  { nombre: 'Laura S.', zona: 'Centro', estado: 'activo' },
  { nombre: 'Carmen P.', zona: 'Norte', estado: 'activo' },
  { nombre: 'Hugo', zona: 'Oeste', estado: 'baja' },
  { nombre: 'Admin', zona: 'Todas', estado: 'admin' },
];

export default function DashboardAdminPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 text-white p-6 font-nunito">
      <h1 className="text-3xl font-bold mb-6 font-poppins">Dashboard del Administrador</h1>

      {/* 📌 Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <ResumenCard icon="🐱" label="Colonias" value={resumen.colonias} />
        <ResumenCard icon="👥" label="Voluntarios" value={resumen.voluntarios} />
        <ResumenCard icon="❗" label="Días sin cubrir" value={resumen.diasSinCubrir} />
      </div>

      {/* ❗ Colonias sin cubrir */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Colonias sin cubrir</h2>
        <div className="space-y-2">
          {coloniasSinCubrir.map((colonia) => (
            <div key={colonia.nombre} className="bg-white/10 p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{colonia.nombre} <span className="text-white/70">({colonia.zona})</span></p>
                <p className="text-sm">
                  {colonia.dias.length > 0
                    ? `Falta: ${colonia.dias.join(', ')} ❌`
                    : 'Sin voluntarios asignados ❌'}
                </p>
              </div>
              <button
                className="text-sm text-purpleTheme-primary underline"
                onClick={() => navigate('/colonias')}
              >
                Ver
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Voluntarios activos hoy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Voluntarios activos hoy</h2>
        <ul className="space-y-1">
          {voluntariosHoy.map((v) => (
            <li key={v.nombre}>
              {v.estado === 'activo' && `✅`}
              {v.estado === 'baja' && `⚠️`}
              {v.estado === 'admin' && `👑`} {v.nombre} <span className="text-white/70">({v.zona})</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ⚙️ Accesos rápidos */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          <button
            className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 transition"
            onClick={() => navigate('/colonias/nueva')}
          >
            + Añadir colonia
          </button>
          <button
            className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 transition"
            onClick={() => navigate('/voluntarios')}
          >
            + Asignar voluntario
          </button>
          <button
            className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600 transition"
            onClick={() => alert('Función en construcción')}
          >
            + Planificación
          </button>
        </div>
      </section>
    </div>
  );
}