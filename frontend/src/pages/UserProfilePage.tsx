
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Button from '../components/Button/Button';
import SelectBox from '../components/SelectBox/SelectBox';
import CheckboxGroup from '../components/Checkbox/CheckboxGroup';
//import { getAllZones, Zone } from '../api/coloniasService';
// import { getMyAvailability, createAvailability, deleteAvailability } from '../api/availabilityService';
const daysOfWeek = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];

export default function UserProfilePage() {
    const navigate = useNavigate();
   
    // Estado del usuario (simulado por ahora)
    const [user, setUser] = useState({
      username: 'lau_32',
      name: 'Laura',
      lastname: 'Sánchez',
      email: 'laura@example.com',
      phone: '600111222',
      location: 'Sevilla',
      zone: 'Centro',
      role: 'voluntary',
    });
  
    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [availableDays, setAvailableDays] = useState<string[]>([]);
  
    const toggleDay = (day: string) => {
      setAvailableDays((prev) =>
        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      );
    };
  
    const getZones = async () => {
      try {
        const response = await getAllZones();
        setZones(response);
      } catch (err) {
        console.error('Error al cargar zonas:', err);
      }
    };
  
    useEffect(() => {
      getZones();
    }, []);
  
    const handleSaveAvailability = () => {
      console.log('Disponibilidad guardada:', { selectedZone, availableDays });
      // TODO: enviar al backend
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
        <FormContainer maxWidth="max-w-5xl">
            {/* Título general */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white font-poppins">Perfil de usuario</h1>
                <p className="text-white/90 font-nunito">Información registrada y disponibilidad</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
                {/* Sección izquierda - datos del usuario*/}
                <div className="space-y-4 text-white font-nunito border border-purple-500 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <img src="/assets/icons/datos.svg" alt="Datos generales" className="w-8 h-8" />
                        Datos del usuario:
                    </h2>
                    <p>
                      <span className="font-semibold text-white">Nombre de usuario:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.username}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Nombre:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.name}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Apellido:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.lastname}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Email:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.email}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Teléfono:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.phone}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Localidad:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.location}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Zona:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.zone}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Rol:</span>{' '}
                      <span className="text-purple-500 font-semibold">{user.role}</span>
                    </p>
          
                    <div className="pt-4 flex justify-center">
                    <Button
                        label="Editar perfil" 
                        variant="tertiary"
                        onClick={() => navigate(`/profile/:id/edit`)}
                    />
                </div>
            </div>

            {/* Sección derecha - Disponibilidad */}
            <div className="space-y-3 border border-purple-500 rounded-xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <img src="/assets/icons/Voluntario.svg" alt="Voluntarios" className="w-8 h-8" />
                    Disponibilidad:
                </h2>
                <div>
                    <p className="mb-1 font-semibold">Zona preferida:</p>
                    <SelectBox
                    label=""
                    value={selectedZone}
                    onChange={setSelectedZone}
                    options={zones.map((z) => z.name)}
                    />
                </div>
                <div>
                    <p className="mb-1 font-semibold">Días disponibles:</p>
                    <CheckboxGroup
                    options={daysOfWeek}
                    selected={availableDays}
                    direction="row"
                    onChange={toggleDay}
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