import { NavLink } from "react-router"
import './partials/_navbar.scss'

export const NavbarInterno = ({ eventoId }) => {
  const link = (path) => `${path}?eventoId=${eventoId}`

  return (
    <nav className="main-navbar">
      <ul>
        <li>
          <NavLink to={link("/datos")}>Datos</NavLink>
        </li>
        <li>
          <NavLink to={link("/ponencias")}>Ponencias</NavLink>
        </li>
        <li>
          <NavLink to={link("/lugar")}>Lugar</NavLink>
        </li>
        <li>
          <NavLink to={link("/presupuestos")}>Presupuestos</NavLink>
        </li>
      </ul>
    </nav>
  )
}
