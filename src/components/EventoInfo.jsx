import './partials/_eventos.scss'

export const EventoInfo = ({ evento }) => {
  return (
    <div>
      <article className="client-card">
        <h2 className="client-card__name">{evento.nombreEvento}</h2>

        <p className="client-card__detail">
          <span className="client-card__label">Estado:</span> <strong>{evento.estado}</strong>
        </p>
        <p className="client-card__detail">
          <span className="client-card__label">Ciudad:</span> <strong>{evento.ciudad}</strong>
        </p>
        <p className="client-card__detail">
          <span className="client-card__label">Tipo de evento:</span> <strong>{evento.tipoEvento}</strong>
        </p>
        <p className="client-card__detail">
          <span className="client-card__label">Fecha inicio:</span>{' '}
          <strong>{new Date(evento.fechaInicio).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
        </p>
        <p className="client-card__detail">
          <span className="client-card__label">Fecha fin:</span>{' '}
          <strong>{new Date(evento.fechaFin).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
        </p>
        <p className="client-card__detail">
          <span className="client-card__label">Nº personas:</span> <strong>{evento.numeroPersonas}</strong>
        </p>
        {evento.lugarConfirmado && (
          <p className="client-card__detail">
            <span className="client-card__label">Lugar confirmado:</span> <strong>{evento.lugarConfirmado}</strong>
          </p>
        )}
        {evento.nota && (
          <p className="client-card__detail">
            <span className="client-card__label">Nota:</span> <strong>{evento.nota}</strong>
          </p>
        )}
      </article>

      {evento.cliente && (
        <article className="client-card">
          <h2 className="client-card__name">Cliente</h2>
          <p className="client-card__detail">
            <span className="client-card__label">Nombre:</span> <strong>{evento.cliente.cliente}</strong>
          </p>
          <p className="client-card__detail">
            <span className="client-card__label">Email:</span> <strong>{evento.cliente.email}</strong>
          </p>
          <p className="client-card__detail">
            <span className="client-card__label">Teléfono:</span> <strong>{evento.cliente.telefono}</strong>
          </p>
          {evento.cliente.empresa && (
            <p className="client-card__detail">
              <span className="client-card__label">Empresa:</span> <strong>{evento.cliente.empresa}</strong>
            </p>
          )}
          {evento.cliente.sector && (
            <p className="client-card__detail">
              <span className="client-card__label">Sector:</span> <strong>{evento.cliente.sector}</strong>
            </p>
          )}
        </article>
      )}

      {evento.sala && (
        <article className="client-card">
          <h2 className="client-card__name">Sala</h2>
          <p className="client-card__detail">
            <span className="client-card__label">Nombre:</span> <strong>{evento.sala.nombreSala}</strong>
          </p>
          <p className="client-card__detail">
            <span className="client-card__label">Tipo:</span> <strong>{evento.sala.tipoSala}</strong>
          </p>
          <p className="client-card__detail">
            <span className="client-card__label">Capacidad:</span> <strong>{evento.sala.capacidadMaxSala} personas</strong>
          </p>
        </article>
      )}

      {evento.ponencias?.length > 0 && (
        <article className="client-card">
          <h2 className="client-card__name">Ponencias ({evento.ponencias.length})</h2>
          {evento.ponencias.map((p) => (
            <p key={p.id} className="client-card__detail">
              <span className="client-card__label">{p.ponente?.nombrePonente || 'Ponente'}:</span>{' '}
              <strong>{p.tipoPonencia}</strong>
              {p.nombreHotel && <span> — {p.nombreHotel}</span>}
            </p>
          ))}
        </article>
      )}
    </div>
  )
}
