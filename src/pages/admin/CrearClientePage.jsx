import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ClienteFormulario } from '../../components/clientes/CrearClienteFormulario'
import { createCliente } from '../../services/clienteService'
import { FileUpload } from '../../components/FileUpload'

const AUTOCOMPLETE_URL = import.meta.env.VITE_AUTOCOMPLETE_URL;

export const CrearClientePage = () => {
  const navigate = useNavigate()
  const [respuesta, setRespuesta] = useState(null)
  const [autocompleteData, setAutocompleteData] = useState(null)

  const handleAutocompleteSuccess = (json) => {
    if (json?.datos_detectados?.cliente) {
      setAutocompleteData(json.datos_detectados.cliente);
    }
  };

  const handleSubmit = async (data) => {
    const res = await createCliente(data)
    setRespuesta(res)
    if (res.ok) navigate('/clientes')
  }
  return (
    <>
      <header className='titlePage'>
        <h1>Nuevo Cliente</h1>
      </header>
      <section className='container'>
        <ClienteFormulario onSubmit={handleSubmit} initialData={autocompleteData} />
        <FileUpload uploadUrl={AUTOCOMPLETE_URL} onSuccess={handleAutocompleteSuccess} withCredentials={false} />
        {respuesta && <pre>{JSON.stringify(respuesta, null, 2)}</pre>}
      </section>
    </>
  )
}
