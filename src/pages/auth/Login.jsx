import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import heroLogo from '../../assets/logo_2026_Backstage.svg'
import heroImg from '../../assets/heroImg.jpg'
import '../../components/partials/_login.scss'

export const Login = () => {
  const { googleSignIn, user, setUser, loading, setLoading, error, setError, logOut } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/eventos", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    setLoginError(null);
    setLoading(true);

    try {
      const result = await googleSignIn();
      const firebaseIdToken = await result.user.getIdToken();

      const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firebaseIdToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();

      if (resp.status === 403) {
        await signOut(auth);
        await logOut();
        setError(data.message || "No tienes privilegios de acceso");
        return;
      }

      if (!resp.ok) throw new Error(data.message || "Error de validación");

      setUser(data.user);
      navigate("/eventos");
    } catch (err) {
      console.error(err.message);
      setLoginError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <header className="login__header">
        <img src={heroLogo} alt="MITÜMI Backstage" />
      </header>
      <div className="login__hero">
        <img src={heroImg} alt="MITÜMI Backstage" className="login__hero-img" />
      </div>

      <section className="login__body">
        <h2>¡Hola!</h2>
        <p>Usa tu <strong>cuenta de Google</strong> para entrar en <strong>The Backstage</strong></p>
        {error && <p className="login__error">{error}</p>}
        <button
          className="login__google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <span>Cargando...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                <path fill="#FFC107" d="M43.611 20.083H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Continúa con Google
            </>
          )}
        </button>
      </section>

      <footer className="login__footer">
        © MITÜMI {new Date().getFullYear()}
      </footer>
    </main>
  );
};
