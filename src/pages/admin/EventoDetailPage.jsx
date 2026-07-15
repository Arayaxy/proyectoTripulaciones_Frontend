import { NavbarInterno } from '../../components/NavbarInterno'
import { EventoInfo } from '../../components/EventoInfo'

import { useParams } from 'react-router'
import { SeccionDetail } from '../../components/SeccionDetail'
import { useFetch } from '../../hooks/useFetch'

export const EventoDetailPage = () => {
  const { id } = useParams()

  const API_URL = import.meta.env.VITE_API_URL

  const { data, loading, error } = useFetch(
    evento ? `${API_URL}/eventos/${id}` : null,
    "GET"
  )

  if (loading) return <div className="event_info_cargando">Cargando...</div>
  if (error) return <div className="evento_info_error">Error: {error}</div>

  const evento = data?.data

  if (!evento) return null


  return (
    <>
      <header className='titlePage'>
        <h1>Eventos</h1>
      </header>
      <section className='container'>
        <NavbarInterno />
        <EventoInfo evento={evento} />
        <SeccionDetail />

      </section>
    </>
  )
}
