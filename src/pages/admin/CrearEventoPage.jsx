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
  const [message, setMessage] = useState("")

  const { data, loading, error } = useFetch(
    shouldSend ? `${API_URL}/eventos` : null,
    'POST',
    shouldSend ? payload : null
  )

  useEffect(() => {
    if (data?.ok) navigate('/eventos')
  }, [data, navigate])

  useEffect(() => {
    if (error) {
      setMessage(error)
      setShouldSend(false)
      setPayload(null)
    }
  }, [error])

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
      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}
      <section className="container">
        <CrearEventoFormulario
          onSubmit={handleSubmit}
          loading={loading}
          clientes={clientes}
        />
      </section>
    </>
  )
}
