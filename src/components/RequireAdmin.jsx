import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import './partials/_eventos.scss'

export const RequireAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Verificando...</div>;
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  console.log("require admin", user)
  return children;
};
