import React from 'react'
import { EventoDetail } from './EventoDetail'
import { LugarDetail } from './LugarDetail'

export const SeccionDetail = (evento) => {

  return (
    <div className="info_tarjeta">
      <p>Resumen general del evento</p>
      <p>Evento registrado, pero todavia sin lugar confirmado ni presupuesto cerrado.</p>
      <LugarDetail />
    </div>
  )

}
