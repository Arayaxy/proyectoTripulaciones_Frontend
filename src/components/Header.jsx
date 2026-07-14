import React from 'react'
import './partials/_header.scss'
import heroLogo from '../assets/logo_2026_Backstage.svg'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'


export const Header = () => {
  const { logOut, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false)

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <section className='headerContainer'>
        <div>
          <a href="/">
           <img src={heroLogo} alt="MITÜMI Backstage" /> </a>
        </div>
        <div className='botonyMenu'>
          <button className='btn btn--logout' onClick={handleLogOut}>Logout</button>
          <button className='header__hamburger' onClick={() => setIsOpen(prev => !prev)} aria-label="Abrir menú">
            ☰
          </button>
          <Navbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </section>
    </>
  )
}
