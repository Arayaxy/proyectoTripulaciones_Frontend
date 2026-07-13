<<<<<<< HEAD
import React from 'react'
=======
>>>>>>> 24f4f91 (fix NavbarInterno imports)
import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { EventoDetail } from '../../components/EventoDetail'

export const EventoDetailPage = () => {
  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
      </header>
      <section className='container'>
        <NavbarInterno />
        <EventoInfo />
        <EventoDetail />
      </section>
    </>
  )
}
