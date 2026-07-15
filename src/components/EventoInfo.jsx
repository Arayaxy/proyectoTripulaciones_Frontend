
import './partials/_eventos.scss'
import { useFetch } from '../hooks/useFetch'

export const EventoInfo = ({ eventId }) => {
  const API_URL = import.meta.env.VITE_API_URL

  const { data, loading, error } = useFetch(
    eventId ? `${API_URL}/eventos/${eventId}` : null,
    "GET"
  )

  if (loading) return <div className="event_info_cargando">Cargando...</div>
  if (error) return <div className="evento_info_error">Error: {error}</div>

  const evento = data?.data

  if (!evento) return null

  return (

    <div className="evento-info">
      <h2 className="evento_info_titulo">{evento.nombreEvento}</h2>
      <p className="evento_info_ciudad">{evento.ciudad}</p>
      <p className="evento_info_fecha">
        {new Date(evento.fechaInicio).toLocaleDateString("es-ES", {
          year: "numeric", month: "long", day: "numeric"
        })}
      </p>
      <p className="evento_info_personas">{evento.numeroPersonas}</p>

    </div>

  )
}
