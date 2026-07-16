import { useFetch } from '../../hooks/useFetch';
import { ClientCard } from './ClientCard';
import { deleteCliente } from '../../services/clienteService'
import './_cliente.scss'

const API_URL = import.meta.env.VITE_API_URL;

export const cliente = ({ searchTerm = '' }) => {
  const { data, setData } = useFetch(`${API_URL}/clientes`, 'GET');
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return
    const res = await deleteCliente(id)
    if (res.ok) {
      setData({ ...data, data: data.data.filter(c => c.id !== id) })
    }
  }

  const filtered = data?.ok
    ? data.data.filter((c) => {
        const term = searchTerm.toLowerCase()
        return (
          c.cliente?.toLowerCase().includes(term) ||
          c.empresa?.toLowerCase().includes(term) ||
          c.sector?.toLowerCase().includes(term)
        )
      })
    : []

  return (
    <section className='gridClientes'>
      {filtered.map((cli) => (
        <ClientCard key={cli.id} cliente={cli} onDelete={handleDelete} />
      ))}
    </section>
  )
}
