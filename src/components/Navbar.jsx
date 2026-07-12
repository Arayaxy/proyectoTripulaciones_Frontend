import { Link, useNavigate } from "react-router"
import React, { useState } from 'react';
import './partials/_navbar.scss'
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
          <Link to="/eventos" >
            Eventos
          </Link>
        </li>

        <li>
          <Link to="/clientes" >
            Clientes
          </Link>
        </li>

        <li>
          <Link to="/espacios" >
            Espacios
          </Link>
        </li>

        <li>
          <Link to="/ponentes" >
            Ponentes
          </Link>
        </li>

        <li>
          <Link to="/consultas" >
            Agente consultas internas
          </Link>
        </li>

        <li>
          <Link to="/concursos" >
            Concursos Públicos
          </Link>
        </li>

        <li>
          <Link onClick={handleLogout} >
            Cerrar sesion
          </Link>
        </li>

      </ul>
    </nav>
  )
}
