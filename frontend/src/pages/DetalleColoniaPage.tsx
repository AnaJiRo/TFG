// src/pages/DetalleColoniaPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Select from '../components/SelectBox/Select';
import Button from '../components/Button/Button';
import { diasSemana } from '../utils/constants';

type Voluntario = {
  nombre: string;
  dias: string[];
};

type Colonia = {
  id: string;
  nombre: string;
  ubicacion: string;
  zona: string;
  asignacionPorDia: Record<string, string | null>;
};

// Datos simulados
const dummyColonia: Colonia = {
    id: '1',
    nombre: 'Colonia Eleven',
    ubicacion: 'Calle Mayor, Parque de la Paz',
    zona: 'La Nana',
    asignacionPorDia: {
      L: 'Laura P.',
      M: null,
      X: 'Laura P.',
      J: null,
      V: null,
      S: null,
      D: 'Eva M.',
    },
  };
  
  const dummyVoluntarios: Record<string, Voluntario[]> = {
    'La Nana': [
      { nombre: 'Laura P.', dias: ['L', 'X'] },
      { nombre: 'Eva M.', dias: ['D'] },
    ],
  };
  
  export default function DetalleColoniaPage() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [colonia, setColonia] = useState<Colonia | null>(null);
    const [asignacionPorDia, setAsignacionPorDia] = useState<Record<string, string | null>>({});
    const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<Voluntario[]>([]);
  
    useEffect(() => {
        setColonia(dummyColonia);
        setAsignacionPorDia(dummyColonia.asignacionPorDia);
        setVoluntariosDisponibles(dummyVoluntarios[dummyColonia.zona] || []);
    }, []);
    
    const handleAsignar = () => {
        console.log('Guardar asignación:', asignacionPorDia);
        // TODO: enviar PATCH o PUT al backend solo con la asignación
    };
  
    if (!colonia) return null; // TODO: añadir spinner
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
        <FormContainer maxWidth="max-w-5xl">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white font-poppins">Detalles de la Colonia</h1>
                <p className="text-white/90 font-nunito">Información registrada</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Sección izquierda - datos de la colonia */}
                <div className="space-y-4 text-white font-nunito border border-purple-500 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <img src="/assets/icons/datos.svg" alt="Datos generales" className="w-8 h-8" />
                        Datos Generales:
                    </h2>
                    <div className="flex items-center gap-2">
                        <img src="/assets/Colonias/pawhouse.svg" alt="Nombre" className="w-5 h-5" />
                    <div>
                        <p className="font-semibold">Nombre:</p>
                        <p>{colonia.nombre}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <img src="/assets/icons/place-marker.svg" alt="Ubicación" className="w-5 h-5" />
                    <div>
                        <p className="font-semibold">Ubicación:</p>
                        <p>{colonia.ubicacion}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <img src="/assets/icons/map-Zona.svg" alt="Zona" className="w-5 h-5" />
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
                    <img src="/assets/icons/Voluntario.svg" alt="Voluntarios" className="w-8 h-8" />
                    Voluntarios por día:
                </h2>
                {diasSemana.map((dia) => {
                const disponibles = voluntariosDisponibles.filter((v) => v.dias.includes(dia));
                const options = disponibles.map((v) => ({ label: v.nombre, value: v.nombre }));

                return (
                    <div key={dia} className="flex items-center gap-4">
                    <span className="w-8 text-white">{dia}</span>
                    {options.length > 0 ? (
                        <Select
                        value={asignacionPorDia[dia] || ''}
                        options={options}
                        onChange={(value) =>
                            setAsignacionPorDia((prev) => ({ ...prev, [dia]: value || null }))
                        }
                        placeholder="Sin asignar"
                        />
                    ) : (
                        <span className="text-white/70 text-sm">Aún no hay voluntarios</span>
                    )}
                    </div>
                );
                })}

                <div className="pt-4 flex justify-center">
                <Button
                    label="Guardar asignación"
                    variant="tertiary"
                    onClick={handleAsignar}
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