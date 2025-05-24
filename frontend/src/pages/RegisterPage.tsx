import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authService';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await registerUser({ name, lastname, email, password });

      // Si el backend devuelve tokens:
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);

      // Redirige tras registrarse (ej: login o dashboard)
      navigate('/dashboard');
    } catch (err) {
      console.error('Error de registro:', err);
      setError('Hubo un error al registrarse');
    }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/login/Fondo_solo.png')" }}
    >
      <div className="w-full max-w-xs bg-fuchsia-300/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
            <img src="/assets/login/pawprint-cat.svg" alt="Huellas de Gato" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-white font-poppins">Registrarse</h1>
     </div>

        {/* Campos */}
        <div className="w-full flex flex-col gap-4">
          <Input
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Apellidos"
            type="text"
            placeholder="Tus apellidos"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botón */}
        <div className="w-full flex justify-center">
          <Button label="Registrarse" variant="tertiary" onClick={handleSubmit} />
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-400 font-nunito">{error}</p>}

        {/* Enlace a login */}
        <p className="text-sm text-white/80 font-nunito text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-white underline hover:text-purple-700">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
