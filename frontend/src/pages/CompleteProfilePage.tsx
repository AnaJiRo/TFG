import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import FormContainer from '../components/FormContainer';
import CheckboxGroup from '../components/Checkbox/CheckboxGroup';
import RadioGroup from '../components/radiogroup/RadioGroup';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const dummyZones = ['Zona Norte', 'Zona Centro', 'Zona Sur']; // TODO: cargar dinámicamente según localidad

export default function CompleteProfilePage() {
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');
  const [province, setProvince] = useState('');
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!phone.trim() || !locality.trim()) return setError('Rellena los campos obligatorios');
    if (availableDays.length === 0) return setError('Selecciona al menos un día');
    if (!selectedZone) return setError('Selecciona una zona');

    setError(null);

    // TODO: enviar datos al backend para completar el perfil del voluntario
    console.log({
      phone,
      locality,
      province,
      availableDays,
      selectedZone,
    });

    navigate('/dashboard'); // o siguiente paso
  };

  const isValid = phone && locality && availableDays.length > 0 && selectedZone;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/login/Fondo_solo.png')" }}
    >
      <FormContainer>
        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-poppins">¡Bienvenido!</h1>
          <p className="text-white/90 mt-1 font-nunito">Completa tu información para empezar</p>
        </div>

        {/* Teléfono */}
        <Input
          label="Teléfono"
          type="text"
          placeholder="Ej: 600123456"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Localidad */}
        <Input
          label="Localidad"
          type="text"
          placeholder="Ej: Los Palacios"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
        />

        {/* Provincia (opcional) */}
        <Input
          label="Provincia"
          type="text"
          placeholder="Ej: Sevilla"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />

        {/* Días disponibles */}
        <div>
          <h2 className="text-white font-semibold mb-2">Días disponibles</h2>
          <CheckboxGroup
            options={daysOfWeek}
            selected={availableDays}
            onChange={toggleDay}
            responsive
          />
        </div>

        {/* Zona preferida */}
        <div>
          <h2 className="text-white font-semibold mb-2">Zona preferida</h2>
          <RadioGroup
            name="zona"
            options={dummyZones}
            selected={selectedZone}
            onChange={setSelectedZone}
            responsive
          />
          {/* TODO: reemplazar dummyZones por llamada a API de zonas según localidad */}
        </div>

        {/* Botón y errores */}
        <div className="w-full mt-2">
          <Button
            label="Guardar y continuar"
            variant="primary"
            onClick={handleSubmit}
            disabled={!isValid}
          />
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </FormContainer>
    </div>
  );
}
