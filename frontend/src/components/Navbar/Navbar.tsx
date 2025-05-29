import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-purpleTheme-primary text-white flex items-center justify-between px-6 shadow-md">
      {/* Logo o Título */}
      <Link to="/" className="text-xl font-bold font-poppins">
        🐾 Gestor de Colonias
      </Link>

      {/* Menú de navegación */}
      <div className="flex gap-6 text-sm font-nunito">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/colonias" className="hover:underline">
          Colonias
        </Link>
        <Link to="/perfil" className="hover:underline">
          Perfil
        </Link>
      </div>
    </nav>
  );
}