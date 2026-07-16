import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ClienteForm } from '../../components/ClienteForm'
import { FileUpload } from '../../components/FileUpload'
import {cliente as Cliente} from '../../components/clientes/cliente'

export const ClientePage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <header className='titlePage'>
        <h1>Clientes</h1>
        <button className="btn btn--outline" onClick={() => navigate('/clientes/nuevo')}>Añadir Cliente</button>
      </header>
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar por nombre del cliente, empresa o sector..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className='container'>
        <Cliente searchTerm={searchTerm} />
      </section>
    </>
  )
}
