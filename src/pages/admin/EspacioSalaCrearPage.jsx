import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { EspacioSalaForm } from "../../components/EspacioSalaForm"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioSalaCrearPage = () => {
  const { id: espacioId } = useParams()
  const navigate = useNavigate()

  const { data: espacioData } = useFetch(
    espacioId ? `${API_URL}/espacios/${espacioId}` : null
  )
  const nombreEspacio = espacioData?.data?.nombreEspacio
  const haySalas = (espacioData?.data?.salas?.length || 0) > 0

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const [message, setMessage] = useState("")

  const { data, loading, error, setError } = useFetch(
    shouldSubmit ? `${API_URL}/salas` : null,
    "POST",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (data) {
      setMessage("Sala creada correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate(`/espacios/${espacioId}/salas`), 1000)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setMessage(`Error: ${error}`)
      setShouldSubmit(false)
      setError(null)
    }
  }, [error])

  const handleSubmit = (values) => {
    setFormValues({ ...values, idEspacio: espacioId })
    setShouldSubmit(true)
  }

  return (
    <>
      <header className="titlePage">
        <h1>Nueva sala{nombreEspacio ? ` en ${nombreEspacio}` : ""}</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        <EspacioSalaForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate(haySalas ? `/espacios/${espacioId}/salas` : `/espacios`)}
        />
      </section>
    </>
  )
}
