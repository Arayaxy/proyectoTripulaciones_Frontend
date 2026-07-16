export const FichaPonenciaDetalle = ({ ponencia, isAdmin }) => {
  if (!ponencia) return null

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'
    return new Date(fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
  }

  return (
    <article className="client-card">
      <h2 className="client-card__name">{ponencia.ponente?.nombrePonente || 'Sin nombre'}</h2>
      <p className="client-card__detail">
        <span className="client-card__label">Email:</span> <strong>{ponencia.ponente?.email}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Teléfono:</span> <strong>{ponencia.ponente?.telefono}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Empresa:</span> <strong>{ponencia.ponente?.empresa}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Cargo:</span> <strong>{ponencia.ponente?.cargo}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Tipo ponencia:</span> <strong>{ponencia.tipoPonencia}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Estado:</span> <strong>{ponencia.ponenteEstado}</strong>
      </p>
    </article>
  )
}
