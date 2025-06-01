import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import FormContainer from "../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { validateColoniaData } from "../utils/validators";
import { Colonia, getColoniasById } from "../api/coloniasService";

export default function EditarColoniaPage() {
  const { id } = useParams(); // en el futuro para obtener desde /colonias/:id
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [zona, setZona] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [colonia, setColonia] = useState<Colonia | null>(null);

  const fetchColonyDetails = async () => {
    if (!id) {
      setError("ID de colonia no especificado");
      return;
    }
    try {
      const colony = await getColoniasById(id);

      setColonia(colony);
      setNombre(colony.name);
      setUbicacion(colony.ubication);
      setZona(colony.zone);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las colonias");
    }
  };

  useEffect(() => {
    fetchColonyDetails();
  }, []);

  const handleSubmit = () => {
    const errorMessage = validateColoniaData({
      nombre,
      ubicacion,
      zona,
    });
    if (errorMessage) return setError(errorMessage);
    setError(null);

    navigate("/colonias");
  };

  // Explicación: validamos que al menos un día tenga una asignación
  const isValid = nombre && ubicacion && zona;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
      <FormContainer maxWidth="max-w-5xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">
            Editar Colonia
          </h1>
          <p className="text-white/90 mt-1 font-nunito">
            Modifica los datos de la colonia seleccionada
          </p>
        </div>

        <div className="flex justify-center">
          <div className="space-y-4 w-full max-w-md">
            <Input
              label="Nombre de la colonia"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              label="Ubicación"
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
            <Input
              label="Zona"
              type="text"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <Button
            label="Guardar cambios"
            variant="tertiary"
            onClick={handleSubmit}
            disabled={!isValid}
          />
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>

        <img
          src="/assets/login/sit-cat-.svg"
          alt="Gato decorativo"
          className="mx-auto mt-8 w-20 opacity-90 pointer-events-none select-none"
        />
      </FormContainer>
    </div>
  );
}
