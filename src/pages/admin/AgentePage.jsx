import '../../components/partials/_agente.scss'
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BusquedaAgenteForm } from '../../components/BusquedaAgenteForm';

const ENDPOINT_URL = import.meta.env.VITE_AGENTES_URL;

export const AgentePage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
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
          pregunta: JSON.stringify(formData),
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
        <h1>Búsqueda de ponente</h1>
      </header>
      <section className='container'>
        <BusquedaAgenteForm onSubmit={handleSubmit} loading={loading} />
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
