import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import '../../components/clientes/_clientCard.scss'

const API_URL = import.meta.env.VITE_API_URL

export const EventoDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const seccion = searchParams.get('seccion')
  const { data, loading } = useFetch(`${API_URL}/eventos/${id}`)
  const evento = data?.data

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este evento?')) return
    try {
      const res = await fetch(`${API_URL}/eventos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const json = await res.json()
      if (json.ok) {
        navigate('/eventos')
      }
    } catch (err) {
      console.error(err)
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
        <NavbarInterno eventoId={id} />

        {!seccion ? (
          <>
            <h2 className="client-card__name">{evento.nombreEvento}</h2>
            <p className="client-card__detail">
              {evento.tipoEvento} · {evento.ciudad} · {new Date(evento.fechaInicio).toLocaleDateString('es-ES')}
            </p>

            <article className="client-card">
              <h2 className="client-card__name">Lugar</h2>
              <p className="client-card__detail">
                <span className="client-card__label">Estado:</span>
                <strong>{evento.lugarConfirmado ? 'Confirmado' : 'Pendiente'}</strong>
              </p>
              <p className="client-card__detail">
                <span className="client-card__label">Ubicación:</span>
                <strong>{evento.lugarConfirmado || 'Sin confirmar'}</strong>
              </p>
              <p className="client-card__detail">Gestiona la ubicación y detalles del lugar del evento</p>
              <div className="client-card__botones">
                <button className="btn btn--outline sm" onClick={() => navigate(`/detalle/${id}?seccion=lugar`)}>
                  Ir a Lugar
                </button>
              </div>
            </article>

            <article className="client-card">
              <h2 className="client-card__name">Presupuesto</h2>
              <p className="client-card__detail">
                <span className="client-card__label">Estado:</span>
                <strong>{evento.presupuesto?.estadoPresupuesto ? 'Aprobado' : 'Pendiente'}</strong>
              </p>
              <p className="client-card__detail">
                <span className="client-card__label">Total:</span>
                <strong>{evento.presupuesto ? `${evento.presupuesto.total}€` : 'Sin presupuesto'}</strong>
              </p>
              <p className="client-card__detail">Controla el presupuesto asignado al evento</p>
              <div className="client-card__botones">
                <button className="btn btn--outline sm" onClick={() => navigate(`/detalle/${id}?seccion=presupuesto`)}>
                  Ir a Presupuesto
                </button>
              </div>
            </article>

            <article className="client-card">
              <h2 className="client-card__name">Ponentes</h2>
              <p className="client-card__detail">
                <span className="client-card__label">Estado:</span>
                <strong>{evento.ponencias?.length > 0 ? 'Asignados' : 'Pendiente'}</strong>
              </p>
              <p className="client-card__detail">
                <span className="client-card__label">Asignados:</span>
                <strong>{evento.ponencias?.length || 0} ponentes</strong>
              </p>
              <p className="client-card__detail">Administra los ponentes y sus asignaciones</p>
              <div className="client-card__botones">
                <button className="btn btn--outline sm" onClick={() => navigate(`/detalle/${id}?seccion=ponencias`)}>
                  Ir a Ponentes
                </button>
              </div>
            </article>
          </>
        ) : (
          <>
            {seccion === 'datos' ? (
              <>
                <EventoInfo evento={evento} />
                <div className="client-card__botones">
                  <button className="btn btn--logout" onClick={handleDelete}>Eliminar</button>
                  <button className="btn btn--primary" onClick={() => navigate(`/eventos/editar/${id}`)}>Editar</button>
                </div>
              </>
            ) : seccion === 'ponencias' ? (
              <h2>Gestión de Ponentes</h2>
            ) : seccion === 'lugar' ? (
              <h2>Gestión de Lugar</h2>
            ) : seccion === 'presupuesto' ? (
              <h2>Gestión de Presupuesto</h2>
            ) : (
              <>
                <EventoInfo evento={evento} />
                <div className="client-card__botones">
                  <button className="btn btn--logout" onClick={handleDelete}>Eliminar</button>
                  <button className="btn btn--primary" onClick={() => navigate(`/eventos/editar/${id}`)}>Editar</button>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
