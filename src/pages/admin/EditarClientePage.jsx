import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { EditarClienteFormulario } from '../../components/clientes/EditarClienteFormulario'
import { getCliente, updateCliente } from '../../services/clienteService'
import { FileUpload } from '../../components/FileUpload'

const AUTOCOMPLETE_URL = import.meta.env.VITE_AUTOCOMPLETE_URL;

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
      <FileUpload uploadUrl={AUTOCOMPLETE_URL} onSuccess={(json) => console.log(json)} withCredentials={false} />
    </div>
  )
}
