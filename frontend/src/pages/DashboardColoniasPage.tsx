import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import ColoniaCard from "../components/ColoniaCard";
import { ColoniaAsignacion } from "../types";
import { useState, useEffect } from "react";
import { getColonies, deleteColonia } from "../api/coloniasService";
import { jwtDecode } from "jwt-decode";

export default function DashboardColoniasPage() {
  const navigate = useNavigate();

  const [colonias, setColonias] = useState<ColoniaAsignacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleDeleteColonia = async (id: string) => {
    // TODO: filtrar por roles
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
        // get user role from localStorage or context
        const token = localStorage.getItem("access_token");
        if (token) {
          const decodedToken = jwtDecode<{ role: string }>(token);
          setUserRole(decodedToken.role);
        } else {
          setUserRole(null);
        }
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
      {userRole === "admin" && (
        <div className="flex justify-center mb-8">
          <Button
            label="+ Añadir colonia"
            onClick={goToCreate}
            variant="tertiary"
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6 items-center"></div>
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
            {userRole === "admin" && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
