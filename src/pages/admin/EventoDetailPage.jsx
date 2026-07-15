import React from 'react'
import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'
import { SeccionDetail } from '../../components/SeccionDetail'
import { useParams } from 'react-router'

export const EventoDetailPage = () => {
  const { id } = useParams()

  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
      </header>
      <section className='container'>
        <NavbarInterno />
        <EventoInfo eventId={id} />
        <SeccionDetail />

      </section>
    </>
  )
}
