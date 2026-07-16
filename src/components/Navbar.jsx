import { NavLink } from "react-router"
import './partials/_navbar.scss'

export const Navbar = ({ isOpen, onClose }) => {
  return (
    <nav className={`main-navbar ${isOpen ? 'main-navbar--open' : ''}`}>
      <ul>
        <li><NavLink to="/eventos" onClick={onClose}>Eventos</NavLink></li>
        <li><NavLink to="/clientes" onClick={onClose}>Clientes</NavLink></li>
        <li><NavLink to="/espacios" onClick={onClose}>Espacios</NavLink></li>
        <li><NavLink to="/ponentes" onClick={onClose}>Ponentes</NavLink></li>
        <li><NavLink to="/consultas" onClick={onClose}>Agente consultas internas</NavLink></li>
        <li><NavLink to="/concursos" onClick={onClose}>Concursos Públicos</NavLink></li>
        <li><NavLink to="/presupuestos" onClick={onClose}>Presupuestos</NavLink></li>
        <li><NavLink to="/admins" onClick={onClose}>Admins</NavLink></li>
      </ul>
    </nav>
  )
}
