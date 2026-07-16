import { Link } from 'react-router'
import './partials/_ponente.scss'

export const PonenciasView = ({ evento, eventoId, onDelete }) => {
  const ponencias = evento.ponencias || []
  const formatDateTime = (date) => date ? new Date(date).toLocaleString("es-ES") : ""

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
              <h3 className="ponente-card__title">{p.tipoPonencia} {p.ponente?.nombrePonente}</h3>
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
              <span>{formatDateTime(p.horarioPonencia)}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Check-in:</span>
              <span>{formatDateTime(p.checkinHorario)}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Transporte Ida:</span>
              <span>{formatDateTime(p.horarioIdaTransporte)}</span>
            </div>
            <div className="ponente-card__field">
              <span className="ponente-card__label">Transporte Vuelta:</span>
              <span>{formatDateTime(p.horarioVueltaTransporte)}</span>
            </div>
          </div>
          <div className="ponente-card__footer">
            <div className="ponente-card__actions">
              <button
                type="button"
                className="btn btn--logout"
                onClick={() => onDelete(p.id)}
              >
                Eliminar
              </button>
              <Link
                to={`/detalle/${eventoId}/ponencias/editar/${p.id}`}
                state={linkState}
                className="btn btn--primary"
              >
                Editar
              </Link>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
