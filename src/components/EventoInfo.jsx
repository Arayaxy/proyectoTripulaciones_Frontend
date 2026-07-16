import './partials/_eventos.scss'

export const EventoInfo = ({ evento }) => {
  return (
    <>
      <article>
        <h2 className="evento_info_titulo">{evento.nombreEvento}</h2>
        <p className="evento_info_fecha">Estado: <strong>{evento.estado}</strong></p>
        <p><span className="evento_info_ciudad">Ciudad:</span> <strong>{evento.ciudad}</strong></p>
        <p>Tipo de evento: <strong>{evento.tipoEvento}</strong></p>
        <p>Fecha inicio: <strong>{new Date(evento.fechaInicio).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        <p>Fecha fin: <strong>{new Date(evento.fechaFin).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        <p>Nº personas: <strong>{evento.numeroPersonas}</strong></p>
        {evento.lugarConfirmado && <p>Lugar confirmado: <strong>{evento.lugarConfirmado}</strong></p>}
        {evento.nota && <p>Nota: <strong>{evento.nota}</strong></p>}
      </article>

      {evento.cliente && (
        <article>
          <h2 className="evento_info_titulo">Cliente</h2>
          <p>Nombre: <strong>{evento.cliente.cliente}</strong></p>
          <p>Email: <strong>{evento.cliente.email}</strong></p>
          <p>Teléfono: <strong>{evento.cliente.telefono}</strong></p>
          {evento.cliente.empresa && <p>Empresa: <strong>{evento.cliente.empresa}</strong></p>}
          {evento.cliente.sector && <p>Sector: <strong>{evento.cliente.sector}</strong></p>}
        </article>
      )}

      {evento.sala && (
        <article>
          <h2 className="evento_info_titulo">Sala</h2>
          <p>Nombre: <strong>{evento.sala.nombreSala}</strong></p>
          <p>Tipo: <strong>{evento.sala.tipoSala}</strong></p>
          <p>Capacidad: <strong>{evento.sala.capacidadMaxSala} personas</strong></p>
        </article>
      )}

      {evento.ponencias?.length > 0 && (
        <article>
          <h2 className="evento_info_titulo">Ponencias ({evento.ponencias.length})</h2>
          {evento.ponencias.map((p) => (
            <p key={p.id}>
              <strong>{p.ponente?.nombrePonente || 'Ponente'}:</strong> {p.tipoPonencia}
              {p.nombreHotel && <span> — {p.nombreHotel}</span>}
            </p>
          ))}
        </article>
      )}
    </>
  )
}
