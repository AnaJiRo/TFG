import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Contenido de la página */}
      <main className="flex-1 p-4 bg-gradient-to-br from-purple-800 to-fuchsia-400">
        <Outlet />
      </main>
    </div>
  );
}