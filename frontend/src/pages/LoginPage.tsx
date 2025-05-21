import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await loginUser({ email, password });

      // Guarda el token en localStorage
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);

      // Redirige a dashboard o inicio
      navigate('/dashboard'); // ajusta la ruta según tu app
    } catch (err) {
      console.error('Error de login:', err);
      setError('Credenciales incorrectas o error del servidor');
    }
  };

  return (
    <div className="min-h-screen bg-purpleTheme-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-purple-300 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        {/* Imagen SVG del gato */}
        <img src="/assets/login/cat.svg" alt="Gato" className="w-24 h-24" />

        {/* Título */}
        <h1 className="text-2xl font-bold text-white font-poppins">Iniciar sesión</h1>

        {/* Campos de entrada */}
        <div className="w-full flex flex-col gap-4">
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
        <div className="w-full">
          <Button label="Entrar" variant="secondary" onClick={handleSubmit} />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 font-nunito mt-2">{error}</p>
        )}

        {/* Enlace a registro */}
        <p className="text-sm text-white/80 font-nunito text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-white underline hover:text-purple-400">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
