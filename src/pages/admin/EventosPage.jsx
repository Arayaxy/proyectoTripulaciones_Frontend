import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router';

export const EventosPage = () => {
  const { logOut, user, loading, error } = useAuth();

  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
        <button className="btn btn--outline" onClick={() => Navigate('/eventos/nuevo')}>Nuevo Evento</button>
      </header>
      <section className='container'>
        <p>Hola, {user?.name}</p>
      </section>
      </>
  )
}
