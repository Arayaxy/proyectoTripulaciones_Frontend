import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { SeccionDetail } from '../../components/SeccionDetail'
import { PonenciasView } from '../../components/PonenciasView'
import { useParams, useSearchParams } from 'react-router'
import { useFetch } from '../../hooks/useFetch'

const API_URL = import.meta.env.VITE_API_URL

const PresupuestoView = ({ eventoId }) => {
  const { data } = useFetch(`${API_URL}/eventos/${eventoId}`)
  const presupuesto = data?.data?.presupuesto

  if (!presupuesto) return <p>Este evento no tiene presupuesto asignado</p>

  return (
    <div>
      <h2>Presupuesto del Evento</h2>
      <div className="presupuesto-card" style={{ marginTop: '16px' }}>
        <div className="presupuesto-card__row">
          <span className="presupuesto-card__label">Total:</span>
          <span className="presupuesto-card__value">{presupuesto.total}€</span>
        </div>
        <div className="presupuesto-card__row">
          <span className="presupuesto-card__label">Estado:</span>
          <span>{presupuesto.estadoPresupuesto ? "Aprobado" : "Pendiente"}</span>
        </div>
        <div className="presupuesto-card__row">
          <span className="presupuesto-card__label">Fecha:</span>
          <span>{new Date(presupuesto.fecha).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

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

        {seccion === 'presupuesto' ? (
          <PresupuestoView eventoId={id} />
        ) : seccion === 'datos' ? (
          <EventoInfo evento={evento} />
        ) : seccion === 'ponencias' ? (
          <PonenciasView evento={evento} eventoId={id} onDelete={handleDeletePonencia} />
        ) : seccion === 'lugar' ? (
          <h2>Gestión de Lugar</h2>
        ) : (
          <EventoInfo evento={evento} />
        )}
        </article>
      </section>
    </>
  )
}
