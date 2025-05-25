import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CheckboxGroup from '../components/Checkbox/CheckboxGroup';
import SelectBox from '../components/SelectBox';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const zonasDummy = ['Centro', 'Norte', 'Sur', 'La Nana']; // TODO: obtener desde API 

export default function NuevaColoniaPage() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [zona, setZona] = useState('');
  const [dias, setDias] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const toggleDia = (dia: string) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = async () => {
    if (!nombre.trim()) return setError('El nombre es obligatorio');
    if (!zona) return setError('Debes seleccionar una zona');
    if (dias.length === 0) return setError('Selecciona al menos un día');

    // TODO: enviar la colonia al backend
    console.log({
      nombre,
      ubicacion,
      zona,
      dias,
    });

    setError(null);
    navigate('/colonias');
  };

  const isValid = nombre && zona && dias.length > 0;

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
          onChange={(e) => setZona(e.target.value)}
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
      </FormContainer>
    </div>
  );
}
