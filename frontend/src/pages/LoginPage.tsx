import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-purpleTheme-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
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
        <Button label="Entrar" variant="primary" />

        {/* Enlace a registro */}
        <p className="text-sm text-white/80 font-nunito">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-white underline hover:text-purple-200">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
