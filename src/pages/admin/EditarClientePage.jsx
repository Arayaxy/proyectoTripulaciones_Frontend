import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { EditarClienteFormulario } from '../../components/clientes/EditarClienteFormulario'
import { getCliente, updateCliente } from '../../services/clienteService'

export const EditarClientePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)

  useEffect(() => {
    getCliente(id).then(res => {
      if (res.ok) setCliente(res.data)
    })
  }, [id])

  const handleSubmit = async (data) => {
    const { id: _, eventos, ...cleanData } = data;
    const res = await updateCliente(id, cleanData)
    if (res.ok) navigate('/clientes')
  }

  if (!cliente) return <div>Cargando...</div>

  return (
    <div>
      <h1>Editar Cliente</h1>
      <EditarClienteFormulario initialData={cliente} onSubmit={handleSubmit} />
    </div>
  )
}
