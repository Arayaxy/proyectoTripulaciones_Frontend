import { Link } from "react-router"

export const NavbarInterno = () => {
  return (
    <nav className="main-navbar">
      <ul>

        <li>
          <Link to="/datos" >
            Datos
          </Link>
        </li>

        <li>
          <Link to="/ponencias" >
            Ponencias
          </Link>
        </li>

        <li>
          <Link to="/lugar" >
            Lugar
          </Link>
        </li>

        {/* <li>
          <Link to="/servicios" >
            Servicios
          </Link>
        </li> */}

        <li>
          <Link to="/presupuestos" >
            Presupuestos
          </Link>
        </li>

      </ul>
    </nav>
  )
}
