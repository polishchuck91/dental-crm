import { Navigate } from "react-router";
import { Role } from "../constants/roles";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoles: Role[];
}

// ProtectedRoute Component
const ProtectedRoute = ({ element, requiredRoles }: ProtectedRouteProps) => {
  const userRole = Role.Dentist;

  const isAllowedRoutes = requiredRoles.includes(userRole);

  // Check if the current path is allowed for the user's role
  return isAllowedRoutes ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
