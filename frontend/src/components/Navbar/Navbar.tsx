import { Link } from 'react-router-dom';

export default function Navbar() {

  const role = 'admin'
  
  return (
    <nav className="w-full h-16 bg-purple-900 text-white flex items-center justify-between px-6 shadow-md">
      {/* Logo o Título */}
      <Link to="/" className="flex text-xl font-bold font-poppins gap-3">
      <img src="/assets/login/pawprint-cat.svg" alt="Huellas de Gato" className="w-8 h-8" />
        Gestor de Colonias
      </Link>

      {/* Menú de navegación */}
      <div className="flex gap-6 text-md font-nunito">
       
        {/* Solo visible para admin */}
        {role === 'admin' && (
           <Link to="/admin/users" className="hover:underline">
           Gestión Usuarios
         </Link>
        )}

        <Link to="/colonias" className="hover:underline">
           Colonias
        </Link>
        <Link to="/profile" className="hover:underline">
          Perfil
        </Link>
        <Link to="/login" className="hover:underline">
          Logout
        </Link>
      </div>
    </nav>
  );
}