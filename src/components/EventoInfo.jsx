
import './partials/_eventos.scss'
import { useFetch } from '../hooks/useFetch'

export const EventoInfo = ({ evento }) => {



  return (

    <div className="evento_info">
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
