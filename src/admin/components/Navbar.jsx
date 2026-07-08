import { NavLink } from "react-router"
import './Navbar.css'
export const Navbar = () => {
  return (
    <nav className="main-navbar">
      <NavLink to="/#" > Evento </NavLink>
      <NavLink to="/#" > Cliente </NavLink>
      <NavLink to="/#" > Ubicación </NavLink>
      <NavLink to="/#" > Ponente </NavLink>
    </nav>
  )
}
