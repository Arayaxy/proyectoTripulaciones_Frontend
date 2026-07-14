import { useState, useEffect } from 'react';

const ENDPOINT_URL = import.meta.env.VITE_AGENTES_URL;

export const AgentePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ENDPOINT_URL, { method: "POST", credentials: "omit" })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Agentes de consultas internas</h1>
      {loading && <p>Cargando...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
