import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { googleSignIn, user, setUser, loading, setLoading, error, setError } = useAuth();
  const navigate = useNavigate();

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

      const resp = await fetch(`http://localhost:3000/api/v1/auth/login`, {
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

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? "Loggeando..." : "Iniciar Session con Google"}
      </button>
    </div>
  );
};
