import { NavLink, Link } from "react-router"
import './partials/_navbarInterno.scss'

export const NavbarInterno = ({ eventoId }) => {
  return (
    <nav className="navbar-interno">
      <ul>
        <li><Link to={`/detalle/${eventoId}`}>General</Link></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=datos`}>Datos</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=ponentes`}>Ponencias</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=lugar`}>Lugar</NavLink></li>
        <li><NavLink to={`/detalle/${eventoId}?seccion=presupuesto`}>Presupuesto</NavLink></li>
      </ul>
    </nav>
  )
}
