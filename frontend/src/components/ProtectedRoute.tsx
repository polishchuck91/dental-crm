import { Navigate } from "react-router";
import { Role } from "../constants/roles";
import useAuthStore from "../store/useAuthStore";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRoles: Role[];
}

// ProtectedRoute Component
const ProtectedRoute = ({ element, requiredRoles }: ProtectedRouteProps) => {
  const { user, loading, accessToken } = useAuthStore((state) => state);

  const userRole = user?.role;

  const isAllowedRoutes = userRole && requiredRoles.includes(userRole);

  if (loading) {
    return <>....</>;
  }

  // Check if the current path is allowed for the user's role
  return accessToken || (!loading && isAllowedRoutes) ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
