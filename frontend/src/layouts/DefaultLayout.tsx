import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Contenido de la página */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}