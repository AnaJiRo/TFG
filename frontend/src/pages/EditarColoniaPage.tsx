import { useEffect, useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import FormContainer from '../components/FormContainer';
import Select from '../components/SelectBox/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { diasSemana } from '../utils/constants';
import { validateColoniaData } from '../utils/validators';

type Voluntario = {
  nombre: string;
  dias: string[];
};

// Simulación de datos
const dummyColonia = {
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

export default function EditarColoniaPage() {
  const { id } = useParams(); // en el futuro para obtener desde /colonias/:id
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [zona, setZona] = useState('');
  const [asignacionPorDia, setAsignacionPorDia] = useState<Record<string, string | null>>({});
  const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<Voluntario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula carga desde API
    const colonia = dummyColonia;
    setNombre(colonia.nombre);
    setUbicacion(colonia.ubicacion);
    setZona(colonia.zona);
    setAsignacionPorDia(colonia.asignacionPorDia);

    const disponibles = dummyVoluntarios[colonia.zona] || [];
    setVoluntariosDisponibles(disponibles);
  }, []);

  const handleSubmit = () => {
    const errorMessage = validateColoniaData({ nombre, ubicacion, zona, asignacionPorDia });
    if (errorMessage) return setError(errorMessage);
    setError(null);

    console.log({ nombre, ubicacion, zona, asignacionPorDia });
    // TODO: enviar PUT al backend
    navigate('/colonias');
  };

  const isValid = nombre && ubicacion && zona && Object.values(asignacionPorDia).some(v => v !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4">
      <FormContainer maxWidth="max-w-5xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">Editar Colonia</h1>
          <p className="text-white/90 mt-1 font-nunito">Modifica los datos de la colonia seleccionada</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input label="Nombre de la colonia" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
            <Input label="Ubicación" type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
            <Input label="Zona" type="text" value={zona} onChange={e => setZona(e.target.value)} />
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-white mb-2">Asignar voluntarios por día</h2>
            {diasSemana.map((dia) => {
              const disponiblesDia = voluntariosDisponibles
                .filter((v) => v.dias.includes(dia))
                .map((v) => ({ label: v.nombre, value: v.nombre }));

              return (
                <div key={dia} className="flex items-center gap-4">
                  <span className="w-8 text-white">{dia}</span>
                  {disponiblesDia.length > 0 ? (
                    <Select
                      options={[{ label: 'Sin asignar', value: '' }, ...disponiblesDia]}
                      value={asignacionPorDia[dia] || ''}
                      onChange={(val) =>
                        setAsignacionPorDia((prev) => ({ ...prev, [dia]: val || null }))
                      }
                    />
                  ) : (
                    <span className="text-white/70 text-sm">Aún no hay voluntarios</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <Button label="Guardar cambios" variant="tertiary" onClick={handleSubmit} disabled={!isValid} />
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>

        <img
          src="/assets/login/sit-cat-.svg"
          alt="Gato decorativo"
          className="absolute bottom-8 left-8 w-28 opacity-90 pointer-events-none select-none"
        />

        {/* TODO: Conectar con GET + PUT al backend */}
        {/* TODO: Mostrar spinner de carga y errores del servidor */}
      </FormContainer>
    </div>
  );
}
