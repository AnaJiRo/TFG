
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario del usuario
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    zone: '',
    phone: '',
    role: 'voluntary',
  });

  useEffect(() => {
    // Aquí deberías hacer una llamada al backend para cargar los datos del usuario por ID
    // Simulación con datos dummy por ahora
    if (id === '1') {
      setFormData({
        name: 'Laura Sánchez',
        location: 'Sevilla',
        zone: 'Centro',
        phone: '600111222',
        role: 'voluntary'
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí enviarías los datos al backend para guardar los cambios
    console.log('Usuario actualizado:', formData);
    navigate('/admin/users');
  };

  return (
    <div className="min-h-screen bg-purple-300 text-white p-6 font-nunito flex flex-col items-center">
      <h1 className="text-3xl font-bold font-poppins mb-6 flex items-center gap-3">
        <img src="/assets/icons/edit.svg" alt="Editar" className="w-8 h-8" />
        Editar usuario
      </h1>

      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl w-full max-w-md space-y-4">
        <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Localidad" name="location" value={formData.location} onChange={handleChange} />
        <Input label="Zona" name="zone" value={formData.zone} onChange={handleChange} />
        <Input label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />

        <div className="pt-4 flex justify-center gap-6">
            <Button label="Guardar cambios" type="submit" variant="tertiary"/>
            <Button label="Cancelar" variant="secondary" onClick={() => navigate('/userManagement')} />
        </div>
      </form>
    </div>
  );
}

