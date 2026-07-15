import { useNavigate } from 'react-router'
import { Eventos } from '../../components/eventos/eventos'

export const EventosPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <header className="titlePage">
        <h1>Eventos</h1>
        <button className="btn btn--anadir" onClick={() => navigate('/eventos/nuevo')}>
          Añadir Evento
        </button>
      </header>
      <section className="container">
        <Eventos />
      </section>
    </>
  )
}
