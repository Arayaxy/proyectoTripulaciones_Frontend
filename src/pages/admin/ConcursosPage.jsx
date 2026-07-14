import { useState, useEffect } from 'react';

const ENDPOINT_URL = import.meta.env.VITE_CONCURSOS_URL;

export const ConcursosPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(ENDPOINT_URL, { credentials: "omit" });
        const json = await res.json();
        setData(json.concursos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Concursos encontrados</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data && data.map((concurso) => (
        <pre key={concurso.id_expediente}>{JSON.stringify(concurso)}</pre>
      ))}
    </div>
  );
};
