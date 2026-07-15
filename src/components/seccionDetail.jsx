import React from 'react'
import { EventoDetail } from './EventoDetail'

export const seccionDetail = () => {
  return (
    <div>
      <p>Resumen general del evento</p>
      <p>Evento registrado, pero todavia sin lugar confirmado ni presupuesto cerrado.</p>
      <EventoDetail />
    </div>
  )
}
