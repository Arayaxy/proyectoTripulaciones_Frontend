import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { useAuth } from "../../admin/contexts/AuthContext";

export const Login = () => {
  const { googleSignIn, user, setUser, loading, setLoading, error, setError } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await googleSignIn();
      const firebaseIdToken = await result.user.getIdToken();

      const resp = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${firebaseIdToken}`,
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!resp.ok) {
        throw new Error("Error Validacion");
      }

      const data = await resp.json();
      setUser(data.user);
      navigate("/home");

    } catch (err) {
      console.error(err.message);
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <div>Cargando...</div>;
  }
  if (error) {
    setLoading(false)
  }

  return (
    <div>
      {error && import.meta.env.VITE_MODE === 'developement' && <p>{error}</p>}
      {error && import.meta.env.VITE_MODE === 'production' && <p>Error conectarse. Por favor intenta de nuevo.</p>}
      <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? "Loggeando..." : "Iniciar Session con Google"}
      </button>
    </div>
  );
};
