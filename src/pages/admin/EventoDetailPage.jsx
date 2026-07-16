import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { SeccionDetail } from '../../components/SeccionDetail'
import { PonenciasView } from '../../components/PonenciasView'
import { useParams, useSearchParams, Link } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import '../../components/partials/_eventos.scss'

const API_URL = import.meta.env.VITE_API_URL

export const EventoDetailPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const seccion = searchParams.get('seccion')
  const { data, loading, setData } = useFetch(`${API_URL}/eventos/${id}`)
  const evento = data?.data

  const formatDate = (date) => date ? new Date(date).toLocaleDateString("es-ES") : ""
  const formatDateTime = (date) => date ? new Date(date).toLocaleString("es-ES") : ""

  const handleDeletePonencia = async (ponenciaId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta ponencia?')) return
    try {
      const res = await fetch(`${API_URL}/ponencias/${ponenciaId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const result = await res.json()
      if (result.ok || result.success) {
        setData({
          ...data,
          data: {
            ...evento,
            ponencias: (evento.ponencias || []).filter((p) => p.id !== ponenciaId),
          },
        })
      }
    } catch (err) {
      console.error('Error al eliminar ponencia:', err)
    }
  }

  if (loading) return <div className="event_info_cargando">Cargando...</div>
  if (!evento) return <div className="evento_info_error">Evento no encontrado</div>

  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
      </header>
      <section className='container'>
        <article className='containerDatosEvento'>
          <NavbarInterno eventoId={id} />

          <div className="evento_info">
            <h2 className="evento_info_titulo">{evento.nombreEvento}</h2>
            <p className="evento_info_fecha">
              {formatDate(evento.fechaInicio)}
            </p>
            <p className="evento_info_ciudad">{evento.ciudad}</p>
            <p className="evento_info_personas">{evento.numeroPersonas} personas</p>
          </div>

          {seccion === 'presupuesto' ? (
            evento.presupuesto ? (
              <div className="evento_info">
                <h2 className="evento_info_titulo">Presupuesto del Evento</h2>
                <p className="evento_info_fecha">
                  Estado: <strong>{evento.presupuesto.estadoPresupuesto ? "Aprobado" : "Pendiente"}</strong>
                </p>
                <p>
                  <span className="evento_info_ciudad">Total:</span>{' '}
                  <strong>{evento.presupuesto.total}€</strong>
                </p>
                <p>Fecha: {formatDate(evento.presupuesto?.fecha)}</p>

                <p className="evento_info_fecha" style={{ marginTop: '12px' }}>Ubicación</p>
                {evento.presupuesto.precioUbicacion ? (
                  <p>Precio ubicación: <strong>{evento.presupuesto.precioUbicacion}€</strong></p>
                ) : (
                  <p>Precio ubicación: <strong>No especificado</strong></p>
                )}
                {evento.presupuesto.notaUbicacion && <p>Nota: {evento.presupuesto.notaUbicacion}</p>}

                {evento.presupuesto.catering && (
                  <>
                    <p className="evento_info_fecha" style={{ marginTop: '12px' }}>Catering</p>
                    <p>Precio catering: <strong>{evento.presupuesto.precioCatering}€</strong></p>
                    {evento.presupuesto.notaCatering && <p>Nota: {evento.presupuesto.notaCatering}</p>}
                  </>
                )}

                {evento.presupuesto.audiovisuales && (
                  <>
                    <p className="evento_info_fecha" style={{ marginTop: '12px' }}>Audiovisuales</p>
                    <p>Precio audiovisuales: <strong>{evento.presupuesto.precioAudiovisuales}€</strong></p>
                    {evento.presupuesto.notaAudiovisuales && <p>Nota: {evento.presupuesto.notaAudiovisuales}</p>}
                  </>
                )}

                {evento.presupuesto.otros && (
                  <>
                    <p className="evento_info_fecha" style={{ marginTop: '12px' }}>Otros</p>
                    <p>Precio otros: <strong>{evento.presupuesto.precioOtros}€</strong></p>
                    {evento.presupuesto.notaOtros && <p>Nota: {evento.presupuesto.notaOtros}</p>}
                  </>
                )}

                {evento.presupuesto.observaciones && (
                  <>
                    <p className="evento_info_fecha" style={{ marginTop: '12px' }}>Observaciones</p>
                    <p>{evento.presupuesto.observaciones}</p>
                  </>
                )}
              </div>
            ) : (
              <div className="evento_info">
                <h2 className="evento_info_titulo">Presupuesto</h2>
                <p className="evento_info_fecha">Este evento no tiene presupuesto asignado</p>
                <div className="zonaBotones">
                  <Link to="/presupuestos/crear" className="btn btn--primary">Crear presupuesto</Link>
                </div>
              </div>
            )
          ) : seccion === 'ponentes' ? (
            <div className="evento_info">
              <PonenciasView evento={evento} eventoId={id} onDelete={handleDeletePonencia} />
            </div>
          ) : seccion === 'datos' ? (
            <div className="evento_info">
              <EventoInfo evento={evento} />
            </div>
          ) : seccion === 'lugar' ? (
            <div className="evento_info">
              <h2 className="evento_info_titulo">Lugar del Evento</h2>
              <p className="evento_info_fecha">
                Estado: <strong>{evento.lugarConfirmado ? 'Confirmado' : 'Pendiente'}</strong>
              </p>
              {evento.sala ? (
                <>
                  <p>Sala: <strong>{evento.sala.nombreSala}</strong></p>
                  {evento.sala.tipoSala && <p>Tipo: <strong>{evento.sala.tipoSala}</strong></p>}
                  {evento.sala.capacidadMaxSala && <p>Capacidad: <strong>{evento.sala.capacidadMaxSala} personas</strong></p>}
                  {evento.sala.notaSala && <p>Nota: <strong>{evento.sala.notaSala}</strong></p>}
                </>
              ) : (
                <p>Sala: <strong>Sin asignar</strong></p>
              )}
              <p>Ubicación: <strong>{evento.ciudad}</strong></p>
              <p>Asistentes: <strong>{evento.numeroPersonas} personas</strong></p>
              <p>
                Fechas: {formatDate(evento.fechaInicio)} — {formatDate(evento.fechaFin)}
              </p>
              {evento.cliente && (
                <p>Cliente: <strong>{evento.cliente.cliente}</strong>{evento.cliente.empresa && <> ({evento.cliente.empresa})</>}</p>
              )}
            </div>
          ) : (
            <>
              <article className="evento_info">
                <h2 className="evento_info_titulo">Lugar</h2>
                <p className="evento_info_fecha">
                  Estado: <strong>{evento.lugarConfirmado ? 'Confirmado' : 'Pendiente'}</strong>
                </p>
                <p>Sala: <strong>{evento.sala?.nombreSala || 'Sin asignar'}</strong></p>
                {evento.sala?.tipoSala && (
                  <p>Tipo: <strong>{evento.sala.tipoSala}</strong></p>
                )}
                <p>Ubicación: <strong>{evento.ciudad}</strong></p>
                {evento.sala?.capacidadMaxSala && (
                  <p>Capacidad: <strong>{evento.sala.capacidadMaxSala} personas</strong></p>
                )}
                <div className="zonaBotones">
                  <Link to={`/detalle/${id}?seccion=lugar`} className="btn btn--outline sm">Ver lugar</Link>
                </div>
              </article>

              <article className="evento_info">
                <h2 className="evento_info_titulo">Presupuesto</h2>
                <p className="evento_info_fecha">
                  Estado: <strong>{evento.presupuesto?.estadoPresupuesto ? 'Aprobado' : 'Pendiente'}</strong>
                </p>
                <p>Total: <strong>{evento.presupuesto?.total ? `${evento.presupuesto.total}€` : 'Sin presupuesto'}</strong></p>
                {evento.presupuesto?.fecha && (
                  <p>Fecha: <strong>{formatDate(evento.presupuesto.fecha)}</strong></p>
                )}
                {evento.presupuesto && (
                  <p>
                    {evento.presupuesto.catering ? 'Catering ✓' : 'Catering ✗'}
                    {' | '}
                    {evento.presupuesto.audiovisuales ? 'Audiovisuales ✓' : 'Audiovisuales ✗'}
                  </p>
                )}
                <div className="zonaBotones">
                  <Link to={`/detalle/${id}?seccion=presupuesto`} className="btn btn--outline sm">Ver presupuesto</Link>
                </div>
              </article>

              <article className="evento_info">
                <h2 className="evento_info_titulo">Ponencias</h2>
                <p className="evento_info_fecha">
                  Asignados: <strong>{evento.ponencias?.length || 0}</strong>
                </p>
                {evento.ponencias?.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {evento.ponencias.map((p) => (
                      <li key={p.id} style={{ marginBottom: '8px' }}>
                        <strong>{p.ponente?.nombrePonente}</strong>
                        {p.ponente?.empresa && <span> — {p.ponente.empresa}</span>}
                        {p.ponente?.cargo && <span> ({p.ponente.cargo})</span>}
                        <br />
                        <span style={{ fontSize: '0.85em', opacity: 0.8 }}>
                          {p.tipoPonencia} | {p.horarioPonencia ? new Date(p.horarioPonencia).toLocaleString('es-ES', {
                            weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          }) : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Sin ponencias asignadas</p>
                )}
                <div className="zonaBotones">
                  <Link to={`/detalle/${id}?seccion=ponentes`} className="btn btn--outline sm">Ver ponencias</Link>
                </div>
              </article>
            </>
          )}
        </article>
      </section>
    </>
  )
}
