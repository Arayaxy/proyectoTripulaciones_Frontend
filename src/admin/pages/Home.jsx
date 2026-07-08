import { useNavigate } from 'react-router';
import { useAuth } from "../contexts/AuthContext";

export const Home = () => {
  const { logOut, user, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h3>Home</h3>
      <p>Hola, {user?.name}</p>
      {error && import.meta.env.VITE_MODE === 'developement' && <p>{error}</p>}
      {error && import.meta.env.VITE_MODE === 'production' && <p>Error session, refresca la pagina.</p>}
      <button onClick={handleLogOut}>Cerrar Session</button>
    </div>
  );
};
