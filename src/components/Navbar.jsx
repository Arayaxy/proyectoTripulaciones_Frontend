import { NavLink, useNavigate } from "react-router"
import '../styles/Navbar.scss'
import { useAuth } from "../contexts/AuthContext"

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
          <NavLink to="/#" > Eventos </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Clientes </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Espacios </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Ponentes </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Agente consultas internas </NavLink>
        </li>

        <li>
          <NavLink to="/#" > Concursos Públicos </NavLink>
        </li>

        <li>
          <NavLink onClick={handleLogout} > Cerrar sesion </NavLink>
        </li>

      </ul>
    </nav>
  )
}
