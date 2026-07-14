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
    <div>
      <h1>Agentes de consultas internas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button type="submit" disabled={loading || !pregunta.trim()}>
          {loading ? "Enviando..." : "Preguntar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && <p>{data.resumen}</p>}
    </div>
  );
};
