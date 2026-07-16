import { useState } from "react";
import { useNavigate } from "react-router";
import "../../components/partials/_backdoor.scss";

export const Backdoor = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [adminSuperKey, setAdminSuperKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const resp = await fetch(`${API_URL}/auth/backdoor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, admin_super_key: adminSuperKey }),
      });

      const data = await resp.json();

      if (resp.ok && resp.status === 201) {
        setSuccess(true);
        setMessage(data.message || "Admin creado. Por favor inicia sesión.");
      } else {
        setSuccess(false);
        setMessage(data.message || "email/key incorrecto");
      }
    } catch {
      setSuccess(false);
      setMessage("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="backdoor">
      <div className="backdoor__container">
        {success ? (
          <>
            <h2 className="backdoor__title">Éxito</h2>
            <p className="backdoor__success">{message}</p>
            <button className="backdoor__link" onClick={() => navigate("/")}>
              Ir al inicio
            </button>
          </>
        ) : (
          <>
            <h2 className="backdoor__title">Acceso restringido</h2>
            <form className="backdoor__form" onSubmit={handleSubmit}>
              <input
                className="backdoor__input"
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="backdoor__input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="backdoor__input"
                type="password"
                placeholder="Super Secret Key"
                value={adminSuperKey}
                onChange={(e) => setAdminSuperKey(e.target.value)}
                required
                disabled={loading}
              />
              {message && <p className="backdoor__error">{message}</p>}
              <button
                className="backdoor__submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Crear Admin"}
              </button>
            </form>
            <button className="backdoor__link" onClick={() => navigate("/")}>
              Volver al inicio de sesión
            </button>
          </>
        )}
      </div>
    </main>
  );
};
