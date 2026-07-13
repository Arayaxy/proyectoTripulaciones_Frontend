import React from 'react'
import { ClienteForm } from '../../components/ClienteForm'
import { FileUpload } from '../../components/FileUpload'

export const ClientePage = () => {
  return (
    <>
    <header className='titlePage'>
      <h1>Clientes</h1>
      <button className="btn btn--outline" onClick={() => navigate('/clientes/nuevo')}>Añadir Cliente</button>
    </header>
    <section className='container'>
    <ClienteForm/>
    <FileUpload/>
    </section>
    </>
  )
}
