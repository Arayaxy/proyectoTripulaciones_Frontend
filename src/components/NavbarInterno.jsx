import { Link, NavLink } from "react-router"
import './partials/_navbar.scss'

export const NavbarInterno = () => {
  return (
    <nav className="main-navbar">
      <ul>

        <li>
          <NavLink to="/datos" >
            Datos
          </NavLink>
        </li>

        <li>
          <NavLink to="/ponencias" >
            Ponencias
          </NavLink>
        </li>

        <li>
          <NavLink to="/lugar" >
            Lugar
          </NavLink>
        </li>

        {/* <li>
          <Link to="/servicios" >
            Servicios
          </Link>
        </li> */}

        <li>
          <NavLink to="/presupuestos" >
            Presupuestos
          </NavLink>
        </li>

      </ul>
    </nav>
  )
}
