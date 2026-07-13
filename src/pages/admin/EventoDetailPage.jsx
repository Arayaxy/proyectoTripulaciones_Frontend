import React from 'react'
import { NavbarInterno } from '../../components/navbarInterno'
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
