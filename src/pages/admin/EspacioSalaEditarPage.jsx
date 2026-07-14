import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { EspacioSalaForm } from "../../components/EspacioSalaForm"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioSalaEditarPage = () => {
  const { id: espacioId, salaId } = useParams()
  const navigate = useNavigate()

  const { data: espacioData } = useFetch(
    espacioId ? `${API_URL}/espacios/${espacioId}` : null
  )
  const nombreEspacio = espacioData?.data?.nombreEspacio

  const [message, setMessage] = useState("")

  const { data: salaData, loading: salaLoading } = useFetch(
    salaId ? `${API_URL}/salas/${salaId}` : null
  )

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data: updateData, loading: updateLoading, error, setError } = useFetch(
    shouldSubmit ? `${API_URL}/salas/${salaId}` : null,
    "PATCH",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (updateData) {
      setMessage("Sala actualizada correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate(`/espacios/${espacioId}/salas`), 1000)
    }
  }, [updateData])

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

  if (salaLoading) return <div className="presupuestos__loading">Cargando sala...</div>
  if (!salaData?.data) return <div className="presupuestos__error">Sala no encontrada</div>

  return (
    <>
      <header className="titlePage">
        <h1>Editar sala{nombreEspacio ? ` en ${nombreEspacio}` : ""}</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        <EspacioSalaForm
          initialValues={salaData.data}
          onSubmit={handleSubmit}
          loading={updateLoading}
          onCancel={() => navigate(`/espacios/${espacioId}/salas`)}
        />
      </section>
    </>
  )
}
