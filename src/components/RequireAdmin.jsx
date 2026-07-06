import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RequireAdmin = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Verificando...</div>;
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};