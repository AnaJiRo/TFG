
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import FormContainer from '../components/FormContainer';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario del usuario
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    lastname: '',
    email: '',
    location: '',
    zone: '',
    phone:'',
    role: 'voluntary',
  });

  useEffect(() => {
    // Aquí deberías hacer una llamada al backend para cargar los datos del usuario por ID
    // Simulación con datos dummy por ahora
    if (id === '1') {
      setFormData({
        username: 'lau_32',
        name: 'Laura',
        lastname: 'Sánchez',
        email:'laura@example.com',
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
    <div className="min-h-screen bg-purple-400 text-white p-6 font-nunito flex flex-col items-center">
      <FormContainer>
        <h1 className="text-3xl font-bold font-poppins mb-6 flex justify-center gap-3">
          <img src="/assets/icons/edit.svg" alt="Editar" className="w-8 h-8" />
          Editar usuario
        </h1>

        <form onSubmit={handleSubmit} className="bg-fuchsia-300/80 p-6 border border-purple-500 rounded-xl w-full max-w-md space-y-4">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            <Input label="Nombre usuario" name="username" value={formData.username} onChange={handleChange} />
            <Input label="Localidad" name="location" value={formData.location} onChange={handleChange} />
            <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Zona" name="zone" value={formData.zone} onChange={handleChange} />
            <Input label="Apellido" name="lastname" value={formData.lastname} onChange={handleChange} />
            <Input label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="pt-4 flex justify-center gap-6">
              <Button label="Guardar cambios" type="submit" variant="tertiary"/>
              <Button label="Cancelar" variant="secondary" onClick={() => navigate('/userManagement')} />
          </div>
        </form>
      </FormContainer>
    </div>
  );
}

