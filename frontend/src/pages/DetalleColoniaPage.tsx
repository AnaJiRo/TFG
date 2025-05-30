import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Select from "../components/SelectBox/Select";
import Button from "../components/Button/Button";
import { diasSemana } from "../utils/constants";
import {
  availableVolunteersByColony,
  getSummaryByColony,
} from "../api/authService";
import { ColoniaAsignacion } from "../types";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayKey = (typeof days)[number];

export const dayShortNames: Record<DayKey, string> = {
  monday: "L", // Lunes
  tuesday: "M", // Martes
  wednesday: "X", // Miércoles
  thursday: "J", // Jueves
  friday: "V", // Viernes
  saturday: "S", // Sábado
  sunday: "D", // Domingo
};

export default function DetalleColoniaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [colonia, setColonia] = useState<ColoniaAsignacion | null>(null);

  const [availableVolunteers, setAvailableVolunteers] = useState<
    Record<
      string,
      Array<{
        volunteer_id: number;
        volunteer_name: string;
        volunteer_email: string;
      }>
    >
  >({});

  const [asignacionesActualizadas, setAsignacionesActualizadas] = useState<
    Record<string, number>
  >({});

  function handleAsignacion(dia: string, volunteerId: number) {
    setAsignacionesActualizadas((prev) => ({
      ...prev,
      [dia]: volunteerId,
    }));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColonyDetails = async () => {
      if (!id) {
        setError("ID de colonia no especificado");
        return;
      }
      try {
        setLoading(true);
        const summaryColony = await getSummaryByColony(id);
        const volunteersList = await availableVolunteersByColony(id);

        // Agrupar voluntarios por día
        const agrupadoPorDia = days.reduce((acc, dia) => {
          acc[dia] = volunteersList.filter(
            (v: { day: string }) => v.day === dia
          );
          return acc;
        }, {} as typeof availableVolunteers);

        setColonia(summaryColony);
        setAvailableVolunteers(agrupadoPorDia);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las colonias");
      } finally {
        setLoading(false);
      }
    };
    fetchColonyDetails();
  }, []);

  if (!colonia) return null; // TODO: añadir spinner

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
      <FormContainer maxWidth="max-w-5xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">
            Detalles de la Colonia
          </h1>
          <p className="text-white/90 font-nunito">Información registrada</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sección izquierda - datos de la colonia */}
          <div className="space-y-4 text-white font-nunito border border-purple-500 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <img
                src="/assets/icons/datos.svg"
                alt="Datos generales"
                className="w-8 h-8"
              />
              Datos Generales:
            </h2>
            <div className="flex items-center gap-2">
              <img
                src="/assets/Colonias/pawhouse.svg"
                alt="Nombre"
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold">Nombre:</p>
                <p>{colonia.colonia}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <img
                src="/assets/icons/place-marker.svg"
                alt="Ubicación"
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold">Ubicación:</p>
                <p>{colonia.ubicación}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <img
                src="/assets/icons/map-Zona.svg"
                alt="Zona"
                className="w-5 h-5"
              />
              <div>
                <p className="font-semibold">Zona:</p>
                <p>{colonia.zona}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                label="Editar"
                variant="tertiary"
                onClick={() => navigate(`/colonias/${colonia.id}/editar`)}
              />
            </div>
          </div>

          {/* Sección derecha - voluntarios por día */}
          <div className="space-y-3 border border-purple-500 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <img
                src="/assets/icons/Voluntario.svg"
                alt="Voluntarios"
                className="w-8 h-8"
              />
              Voluntarios por día:
            </h2>
            {days.map((dia) => {
              const disponibles = availableVolunteers[dia] || [];

              // Convertir a formato que acepta el Select
              const options = disponibles.map((v) => ({
                value: v.volunteer_id.toString(),
                label: v.volunteer_name,
              }));

              console.log("Opciones de voluntarios:", options);
              console.log("voluntarios disponibles:", disponibles);
              console.log("availableVolunteers:", availableVolunteers);

              // Voluntario actualmente asignado (esto sigue viniendo de colonia.asignaciones)
              const asignado =
                asignacionesActualizadas[dia]?.toString() ??
                colonia?.asignaciones?.[dia]?.[0]?.volunteer_id?.toString() ??
                "";

              return (
                <div
                  key={dayShortNames[dia]}
                  className="flex items-center gap-4"
                >
                  <span className="w-8 text-white">{dayShortNames[dia]}</span>
                  {disponibles ? (
                    <Select
                      value={asignado}
                      options={options}
                      onChange={(nuevoValor) =>
                        handleAsignacion(dia, parseInt(nuevoValor))
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

            <div className="pt-4 flex justify-center">
              <Button
                label="Guardar asignación"
                variant="tertiary"
                onClick={() => null}
              />
            </div>
          </div>
        </div>

        {/* Iconos decorativos */}
        <img
          src="/assets/login/pawprint-cat.svg"
          alt="Huella gato"
          className="absolute top-6 right-8 w-20 opacity-90 pointer-events-none select-none"
        />
        <img
          src="/assets/login/sit-cat-.svg"
          alt="Gato decorativo"
          className="absolute bottom-8 left-8 w-28 opacity-90 pointer-events-none select-none"
        />
      </FormContainer>
    </div>
  );
}
