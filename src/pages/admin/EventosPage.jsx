import { useFetch } from "../../hooks/useFetch"
import { EventoCard } from "../../components/EventoCard"
import { Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const API_URL = import.meta.env.VITE_API_URL

export const EventosPage = () => {
  const { logOut, user, loading, error } = useAuth();

  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
        <button className="btn btn--outline" onClick={() => Navigate('/eventos/nuevo')}>Nuevo Evento</button>
      </header>
      <section className='container'>
        <p>Hola, {user?.name}</p>
      </section>
      </>
  )
}
