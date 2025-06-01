import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";

import SelectInputBox from "../components/SelectInput/SelectInputBox";
import { createColony, createZone, getAllZones } from "../api/coloniasService";

const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

type Voluntario = {
  nombre: string;
  dias: string[]; // ['L', 'X', 'V']
};

export default function NuevaColoniaPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<
    Voluntario[]
  >([]);
  const [localidades, setLocalidades] = useState<string[]>([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
  const [zonesName, setZonesName] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>("");

  const [asignacionPorDia, setAsignacionPorDia] = useState<
    Record<string, string | null>
  >(diasSemana.reduce((acc, dia) => ({ ...acc, [dia]: null }), {}));

  const getZones = async () => {
    try {
      const zones = await getAllZones();
      setLocalidades([...new Set(zones.map((zone) => zone.locality))]);

      const zonesByLocality = await getAllZones({
        locality: selectedLocalidad,
      });

      setZonesName(zonesByLocality.map((zone) => zone.name));

      console.log("Zonas disponibles:", zones);
    } catch (error) {
      console.error("Error al obtener zonas:", error);
    }
  };

  console.log(zonesName);

  const handleSubmit = async () => {
    // const errorMessage = validateColoniaData({
    //   nombre,
    //   ubicacion,
    //   zona,
    //   asignacionPorDia,
    // });

    const zoneExists = await getAllZones({
      locality: selectedLocalidad,
      name: selectedZone,
    });

    console.log("Zona existente:", zoneExists);

    let zoneCreated = null;
    if (!zoneExists || zoneExists.length === 0) {
      console.log("Zona no existe, creando nueva zona");
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

    await createColony({
      name: nombre,
      ubication: ubicacion,
      zone: zoneCreated?.length ? zoneCreated[0].id : zoneExists[0]?.id,
      size: 3,
    });

    // if (errorMessage) {
    //   setError(errorMessage);
    //   return;
    // }

    setError(null);

    // navigate("/colonias");
  };

  const isValid =
    nombre &&
    ubicacion &&
    Object.values(asignacionPorDia).some((v) => v !== null);

  useEffect(() => {
    getZones();
  }, []);

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

            {diasSemana.map((dia) => {
              const disponiblesDia = voluntariosDisponibles.filter((v) =>
                v.dias.includes(dia)
              );

              return (
                <div key={dia} className="flex items-center gap-4">
                  <span className="w-10 text-white">{dia}</span>

                  {disponiblesDia.length > 0 ? (
                    <select
                      value={asignacionPorDia[dia] || ""}
                      onChange={(e) =>
                        setAsignacionPorDia((prev) => ({
                          ...prev,
                          [dia]: e.target.value || null,
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border text-sm outline-none transition-all bg-white/10 text-purple-500
                       border-purpleTheme-border focus:ring-2 focus:ring-purpleTheme-primary"
                    >
                      <option value="">Sin asignar</option>
                      {disponiblesDia.map((v) => (
                        <option key={v.nombre} value={v.nombre}>
                          {v.nombre}
                        </option>
                      ))}
                    </select>
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
