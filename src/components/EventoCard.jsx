import { useNavigate } from 'react-router'

export const EventoCard = ({ evento, onDelete }) => {
  const navigate = useNavigate()

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('es-ES')
  }

  return (
    <article className="client-card">
      <div>
      <h2 className="client-card__name">{evento.nombreEvento}</h2>
      <p className="client-card__detail">
        <span className="client-card__label">Ciudad:</span>{' '}
        <strong>{evento.ciudad}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Tipo:</span>{' '}
        <strong>{evento.tipoEvento}</strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Fechas:</span>{' '}
        <strong>
          {formatDate(evento.fechaInicio)} - {formatDate(evento.fechaFin)}
        </strong>
      </p>
      <p className="client-card__detail">
        <span className="client-card__label">Asistentes:</span>{' '}
        <strong>{evento.numeroPersonas}</strong>
      </p>
      {evento.cliente && (
        <p className="client-card__detail">
          <span className="client-card__label">Cliente:</span>{' '}
          <strong>{evento.cliente.cliente}</strong>
        </p>
      )}
      {evento.estado && (
        <p className="client-card__detail">
          <span className="client-card__label">Estado:</span>{' '}
          <strong>{evento.estado.descripcion}</strong>
        </p>
      )}
      </div>
      <div className="client-card__botones">
        <button className="btn btn--outline md" onClick={() => navigate(`/detalle/${evento.id}`)}>
          Ver detalles
        </button>
        <button className="btn btn--logout md" onClick={() => onDelete(evento.id)}>
          Eliminar
        </button>
        <button className="btn btn--primary md" onClick={() => navigate(`/eventos/editar/${evento.id}`)}>
          Editar
        </button>
      </div>
    </article>
  )
}
