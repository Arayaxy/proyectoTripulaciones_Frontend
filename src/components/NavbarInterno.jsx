import { NavLink, Link } from "react-router"
import './partials/_navbarInterno.scss'

export const NavbarInterno = ({ eventoId }) => {

  return (
    <nav className="navbar-interno">
      <ul>
        <li><NavLink to={`/detalle/${eventoId}?seccion=datos`}>Datos</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=ponentes`}>Ponentes</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=lugar`}>Lugar</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=presupuesto`}>Presupuesto</NavLink></li>
        <li>
          <Link to={`/detalle/${eventoId}`}>Volver</Link>
        </li>
      </ul>
    </nav>
  )
}
