import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { useParams, useNavigate } from 'react-router'
import { useFetch } from '../../hooks/useFetch'

const API_URL = import.meta.env.VITE_API_URL

export const EventoDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
        <NavbarInterno />
        <EventoInfo evento={evento} />
        <div className="client-card__botones">
          <button className="btn btn--logout" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="btn btn--primary" onClick={() => navigate(`/eventos/editar/${id}`)}>
            Editar
          </button>
        </div>
      </section>
    </>
  )
}
