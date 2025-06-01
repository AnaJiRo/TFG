import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { validateColoniaData } from '../utils/validators';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

type Voluntario = {
  nombre: string;
  dias: string[]; // ['L', 'X', 'V']
};

const dummyVoluntarios: Record<string, Voluntario[]> = {
  'La Nana': [
    { nombre: 'Laura P.', dias: ['L', 'X'] },
    { nombre: 'Eva M.', dias: ['J', 'D'] },
  ],
  'Centro': [
    { nombre: 'Antonio G.', dias: ['L', 'M', 'X', 'J'] },
    { nombre: 'Pedro A.', dias: ['V', 'S', 'D'] },
  ],
};

export default function NuevaColoniaPage() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [zona, setZona] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<Voluntario[]>([]);

  const [asignacionPorDia, setAsignacionPorDia] = useState<Record<string, string | null>>(
    diasSemana.reduce((acc, dia) => ({ ...acc, [dia]: null }), {})
  );

  const navigate = useNavigate();

  
  const handleSubmit = async () => {
    const errorMessage = validateColoniaData({ nombre, ubicacion, zona, asignacionPorDia,});

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);

    // TODO: Enviar los datos al backend mediante POST
    console.log({ nombre, ubicacion, zona, asignacionPorDia });

    navigate('/colonias'); // redirige al dashboard de colonias
  };

  const isValid = nombre && ubicacion && zona && Object.values(asignacionPorDia).some(v => v !== null);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4"
    >
      <FormContainer maxWidth="max-w-4xl" className="relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white font-poppins">Nueva Colonia</h1>
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
              name=""
              type="text"
              placeholder="Ej: Colonia Eleven"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <Input
              label="Ubicación"
              name=""
              type="text"
              placeholder="Ej: Calle Mayor, Parque de la Paz..."
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />

            <Input
              label="Zona"
              name=""
              type="text"
              placeholder="Ej: La Nana"
              value={zona}
              onChange={(e) => {
                const nuevaZona = e.target.value;
                setZona(nuevaZona);

                const voluntariosZona = dummyVoluntarios[nuevaZona] || [];
                setVoluntariosDisponibles(voluntariosZona);

                // Reiniciar asignación
                setAsignacionPorDia(
                  diasSemana.reduce((acc, dia) => ({ ...acc, [dia]: null }), {})
                );
              }}
            />
          </div>

          {/* Columna derecha: asignación por día */}
          <div className="flex-1 space-y-3">
            <h2 className="text-white font-semibold mb-2">Asignar voluntarios por día</h2>

            {diasSemana.map((dia) => {
              const disponiblesDia = voluntariosDisponibles.filter((v) => v.dias.includes(dia));

              return (
                <div key={dia} className="flex items-center gap-4">
                  <span className="w-10 text-white">{dia}</span>

                  {disponiblesDia.length > 0 ? (
                    <select
                      value={asignacionPorDia[dia] || ''}
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
                    <span className="text-white/70 text-sm">Aún no hay voluntarios</span>
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
            disabled={!isValid}
          />
        </div>

        {/* Gato decorativo */}
        <img
          src="/assets/login/sit-cat-.svg"
          alt="Gato decorativo"
          className="absolute bottom-4 left-4 w-28 opacity-90 pointer-events-none select-none"
        />

        {/* Error */}
        {error && <p className="text-sm text-red-400 mt-2 text-center">{error}</p>}
      </FormContainer>

    </div>
  );
}
