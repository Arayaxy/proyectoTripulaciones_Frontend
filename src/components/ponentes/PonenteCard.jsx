import { useNavigate } from 'react-router'
import './_ponenteCard.scss'

export const PonenteCard = ({ ponente, onDelete }) => {
  const navigate = useNavigate()

  return (
    <article className="ponente-card">
      <h2 className="ponente-card__name">{ponente.nombrePonente}</h2>
      <p className="ponente-card__detail"><span className="ponente-card__label">Email:</span> <strong>{ponente.email}</strong></p>
      <p className="ponente-card__detail"><span className="ponente-card__label">Teléfono:</span> <strong>{ponente.telefono}</strong></p>
      <p className="ponente-card__detail"><span className="ponente-card__label">Empresa:</span> <strong>{ponente.empresa}</strong></p>
      <p className="ponente-card__detail"><span className="ponente-card__label">Cargo:</span> <strong>{ponente.cargo}</strong></p>
      <p className="ponente-card__detail"><span className="ponente-card__label">Sector:</span> <strong>{ponente.sector}</strong></p>
      <div className="ponente-card__botones">
        <button className="btn btn--logout md" onClick={() => onDelete(ponente.id)}>Eliminar</button>
        <button className="btn btn--primary md" onClick={() => navigate(`/ponentes/editar/${ponente.id}`)}>Editar</button>
      </div>
    </article>
  )
}</think>

<｜DSML｜tool_calls>
<｜DSML｜invoke name="write">
<｜DSML｜parameter name="filePath" string="true">C:\Users\Isild\Desktop\proyecto_tripulaciones\proyectoTripulaciones_Frontend\src\components\ponentes\PonenteCard.jsx