import '../../components/partials/_agente.scss'
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ENDPOINT_URL = import.meta.env.VITE_AGENTES_URL;

export const AgentePage = () => {
  const { user } = useAuth();
  const [pregunta, setPregunta] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(ENDPOINT_URL, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesion_id: user?.role || "prueba-ander",
          pregunta: pregunta.trim(),
        }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <header className='titlePage'>
      <h1>Agentes de consultas </h1>
    </header>
    <section className='container'>
      <form className="agente-form" onSubmit={handleSubmit}>
        <div className="agente-form__search">
          <input
            className="input"
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu pregunta..."
          />
          <button className="btn btn--primary" type="submit" disabled={loading || !pregunta.trim()}>
            {loading ? "Enviando..." : "Preguntar"}
          </button>
        </div>
      </form>
      {error && <p className="agente__error">Error: {error}</p>}
      {data && (
        <div className="agente__response">
          <p className="agente__response__label">Respuesta</p>
          {data.resumen}
        </div>
      )}
    </section>
    </>
  );
};
