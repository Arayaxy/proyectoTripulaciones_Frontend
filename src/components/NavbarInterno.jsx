import { NavLink } from "react-router"

export const NavbarInterno = () => {
  return (
    <nav className="main-navbar">
      <ul>

        <li>
          <NavLink to="/datos" > Datos </NavLink>
        </li>

        <li>
          <NavLink to="/ponencias" > Ponencias </NavLink>
        </li>

        <li>
          <NavLink to="/lugar" > Lugar </NavLink>
        </li>

        <li>
          <NavLink to="/servicios" > Servicios </NavLink>
        </li>

        <li>
          <NavLink to="/presupuestos" > Presupuestos </NavLink>
        </li>

      </ul>
    </nav>
  )
}
