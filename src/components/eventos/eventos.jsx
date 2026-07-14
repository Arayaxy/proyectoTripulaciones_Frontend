import { useFetch } from '../../hooks/useFetch'
import { EventoCard } from './EventoCard'

const API_URL = import.meta.env.VITE_API_URL

export const Eventos = () => {
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

  return (
    <section className="gridClientes">
      {data?.ok &&
        data.data.map((evento) => (
          <EventoCard key={evento.id} evento={evento} onDelete={handleDelete} />
        ))}
    </section>
  )
}
