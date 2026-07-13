import { useNavigate } from 'react-router'
import { ClienteFormulario } from '../../components/clientes/CrearClienteFormulario'
import { createCliente } from '../../services/clienteService'

export const CrearClientePage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    console.log("data recibido en handleSubmit", data)
    const res = await createCliente(data)
    if (res.ok) navigate('/clientes')
  }

  return (
    <div>
      <h1>Nuevo Cliente</h1>
      <ClienteFormulario onSubmit={handleSubmit} />
    </div>
  )
}
