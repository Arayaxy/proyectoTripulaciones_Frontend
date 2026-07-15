import { useState, useEffect } from 'react';
import '../../components/partials/_concursos.scss';

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
    <>
      <header className='titlePage'>
        <h1>Concursos Públicos</h1>
      </header>
      <section className='container'>
        {loading && <p>Cargando...</p>}
        {error && <p className="concurso__error">Error: {error}</p>}
        <div className="concursos__grid">
        {data && data.map((concurso) => (
          <article className="concurso-card" key={concurso.id_expediente}>
            <div className="concurso-card__header">
              <span className="concurso-card__id">{concurso.id_expediente}</span>
              {concurso.urgencia_nivel && (
                <span className={`concurso-card__urgencia concurso-card__urgencia--${concurso.urgencia_nivel}`}>
                  {concurso.urgencia_nivel} · {concurso.urgencia_dias}d
                </span>
              )}
            </div>
            <p className="concurso-card__organismo">
              {concurso.organo_convocante} <span>· {concurso.diputacion}</span>
            </p>
            <p className="concurso-card__objeto">{concurso.objeto}</p>
            {concurso.motivo && (
              <p className="concurso-card__motivo">💡 {concurso.motivo}</p>
            )}
            <div className="concurso-card__footer">
              <div className="concurso-card__meta">
                <span><strong>Importe:</strong> {concurso.importe}€</span>
                <span><strong>Plazo:</strong> {concurso.plazo_presentacion}</span>
              </div>
              {concurso.etiquetas?.length > 0 && (
                <div className="concurso-card__tags">
                  {concurso.etiquetas.map(tag => (
                    <span className="concurso-card__tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              <a className="btn btn--primary" href={concurso.enlace_pliego} target="_blank" rel="noopener noreferrer">
                Ver pliego
              </a>
            </div>
          </article>
        ))}
        </div>
      </section>
    </>
  );
};
