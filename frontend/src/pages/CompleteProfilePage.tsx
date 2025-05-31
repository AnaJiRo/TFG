import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import FormContainer from "../components/FormContainer";
import CheckboxGroup from "../components/Checkbox/CheckboxGroup";
import SelectBox from "../components/SelectBox/SelectBox";
import { useNavigate } from "react-router-dom";
import { getAllZones, Zone, createAvailability } from "../api/coloniasService";
import { jwtDecode } from "jwt-decode";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const daysMap: Record<string, string> = {
  Lunes: "monday",
  Martes: "tuesday",
  Miércoles: "wednesday",
  Jueves: "thursday",
  Viernes: "friday",
  Sábado: "saturday",
  Domingo: "sunday",
};

export default function CompleteProfilePage() {
  const [locality, setLocality] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const localities = Array.from(new Set(zones.map((zone) => zone.locality)));

  const filteredZones = zones.filter((zone) => zone.locality === locality);

  const navigate = useNavigate();

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!locality.trim()) return setError("Rellena los campos obligatorios");
    if (availableDays.length === 0)
      return setError("Selecciona al menos un día");
    if (!selectedZone) return setError("Selecciona una zona");

    setError(null);

    try {
      // Obtener el access_token de localStorage (o de donde lo guardes)
      const token = localStorage.getItem("access_token");
      if (!token) return setError("No se encontró el token de acceso");
      const decoded: any = jwtDecode(token);
      const userId = decoded.user_id;

      // Busca el id de la zona seleccionada
      const zoneObj = zones.find((z) => z.name === selectedZone);
      if (!zoneObj) return setError("Zona no encontrada");

      // Crea una disponibilidad por cada día seleccionado
      await Promise.all(
        availableDays.map((day) =>
          createAvailability({
            user: userId,
            day: daysMap[day],
            zone: zoneObj.id,
          })
        )
      );

      navigate("/dashboard"); // o siguiente paso
    } catch (err) {
      setError("Error al guardar la disponibilidad. Intenta de nuevo.");
      console.error(err);
    }
  };

  const getZones = async () => {
    try {
      const zones = await getAllZones();
      setZones(zones);

      console.log("Zonas disponibles:", zones);
    } catch (error) {
      console.error("Error al obtener zonas:", error);
    }
  };

  useEffect(() => {
    // Cargar zonas al montar el componente
    getZones();
  }, []);

  const isValid = locality && availableDays.length > 0 && selectedZone;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/login/Fondo_solo.png')" }}
    >
      <FormContainer>
        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">
            ¡Bienvenido!
          </h1>
          <p className="text-white/90 mt-1 font-nunito">
            Completa tu información para terminar
          </p>
        </div>

        {/*Esto podia cambiar, no es fijo*/}

        {/*Esto podia cambiar, no es fijo*/}
        {/* Localidad */}
        <h2 className="text-white font-semibold mb-2">Zona preferida</h2>
        <SelectBox
          label=""
          value={locality}
          onChange={(value) => {
            setLocality(value);
            setSelectedZone(""); // limpiar zona al cambiar localidad
          }}
          options={localities}
        />

        {/* Días disponibles */}
        <div>
          <h2 className="text-white font-semibold mb-2">Días disponibles</h2>
          <CheckboxGroup
            options={daysOfWeek}
            selected={availableDays}
            direction="row"
            onChange={toggleDay}
            responsive
          />
        </div>

        {/*Esto cabiara, no sera radiogroup, ya que la zona sera editable por el admin y filtrara por localidad*/}
        {/* Zona preferida */}
        <div>
          <h2 className="text-white font-semibold mb-2">Zona preferida</h2>
          <SelectBox
            label=""
            value={selectedZone}
            onChange={setSelectedZone}
            options={filteredZones.map((zone) => zone.name)}
          />
          {/* TODO: reemplazar dummyZones por llamada a API de zonas según localidad */}
        </div>

        {/* Botón y errores */}
        <div className="w-full flex justify-center mt-2">
          <Button
            label="Guardar y continuar"
            variant="tertiary"
            onClick={handleSubmit}
            disabled={!isValid}
          />
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </FormContainer>
    </div>
  );
}
