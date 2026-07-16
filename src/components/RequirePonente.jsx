import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';

export const RequirePonente = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Verificando...</div>;
  }

  if (!user || user.role !== 'ponente') {
    return <Navigate to="/" replace />;
  }

  return children;
};
