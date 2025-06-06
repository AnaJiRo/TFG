import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import ColoniaCard from "../components/ColoniaCard";
import { ColoniaAsignacion } from "../types";
import { useState, useEffect } from "react";
import { getColonies, deleteColonia } from "../api/coloniasService";

export default function DashboardColoniasPage() {
  const navigate = useNavigate();

  const [colonias, setColonias] = useState<ColoniaAsignacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteColonia = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta colonia?"))
      return;
    try {
      await deleteColonia(id);
      setColonias((prev) => prev.filter((colonia) => colonia.id !== id));
      alert("Colonia eliminada correctamente.");
    } catch {
      alert("Error al eliminar la colonia.");
    }
  };

  useEffect(() => {
    const fetchColonias = async () => {
      try {
        setLoading(true);
        const data = await getColonies();
        setColonias(data);
      } catch {
        setError("No se pudieron cargar las colonias");
      } finally {
        setLoading(false);
      }
    };
    fetchColonias();
  }, []);

  const goToDetails = (id: string) => navigate(`/colonias/${id}`);

  const goToCreate = () => navigate("/colonias/nueva");

  return (
    <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito">
      <h1 className="text-4xl font-bold font-poppins text-center mb-6 flex items-center justify-center gap-4">
        <img
          src="/assets/Colonias/pawhouse.svg"
          alt="Voluntarios"
          className="w-14 h-14"
        />
        GESTIÓN DE COLONIAS
      </h1>
      <div className="flex justify-center mb-8">
        <Button
          label="+ Añadir colonia"
          onClick={goToCreate}
          variant="tertiary"
        />
      </div>
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
      {loading && <p className="text-center">Cargando colonias...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colonias.map((colonia) => (
          <div key={colonia.id} className="relative group">
            <ColoniaCard
              colonia={colonia}
              editable={true}
              onClick={goToDetails}
            />
            <button
              onClick={() => handleDeleteColonia(colonia.id)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white z-10 shadow group-hover:scale-110 transition-transform"
              title="Eliminar colonia"
            >
              <img
                src="/assets/icons/trash.svg"
                alt="Eliminar"
                className="w-4 h-4"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
