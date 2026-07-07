import { useNavigate } from 'react-router';
import { useAuth } from "../context/AuthContext";

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
      {error && <p>{error}</p>}
      <button onClick={handleLogOut}>Cerrar Session</button>
    </div>
  );
};
