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

  const handleDeletePonencia = async (ponenciaId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta ponencia?')) return
    try {
      const res = await fetch(`${API_URL}/ponencias/${ponenciaId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const result = await res.json()
      if (result.ok) {
        setData({
          ...data,
          data: {
            ...evento,
            ponencias: evento.ponencias.filter((p) => p.id !== ponenciaId),
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
              {new Date(evento.fechaInicio).toLocaleDateString("es-ES", {
                year: "numeric", month: "long", day: "numeric"
              })}
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
                <p>Fecha: {new Date(evento.presupuesto.fecha).toLocaleDateString()}</p>
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
              <h2 className="evento_info_titulo">Lugar</h2>
              <p className="evento_info_fecha">
                Estado: <strong>{evento.lugarConfirmado ? 'Confirmado' : 'Pendiente'}</strong>
              </p>
              <p><span className="evento_info_ciudad">Sala:</span> <strong>{evento.sala?.nombreSala || 'Sin asignar'}</strong></p>
              <p>Ubicación: <strong>{evento.ciudad}</strong></p>
            </div>
          ) : (
            <>
              <article className="evento_info">
                <h2 className="evento_info_titulo">Lugar</h2>
                <p className="evento_info_fecha">
                  Estado: <strong>{evento.lugarConfirmado ? 'Confirmado' : 'Pendiente'}</strong>
                </p>
                <p>Sala: <strong>{evento.sala?.nombreSala || 'Sin asignar'}</strong></p>
                <p>Ubicación: <strong>{evento.ciudad}</strong></p>
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
                <div className="zonaBotones">
                  <Link to={`/detalle/${id}?seccion=presupuesto`} className="btn btn--outline sm">Ver presupuesto</Link>
                </div>
              </article>

              <article className="evento_info">
                <h2 className="evento_info_titulo">Ponencias</h2>
                <p className="evento_info_fecha">
                  Asignados: <strong>{evento.ponencias?.length || 0}</strong>
                </p>
                <p>
                  {evento.ponencias?.length > 0
                    ? evento.ponencias.map(p => p.ponente?.nombrePonente).join(', ')
                    : 'Sin ponencias asignadas'}
                </p>
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
