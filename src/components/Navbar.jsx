import { Link, NavLink, useNavigate } from "react-router"
import React, { useState } from 'react';
// import './partials/_navbar.scss'
import './_navbar.css'
import { useAuth } from "../contexts/AuthContext"

export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setMenuOpen(prev => !prev)
  }

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
          <NavLink to="/eventos" >
            Eventos
          </NavLink>
        </li>


        <li>
          <NavLink to="/clientes" >
            Clientes
          </NavLink>
        </li>

        <li>
          <NavLink to="/espacios" >
            Espacios
          </NavLink>
        </li>

        <li>
          <NavLink to="/ponentes" >
            Ponentes
          </NavLink>
        </li>

        <li>
          <NavLink to="/consultas" >
            Agente consultas internas
          </NavLink>
        </li>

        <li>
          <NavLink to="/concursos" >
            Concursos Públicos
          </NavLink>
        </li>

        <li>
          <NavLink onClick={handleLogout} >
            Cerrar sesion
          </NavLink>
        </li>

        <NavLink to="/detalle">
          Ir a detalle (prueba)
        </NavLink>

      </ul>
    </nav>
  )
}
