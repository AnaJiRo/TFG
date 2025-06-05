import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Button from "../components/Button/Button";
import SelectBox from "../components/SelectBox/SelectBox";
import CheckboxGroup from "../components/Checkbox/CheckboxGroup";
import { jwtDecode } from "jwt-decode";
import { getUserById, User } from "../api/authService";
import {
  getAvailableByUserId,
  getZoneByUserId,
  Zone,
  getAllZones,
  createBulkAvailability,
  AvailabilityBulk,
} from "../api/coloniasService";
const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const daysMapReverse: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const daysMap: Record<string, string> = {
  Lunes: "monday",
  Martes: "tuesday",
  Miércoles: "wednesday",
  Jueves: "thursday",
  Viernes: "friday",
  Sábado: "saturday",
  Domingo: "sunday",
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [zones, setZones] = useState<Zone | null>(null);
  const [allZones, setAllZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const getIdByToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No se encontró el token de acceso");
      return null;
    }
    try {
      const decoded: any = jwtDecode(token);
      return decoded.user_id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  const getUserDataAndZone = async () => {
    const userId = getIdByToken();
    if (!userId) return;
    try {
      const response = await getUserById(userId);
      setUser(response);
      const zone = await getZoneByUserId(userId);
      setZones(zone);
      setSelectedZone(zone?.name || "");
      const allZonesResponse = await getAllZones({
        locality: zone?.locality || "",
      });
      setAllZones(allZonesResponse);
      const availability = await getAvailableByUserId(userId);
      const days = availability.map((day) => {
        return daysMapReverse[day.day] || day.day;
      });
      setAvailableDays(new Set(days).size > 0 ? days : []);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    getUserDataAndZone();
  }, []);

  const handleSaveAvailability = async () => {
    try {
      // get selected zone ID
      const selectedZoneId = allZones.find(
        (zone) => zone.name === selectedZone
      )?.id;

      if (!selectedZoneId) {
        console.error("Zona seleccionada no encontrada");
        return;
      }
      const userId = getIdByToken();
      if (!userId) {
        console.error("No se pudo obtener el ID del usuario");
        return;
      }
      const englishDays = availableDays.map(
        (day) => daysMap[day] || day.toLowerCase()
      );
      console.log("Días disponibles en inglés:", englishDays);
      const availabilityData: AvailabilityBulk = {
        user: userId,
        zone_id: selectedZoneId,
        days: englishDays,
      };
      await createBulkAvailability(availabilityData);
      alert("Disponibilidad guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar la disponibilidad:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
      <FormContainer maxWidth="max-w-5xl">
        {/* Título general */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">
            Perfil de usuario
          </h1>
          <p className="text-white/90 font-nunito">
            Información registrada y disponibilidad
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* Sección izquierda - datos del usuario*/}
          <div className="space-y-4 text-white font-nunito border border-purple-500 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <img
                src="/assets/icons/datos.svg"
                alt="Datos generales"
                className="w-8 h-8"
              />
              Datos del usuario:
            </h2>
            <p>
              <span className="font-semibold text-white">
                Nombre de usuario:
              </span>{" "}
              <span className="text-purple-500 font-semibold">
                {user?.username}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Nombre:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {user?.name}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {user?.email}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Teléfono:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {user?.phone}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Localidad:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {zones?.locality || "No disponible"}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Zona:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {zones?.name || "No disponible"}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Rol:</span>{" "}
              <span className="text-purple-500 font-semibold">
                {user?.role}
              </span>
            </p>

            <div className="pt-4 flex justify-center">
              <Button
                label="Editar perfil"
                variant="tertiary"
                onClick={() => navigate(`/profile/${user?.id}/edit`)}
              />
            </div>
          </div>

          {/* Sección derecha - Disponibilidad */}
          <div className="space-y-3 border border-purple-500 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <img
                src="/assets/icons/Voluntario.svg"
                alt="Voluntarios"
                className="w-8 h-8"
              />
              Disponibilidad:
            </h2>
            <div>
              <p className="mb-1 font-semibold">Zona preferida:</p>
              <SelectBox
                label=""
                value={selectedZone}
                onChange={setSelectedZone}
                options={allZones.map((zone) => zone.name || "No disponible")}
              />
            </div>
            <div>
              <p className="mb-1 font-semibold">Días disponibles:</p>
              <CheckboxGroup
                options={daysOfWeek}
                selected={availableDays}
                direction="row"
                onChange={(day) => {
                  setAvailableDays((prev) =>
                    prev.includes(day)
                      ? prev.filter((d) => d !== day)
                      : [...prev, day]
                  );
                }}
                responsive
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                label="Guardar disponibilidad"
                variant="tertiary"
                onClick={handleSaveAvailability}
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
          className="absolute mid-8 w-28 opacity-90 pointer-events-none select-none"
        />
      </FormContainer>
    </div>
  );
}
