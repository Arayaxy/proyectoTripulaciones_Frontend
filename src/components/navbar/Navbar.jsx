import { NavLink, useNavigate } from "react-router"
import './Navbar.css'
import { useAuth } from "../../contexts/AuthContext"

export const Navbar = () => {

  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logOut();
    navigate("/");
  }

  return (
    <nav className="main-navbar">
      <ul>

        <li>
          <NavLink to="/#" > Evento </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Cliente </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Espacios </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Consultas </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Concursos Publicos </NavLink>
        </li>

        <li>
          <NavLink onClick={handleLogout} > Cerrar sesion </NavLink>
        </li>

      </ul>
    </nav>
  )
}
