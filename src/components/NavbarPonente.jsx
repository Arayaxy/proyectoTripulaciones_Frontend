import { NavLink } from "react-router"
import './partials/_navbar.scss'

export const NavbarPonente = ({ isOpen, onClose }) => {

  return (

    <nav className={`main-navbar ${isOpen ? 'main-navbar--open' : ''}`}>
      <ul>

        <li><NavLink to="/ponentedata" onClick={onClose}>Mis Datos</NavLink></li>

      </ul>
    </nav>
  )
}
