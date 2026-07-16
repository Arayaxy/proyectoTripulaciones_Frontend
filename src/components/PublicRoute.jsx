import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user && user.role === 'admin') {
    return <Navigate to="/eventos" replace />;
  }

  return children;
};
