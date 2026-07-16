import { useFetch } from '../../hooks/useFetch'
import { PonenteCard } from '../../components/ponentes/PonenteCard'

const API_URL = import.meta.env.VITE_API_URL

export const PonentesPage = () => {
  const { data, setData } = useFetch(`${API_URL}/ponentes`, 'GET')

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este ponente?')) return
    const res = await fetch(`${API_URL}/ponentes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const json = await res.json()
    if (json.ok) {
      setData({ ...data, data: data.data.filter((p) => p.id !== id) })
    }
  }

  return (
    <>
      <header className="titlePage">
        <h1>Ponentes</h1>
      </header>
      <section className="container">
        <section className="gridClientes">
          {data?.ok && data.data.map((ponente) => (
            <PonenteCard key={ponente.id} ponente={ponente} onDelete={handleDelete} />
          ))}
        </section>
      </section>
    </>
  )
}