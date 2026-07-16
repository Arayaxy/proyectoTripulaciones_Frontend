import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/eventos" replace />;
    }
    if (user.role === 'ponente') {
      return <Navigate to="/ponencia" replace />;
    }
  }

  return children;
};
