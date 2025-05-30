import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import DashboardColoniasPage from './pages/DashboardColoniasPage';
import NuevaColoniaPage from './pages/NuevaColoniaPage';
//import Dashboard from './pages/Dashboard'; // crea un componente si no existe aún
import PrivateRoute from './routes/PrivateRoute';
import DetalleColoniaPage from './pages/DetalleColoniaPage';
import EditarColoniaPage from './pages/EditarColoniaPage';

function App() {
  return (
    <Routes>
      {/* Layout con navbar */}
      <Route element={<DefaultLayout />}>
        <Route path="/colonias" element={<DashboardColoniasPage />} />
        <Route path="/colonias/nueva" element={<NuevaColoniaPage />} />
        <Route path="/colonias/:id" element={<DetalleColoniaPage />} />
        <Route path="/colonias/:id/editar" element={<EditarColoniaPage />} />
      </Route>

      {/* Rutas sin navbar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/completar-perfil" element={<CompleteProfilePage />} />

      {/* 🔐 Ruta protegida */}
      <Route element={<PrivateRoute />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Aquí puedes meter más rutas privadas si quieres */}
      </Route>
    </Routes>
  );
}


export default App;