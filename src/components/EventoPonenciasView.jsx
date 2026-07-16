import { Link } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import './partials/_ponente.scss'

const API_URL = import.meta.env.VITE_API_URL

export const EventoPonenciasView = ({ evento, eventoId, onDelete }) => {
  const { data } = useFetch(`${API_URL}/ponencias?idEvento=${eventoId}`)
  const ponencias = data?.data || evento.ponencias || []

  const linkState = { evento }

  if (!ponencias || ponencias.length === 0) {
    return (
      <div className="ponentes-list">
        <div className="ponentes-list__header">
          <h2>Ponencias del Evento</h2>
          <Link to={`/detalle/${eventoId}/ponencias/nuevo`} state={linkState} className="btn btn--outline">
            Añadir Ponencia
          </Link>
        </div>
        <p>Este evento no tiene ponencias asignadas</p>
      </div>
    )
  }

  return (
    <div className="ponentes-list">
      <div className="ponentes-list__header">
        <h2>Ponencias del Evento</h2>
        <Link to={`/detalle/${eventoId}/ponencias/nuevo`} state={linkState} className="btn btn--outline">
          Añadir Ponencia
        </Link>
      </div>
      {ponencias.map((p) => (
        <div key={p.id} className="ponente-card">
          <div className="ponente-card__header">
            <div>
              <h3 className="ponente-card__title">{p.tipoPonencia}</h3>
              <p className="ponente-card__ponente">{p.ponente?.nombrePonente}</p>
            </div>
            <span className={`ponente-card__estado ponente-card__estado--${p.ponenteEstado?.toLowerCase()}`}>
              {p.ponenteEstado}
            </span>
          </div>
          <div className="ponente-card__body">
            <div className="ponente-card__field">
              <span className="ponente-card__label">Ponente:</span>
              <span>{p.ponente?.nombrePonente}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Email:</span>
              <span>{p.ponente?.email}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Empresa:</span>
              <span>{p.ponente?.empresa}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Cargo:</span>
              <span>{p.ponente?.cargo}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Hotel:</span>
              <span>{p.nombreHotel}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Localización Hotel:</span>
              <span>{p.localizacionHotel}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Horario Ponencia:</span>
              <span>{new Date(p.horarioPonencia).toLocaleString("es-ES")}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Check-in:</span>
              <span>{new Date(p.checkinHorario).toLocaleString("es-ES")}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Transporte Ida:</span>
              <span>{new Date(p.horarioIdaTransporte).toLocaleString("es-ES")}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Transporte Vuelta:</span>
              <span>{new Date(p.horarioVueltaTransporte).toLocaleString("es-ES")}</span>
            </div>
          </div>
          <div className="ponente-card__footer">
            <div className="ponente-card__actions">
              <Link
                to={`/detalle/${eventoId}/ponencias/editar/${p.id}`}
                state={linkState}
                className="ponente-card__edit-btn"
              >
                Editar
              </Link>
              <button
                type="button"
                className="ponente-card__delete-btn"
                onClick={() => onDelete(p.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
