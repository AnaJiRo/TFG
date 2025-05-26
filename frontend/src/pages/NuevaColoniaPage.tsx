import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CheckboxGroup from '../components/Checkbox/CheckboxGroup';
import SelectBox from '../components/SelectBox';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { validateColoniaData } from '../utils/validators';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// TODO: Reemplazar esto por una llamada a la API real de voluntarios por zona
const dummyVoluntarios: Record<string, string[]> = {
  'Centro': ['Laura P.', 'Antonio G.'],
  'La Nana': ['Eva M.'],
  'Los Ratoneros': ['Pedro A.', 'Carmen T.'],
};

export default function NuevaColoniaPage() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [zona, setZona] = useState('');
  const [dias, setDias] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [voluntariosDisponibles, setVoluntariosDisponibles] = useState<string[]>([]);
  const [voluntariosAsignados, setVoluntariosAsignados] = useState<string[]>([]);


  const navigate = useNavigate();

  const toggleDia = (dia: string) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = async () => {
    const errorMessage = validateColoniaData({ nombre, ubicacion, zona, dias, voluntariosAsignados});

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);

    // TODO: Enviar los datos al backend mediante POST
    console.log({ nombre, ubicacion, zona, dias });

    navigate('/colonias'); // redirige al dashboard de colonias
  };

  const isValid = nombre && ubicacion && zona && dias.length > 0;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-800 to-fuchsia-400 flex items-center justify-center px-4"
    >
      <FormContainer>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">
            Nueva Colonia
          </h1>
          <p className="text-white/90 mt-1 font-nunito">
            Completa para registrar una nueva colonia
          </p>
        </div>

        {/* Nombre */}
        <Input
          label="Nombre de la colonia"
          type="text"
          placeholder="Ej: Colonia Eleven"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* Ubicación */}
        <Input
        label="Ubicación"
        type="text"
        placeholder="Ej: Calle Mayor, Parque de la Paz..."
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        />

        {/* TODO: Validar si la zona ya existe antes de crearla, si aplica */}
        {/* Zona */}
        <Input
          label="Zona"
          type="text"
          placeholder="Ej: La Nana"
          value={zona}
          onChange={(e) => {
            const nuevaZona = e.target.value;
            setZona(nuevaZona);
        
            // Simular consulta de voluntarios disponibles en esa zona
            const disponibles = dummyVoluntarios[nuevaZona] || [];
            setVoluntariosDisponibles(disponibles);
            setVoluntariosAsignados([]); // Limpiar asignados si cambia la zona
          }}
        />

        {/* Días */}
        <div>
          <h2 className="text-white font-semibold mb-2">Días activos</h2>
          <CheckboxGroup
            options={diasSemana}
            selected={dias}
            onChange={toggleDia}
            direction="row"
            responsive
          />
        </div>

        <div className="w-full">
          <h2 className="text-white font-semibold mb-2">Voluntarios disponibles en esta zona</h2>

          {zona.trim() === '' ? (
            <p className="text-sm text-white/70">Introduce una zona para ver si hay voluntarios disponibles.</p>
          ) : voluntariosDisponibles.length === 0 ? (
            <p className="text-sm text-white/70">No hay voluntarios disponibles en esta zona actualmente.</p>
          ) : (
            <CheckboxGroup
              options={voluntariosDisponibles}
              selected={voluntariosAsignados}
              onChange={(v) =>
                setVoluntariosAsignados((prev) =>
                  prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
                )
              }
              direction="column"
            />
          )}
        </div>



        {/* Botón */}
        <div className="w-full flex justify-center mt-2">
          <Button
            label="Guardar colonia"
            variant="tertiary"
            onClick={handleSubmit}
            disabled={!isValid}
          />
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>

        {/* TODO: Conectar con endpoint POST /colonias */}
        {/* TODO: Añadir spinner / feedback de guardado */}
        {/* TODO: Mostrar errores del backend si los hubiera */}
        {/* TODO: Mapear nombres de voluntarios a IDs reales al enviar al backend*/}
      </FormContainer>
    </div>
  );
}
