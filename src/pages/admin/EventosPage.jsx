import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eventos } from '../../components/eventos/eventos'

export const EventosPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <header className="titlePage">
        <h1>Eventos</h1>
        <button className="btn btn--anadir" onClick={() => navigate('/eventos/nuevo')}>
          Añadir Evento
        </button>
      </header>
      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar por nombre del evento, cliente o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="container">
        <Eventos searchTerm={searchTerm} />
      </section>
    </>
  )
}
