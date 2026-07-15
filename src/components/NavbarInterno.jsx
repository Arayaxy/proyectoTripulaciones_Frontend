import { NavLink } from "react-router"
import './partials/_navbar.scss'

export const NavbarInterno = ({ eventoId }) => {

  return (
    <nav className="main-navbar">
      <ul>
        <li>
          <NavLink to={`/detalle/${eventoId}?seccion=datos`}>Datos</NavLink>
        </li>
        <li>
          <NavLink to={`/detalle/${eventoId}?seccion=ponencias`}>Ponencias</NavLink>
        </li>
        <li>
          <NavLink to={`/detalle/${eventoId}?seccion=lugar`}>Lugar</NavLink>
        </li>
        <li>
          <NavLink to={`/detalle/${eventoId}?seccion=presupuesto`}>Presupuesto</NavLink>
        </li>
      </ul>
    </nav>
  )
}
