import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { NavbarPonente } from './NavbarPonente'
import heroLogo from '../assets/logo_2026_Backstage.svg'
import './partials/_header.scss'

export const HeaderPonente = () => {
  const { logOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <section className='headerContainer'>
      <div>
        <Link to="/ponencia">
          <img src={heroLogo} alt="MITÜMI Backstage" />
        </Link>
      </div>
      <div className='botonyMenu'>
        <button className='btn btn--logout' onClick={handleLogOut}>Logout</button>
        <button className='header__hamburger' onClick={() => setIsOpen(prev => !prev)} aria-label="Abrir menú">
          ☰
        </button>
        <NavbarPonente isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </section>
  )
}
