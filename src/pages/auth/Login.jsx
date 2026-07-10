import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Navbar } from "../../components/navbar/Navbar";
import heroLogo from '../../assets/logo_2026_Backstage.svg'
import heroImg from '../../assets/heroImg.jpg'
import './_login.scss'

export const Login = () => {
  const { googleSignIn, user, setUser, loading, setLoading, error, setError } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user && user.role === "admin") {
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
          Authorization: `Bearer ${firebaseIdToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!resp.ok) throw new Error("Error Validacion");

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

  if (loading && !user) return <div>Cargando...</div>;

  return (
    <main className="login">
      <header className="login__header">
        <a href="/">
          <img src={heroLogo} alt="MITÜMI Backstage" /> </a>
      </header>
      <div className="login__hero">
        <img src={heroImg} alt="MITÜMI Backstage" className="login__hero-img" />
      </div>

      <div>
        {error && import.meta.env.VITE_MODE === "development" && <p>{error}</p>}
        {error && import.meta.env.VITE_MODE === "production" && <p>Error al conectarse. Por favor intenta de nuevo.</p>}
        <button onClick={handleGoogleSignIn} disabled={loading}>
          {loading ? "Loggeando..." : "Iniciar Sesión con Google"}
        </button>
      </div>

      <footer className="login__footer">
        © MITÜMI {new Date().getFullYear()}
      </footer>
    </main>
  );
};
