import './partials/_resultadoBusqueda.scss'

const HotelCard = ({ item }) => (
  <div className="resultado-busqueda__card">
    <h4 className="resultado-busqueda__card-title">{item.nombre}</h4>
    <div className="resultado-busqueda__card-body">
      <p><span>Estrellas:</span> {'★'.repeat(item.estrellas)}</p>
      <p><span>Valoración:</span> {item.valoracion}/10</p>
      <p><span>Distancia recinto:</span> {item.distancia_recinto_km} km</p>
      <p><span>Habitaciones:</span> {item.habitaciones}</p>
      <p><span>Noches:</span> {item.noches}</p>
      <p><span>Precio/noche:</span> {item.precio_noche} {item.moneda}</p>
      <p><span>Precio total:</span> {item.precio_total} {item.moneda}</p>
      {item.enlace_reserva && (
        <a href={item.enlace_reserva} target="_blank" rel="noopener noreferrer" className="btn btn--small">
          Reservar
        </a>
      )}
    </div>
  </div>
)

const ViajeCard = ({ item, tipo }) => {
  const formatDuracion = (min) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="resultado-busqueda__card">
      <h4 className="resultado-busqueda__card-title">{item.proveedor} <span className="resultado-busqueda__card-subtitle">({item.modo})</span></h4>
      <div className="resultado-busqueda__card-body">
        <p><span>Precio total:</span> {item.precio_total} {item.moneda}</p>
        {item.ida && (
          <div className="resultado-busqueda__tramo">
            <p className="resultado-busqueda__tramo-label">Ida</p>
            <p><span>Salida:</span> {item.ida.origen} → {item.ida.destino}</p>
            <p><span>Horario:</span> {item.ida.salida} → {item.ida.llegada}</p>
            <p><span>Duración:</span> {formatDuracion(item.ida.duracion_min)}</p>
            <p><span>Escalas:</span> {item.ida.escalas}</p>
          </div>
        )}
        {item.vuelta && (
          <div className="resultado-busqueda__tramo">
            <p className="resultado-busqueda__tramo-label">Vuelta</p>
            <p><span>Salida:</span> {item.vuelta.origen} → {item.vuelta.destino}</p>
            <p><span>Horario:</span> {item.vuelta.salida} → {item.vuelta.llegada}</p>
            <p><span>Duración:</span> {formatDuracion(item.vuelta.duracion_min)}</p>
            <p><span>Escalas:</span> {item.vuelta.escalas}</p>
          </div>
        )}
        {item.enlace_reserva && (
          <a href={item.enlace_reserva} target="_blank" rel="noopener noreferrer" className="btn btn--small">Reservar</a>
        )}
      </div>
    </div>
  )
}

export const ResultadoBusqueda = ({ data }) => {
  if (!data?.propuesta) return null

  const p = data.propuesta

  return (
    <div className="resultado-busqueda">
      {p.resumen && (
        <div className="resultado-busqueda__resumen">
          <h3>Resumen</h3>
          <p>{p.resumen}</p>
        </div>
      )}

      {p.justificacion && (
        <div className="resultado-busqueda__resumen">
          <h3>Justificación</h3>
          <p>{p.justificacion}</p>
        </div>
      )}

      {p.recomendacion && (
        <div className="resultado-busqueda__resumen">
          <h3>Recomendación</h3>
          <p>{p.recomendacion}</p>
        </div>
      )}

      {p.ponente && (
        <div className="resultado-busqueda__info">
          <p><span>Ponente:</span> {p.ponente.nombre} ({p.ponente.email})</p>
          <p><span>Origen:</span> {p.ponente.ciudad_origen}</p>
        </div>
      )}

      {p.evento && (
        <div className="resultado-busqueda__info">
          <p><span>Evento:</span> {p.evento.nombre}</p>
          <p><span>Ciudad:</span> {p.evento.ciudad}</p>
          <p><span>Fechas:</span> {p.evento.fecha_inicio} → {p.evento.fecha_fin}</p>
        </div>
      )}

      {p.hoteles?.length > 0 && (
        <div className="resultado-busqueda__section">
          <h3 className="resultado-busqueda__section-title">Hoteles ({p.hoteles.length})</h3>
          <div className="resultado-busqueda__grid">
            {p.hoteles.map((item, i) => <HotelCard key={i} item={item} />)}
          </div>
        </div>
      )}

      {p.vuelos?.length > 0 && (
        <div className="resultado-busqueda__section">
          <h3 className="resultado-busqueda__section-title">Vuelos ({p.vuelos.length})</h3>
          <div className="resultado-busqueda__grid">
            {p.vuelos.map((item, i) => <ViajeCard key={i} item={item} />)}
          </div>
        </div>
      )}


    </div>
  )
}
