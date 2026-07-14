import { useNavigate } from 'react-router'
import { ClienteFormulario } from '../../components/clientes/CrearClienteFormulario'
import { createCliente } from '../../services/clienteService'
import { FileUpload } from '../../components/FileUpload'

const AUTOCOMPLETE_URL = import.meta.env.VITE_AUTOCOMPLETE_URL;

export const CrearClientePage = () => {
  const navigate = useNavigate()
  const handleSubmit = async (data) => {
    console.log("data recibido en handleSubmit", data)
    const res = await createCliente(data)
    if (res.ok) navigate('/clientes')
  }
  return (
    <>
      <header className='titlePage'>
        <h1>Nuevo Cliente</h1>
      </header>
      <section className='container'>
        <ClienteFormulario onSubmit={handleSubmit} />
        <FileUpload uploadUrl={AUTOCOMPLETE_URL} onSuccess={(json) => console.log(json)} withCredentials={false} />
      </section>
    </>
  )
}
