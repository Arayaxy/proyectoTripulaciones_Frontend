import { useFetch } from '../../hooks/useFetch'
import { EventoCard } from './EventoCard'
import './_eventos.scss'

const API_URL = import.meta.env.VITE_API_URL

export const Eventos = ({ searchTerm = '' }) => {
  const { data, setData } = useFetch(`${API_URL}/eventos`, 'GET')

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este evento?')) return
    const res = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const json = await res.json()
    if (json.ok) {
      setData({ ...data, data: data.data.filter((e) => e.id !== id) })
    }
  }

  const filtered = data?.ok
    ? data.data.filter((e) => {
        const term = searchTerm.toLowerCase()
        return (
          e.nombreEvento?.toLowerCase().includes(term) ||
          e.cliente?.cliente?.toLowerCase().includes(term) ||
          e.cliente?.empresa?.toLowerCase().includes(term)
        )
      })
    : []

  return (
    <section className="gridClientes">
      {filtered.map((evento) => (
        <EventoCard key={evento.id} evento={evento} onDelete={handleDelete} />
      ))}
    </section>
  )
}
