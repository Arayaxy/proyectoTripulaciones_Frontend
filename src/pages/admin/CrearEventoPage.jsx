import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import { CrearEventoFormulario } from '../../components/eventos/CrearEventoFormulario'

const API_URL = import.meta.env.VITE_API_URL

export const CrearEventoPage = () => {
  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])
  const [shouldSend, setShouldSend] = useState(false)
  const [payload, setPayload] = useState(null)

  const { data } = useFetch(
    shouldSend ? `${API_URL}/eventos` : null,
    'POST',
    shouldSend ? payload : null
  )

  useEffect(() => {
    if (data?.ok) navigate('/eventos')
  }, [data, navigate])

  useEffect(() => {
    fetch(`${API_URL}/clientes`, { credentials: 'include' })
      .then((r) => r.json())
      .then((res) => { if (res.ok) setClientes(res.data) })
  }, [])

  const handleSubmit = (formData) => {
    setPayload(formData)
    setShouldSend(true)
  }

  return (
    <>
      <header className="titlePage">
        <h1>Nuevo Evento</h1>
      </header>
      <section className="container">
        <CrearEventoFormulario
          onSubmit={handleSubmit}
          clientes={clientes}
        />
      </section>
    </>
  )
}
