import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import ColoniaCard from '../components/ColoniaCard';
import { Colonia } from '../types';
import { useEffect, useState } from 'react';
import { getColonias } from '../api/coloniasService';

// Días en orden para mostrar en ColoniaCard (por si no vienen ordenados del backend)
const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// Datos de prueba mientras no tenemos API
const coloniasDummy: Colonia[] = [
  {
    id: '1',
    nombre: 'Eleven',
    zona: 'La Nana',
    dias: { L: true, M: true, X: false, J: true, V: true, S: true, D: true },
  },
  {
    id: '2',
    nombre: 'Guarderia',
    zona: 'La Nana',
    dias: { L: true, M: false, X: false, J: true, V: true, S: true, D: true },
  },
  {
    id: '3',
    nombre: 'Centro Salud',
    zona: 'Los Ratones',
    dias: { L: false, M: false, X: false, J: false, V: false, S: true, D: true },
  },
];

export default function DashboardColoniasPage() {
  const navigate = useNavigate();

  // Estado real (desactivado por ahora)
  const [colonias, setColonias] = useState<Colonia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Activar cuando esté lista la API real de colonias
  /*
  useEffect(() => {
    const fetchColonias = async () => {
      try {
        setLoading(true);
        const data = await getColonias();
        setColonias(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las colonias');
      } finally {
        setLoading(false);
      }
    };

    fetchColonias();
  }, []);
  */

  // Al hacer clic en una card → ir al detalle de esa colonia
  const goToDetails = (id: string) => navigate(`/colonias/${id}`);

  // Al pulsar "Añadir colonia" → vista nueva colonia
  const goToCreate = () => navigate('/colonias/nueva');

  return (
    <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito">
      {/* Título principal */}
      <h1 className="text-3xl font-bold font-poppins text-center mb-6">
        GESTIÓN DE COLONIAS
      </h1>

      {/* Botón para crear nueva colonia */}
      <div className="flex justify-center mb-8">
        <Button label="+ Añadir colonia" onClick={goToCreate} variant="tertiary" />
      </div>

      {/* 🧭 Bloque visual reservado para filtros */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6 items-center">
            {/* TODO: Aquí irán los filtros por zona y estado */}

            {/* TODO: Filtro por zona (cuando esté disponible desde el backend) */}
            {/* <select className="px-3 py-2 rounded-md text-black">
                    <option value="">Todas las zonas</option>
                    <option value="centro">Centro</option>
                    <option value="norte">Norte</option>
                    <option value="oeste">Oeste</option>
            </select> */}

            {/* TODO: Checkbox para mostrar solo colonias incompletas */}
            {/* <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">Solo incompletas</span>
                </label> */}
      </div>


      {/* Muestra loading o error (cuando uses la API real) */}
      {loading && <p className="text-center">Cargando colonias...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Listado de colonias en formato grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TODO: reemplazar coloniasDummy por colonias cuando esté lista la API */}
        {/*{(colonias.length ? colonias : coloniasDummy).map((colonia) => ( */}
        {coloniasDummy.map((colonia) => (
          <ColoniaCard
            key={colonia.id}
            colonia={colonia}
            editable={true}
            onClick={goToDetails}
          />
        ))}
      </div>
s
      {/* TODO: Mostrar mensaje si no hay colonias disponibles */}
    </div>
  );
}