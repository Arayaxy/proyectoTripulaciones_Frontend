import React from 'react'
import { Eventos } from '../../components/Eventos'

export const EventosPage = () => {
  return (
    <>
    <header className='titlePage'>
      <h1>Eventos</h1>
      <button className="btn btn--outline" onClick={() => navigate('/eventos/nuevo')}>Nuevo Evento</button>
    </header>
    <section className='container'>
        <Eventos />
    </section>
    </>
  )
}
