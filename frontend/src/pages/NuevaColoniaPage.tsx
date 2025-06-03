import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import SelectInputBox from "../components/SelectInput/SelectInputBox";
import Select from "../components/SelectBox/Select";
import {
  createColony,
  createZone,
  getAllZones,
  createBulkAssignments,
  getAvailableVolunteersByZone,
  Volunter,
} from "../api/coloniasService";
import { days, dayShortNames } from "../utils/constants";

// type VolunteerOption = {
//   id: number;
//   name: string;
//   email: string;
//   day: string;
// };

export default function NuevaColoniaPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Lista plana de voluntarios disponibles para la zona
  const [availableVolunteers, setAvailableVolunteers] = useState<Volunter[]>(
    []
  );
  const [localidades, setLocalidades] = useState<string[]>([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
  const [zonesName, setZonesName] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>("");

  // Guardamos el id del voluntario asignado por día
  const [asignacionPorDia, setAsignacionPorDia] = useState<
    Record<string, string>
  >(() => days.reduce((acc, dia) => ({ ...acc, [dia]: "" }), {}));

  const getZones = async () => {
    try {
      const zones = await getAllZones();
      setLocalidades([...new Set(zones.map((zone) => zone.locality))]);

      if (selectedLocalidad) {
        const zonesByLocality = await getAllZones({
          locality: selectedLocalidad,
        });
        setZonesName(zonesByLocality.map((zone) => zone.name));
      } else {
        setZonesName([]);
      }
    } catch (error) {
      console.error("Error al obtener zonas:", error);
    }
  };

  // Buscar voluntarios disponibles para la zona seleccionada
  const fetchAvailableVolunteersForZone = async () => {
    setAvailableVolunteers([]);
    if (!selectedZone || !selectedLocalidad) return;
    try {
      // Buscar la zona para obtener su id
      const zones = await getAllZones({
        locality: selectedLocalidad,
        name: selectedZone,
      });
      if (!zones.length) return;
      const zoneId = zones[0].id;
      // Usar solo el nuevo endpoint simplificado
      const volunteersList = await getAvailableVolunteersByZone(zoneId);
      setAvailableVolunteers(volunteersList);
    } catch {
      setAvailableVolunteers([]);
    }
  };

  console.log(zonesName);

  const handleSubmit = async () => {
    setError(null);
    // 1. Crear zona si no existe
    const zoneExists = await getAllZones({
      locality: selectedLocalidad,
      name: selectedZone,
    });
    let zoneCreated = null;
    if (!zoneExists || zoneExists.length === 0) {
      await createZone({
        name: selectedZone,
        locality: selectedLocalidad,
      });
      zoneCreated = await getAllZones({
        locality: selectedLocalidad,
        name: selectedZone,
      });
    }
    if (!zoneCreated && !zoneExists) {
      setError("No se pudo crear o encontrar la zona seleccionada");
      return;
    }
    // 2. Crear colonia
    const newColony = await createColony({
      name: nombre,
      ubication: ubicacion,
      zone: zoneCreated?.length ? zoneCreated[0].id : zoneExists[0]?.id,
      size: 3,
    });
    // 3. Guardar asignaciones (solo si hay alguna)
    const asignacionesFinales: Record<string, number | null> = {};
    days.forEach((dia) => {
      const val = asignacionPorDia[dia];
      asignacionesFinales[dia] = val ? parseInt(val) : null;
    });
    // Si hay al menos una asignación
    if (Object.values(asignacionesFinales).some((v) => v !== null)) {
      await createBulkAssignments(newColony.id, asignacionesFinales);
    }
    // Navegar o mostrar éxito
    navigate("/colonias");
  };

  // Actualizar zonas cuando cambia la localidad
  useEffect(() => {
    getZones();
  }, [selectedLocalidad]);

  // Cuando cambia la zona, limpiar asignaciones y voluntarios
  useEffect(() => {
    setAsignacionPorDia(days.reduce((acc, dia) => ({ ...acc, [dia]: "" }), {}));
    fetchAvailableVolunteersForZone();
  }, [selectedZone, selectedZone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
      <FormContainer maxWidth="max-w-4xl" className="relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white font-poppins">
            Nueva Colonia
          </h1>
          <p className="text-white/90 mt-1 font-nunito">
            Completa para registrar una nueva colonia
          </p>
        </div>

        {/* Layout en dos columnas */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Columna izquierda: info general */}
          <div className="flex-1 space-y-4">
            <Input
              label="Nombre de la colonia"
              type="text"
              placeholder="Ej: Colonia Eleven"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <SelectInputBox
              label="Localidad"
              value={selectedLocalidad}
              onChange={(value) => setSelectedLocalidad(value)}
              options={localidades}
            />

            <Input
              label="Ubicación"
              type="text"
              placeholder="Ej: Calle Mayor, Parque de la Paz..."
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />

            <SelectInputBox
              label="Zona"
              value={selectedZone}
              onChange={(value) => setSelectedZone(value)}
              options={zonesName}
            />
          </div>

          {/* Columna derecha: asignación por día */}
          <div className="flex-1 space-y-3">
            <h2 className="text-white font-semibold mb-2">
              Asignar voluntarios por día
            </h2>

            {days.map((dia) => {
              // Filtrar voluntarios por día
              const disponibles = availableVolunteers.filter(
                (v) => v.day === dia
              );
              console.log("disponibles:", disponibles);
              const options = disponibles.map((v) => ({
                value: v.id?.toString(),
                label: v.name,
              }));

              console.log("options:", options);
              return (
                <div
                  key={dayShortNames[dia]}
                  className="flex items-center gap-4"
                >
                  <span className="w-10 text-white">{dayShortNames[dia]}</span>
                  {options.length > 0 ? (
                    <Select
                      value={asignacionPorDia[dia]}
                      options={options}
                      onChange={(nuevoValor) =>
                        setAsignacionPorDia((prev) => ({
                          ...prev,
                          [dia]: nuevoValor,
                        }))
                      }
                      placeholder="Sin asignar"
                    />
                  ) : (
                    <span className="text-white/70 text-sm">
                      Aún no hay voluntarios
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón */}
        <div className="w-full flex justify-center mt-6">
          <Button
            label="Guardar colonia"
            variant="tertiary"
            onClick={handleSubmit}
            // disabled={!isValid}
          />
        </div>

        {/* Gato decorativo */}
        <img
          src="/assets/login/sit-cat-.svg"
          alt="Gato decorativo"
          className="absolute bottom-4 left-4 w-28 opacity-90 pointer-events-none select-none"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
        )}
      </FormContainer>
    </div>
  );
}
