import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  allowedRoles?: string[]; // por ejemplo: ['admin'] o ['volunteer']
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (err) {
    console.error("Error al decodificar el token:", err);
    return <Navigate to="/login" replace />;
  }
}
