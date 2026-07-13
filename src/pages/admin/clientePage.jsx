import React from 'react'
import { Cliente } from '../../components/Cliente'

export const ClientePage = () => {
  return (
    <>
    <header className='titlePage'>
      <h1>Clientes</h1>

      <button className="btn btn--outline" onClick={() => navigate('/clientes/nuevo')}>Añadir Cliente</button>
      <Cliente />

    </header>
    <Cliente/>
    </>
  )
}
