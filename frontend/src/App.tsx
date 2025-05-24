import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import Dashboard from './pages/Dashboard'; // crea un componente si no existe aún
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 🔐 Ruta protegida */}
      <Route element={<PrivateRoute />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Aquí puedes meter más rutas privadas si quieres */}
      </Route>
    </Routes>
  );
}


export default App;