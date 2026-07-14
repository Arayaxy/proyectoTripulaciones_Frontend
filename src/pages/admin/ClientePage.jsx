import React from 'react'
import { useNavigate } from 'react-router'
import { ClienteForm } from '../../components/ClienteForm'
import { FileUpload } from '../../components/FileUpload'
import {cliente as Cliente} from '../../components/clientes/cliente'

export const ClientePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <header className='titlePage'>
        <h1>Clientes</h1>
        <button className="btn btn--outline" onClick={() => navigate('/clientes/nuevo')}>Añadir Cliente</button>
      </header>
      <section className='container'>
        <Cliente />
      </section>
    </>
  )
}
