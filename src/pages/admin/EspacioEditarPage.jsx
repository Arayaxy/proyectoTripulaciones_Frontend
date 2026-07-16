import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { EspacioForm } from "../../components/EspacioForm"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioEditarPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const { data: espacioData, loading: espacioLoading } = useFetch(
    id ? `${API_URL}/espacios/${id}?salas=false` : null
  )

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data: updateData, loading: updateLoading, error, setError } = useFetch(
    shouldSubmit ? `${API_URL}/espacios/${id}` : null,
    "PATCH",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (updateData) {
      setMessage("Espacio actualizado correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate("/espacios"), 1000)
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
    setFormValues(values)
    setShouldSubmit(true)
  }

  if (espacioLoading) return <div className="presupuestos__loading">Cargando espacio...</div>
  if (!espacioData?.data) return <div className="presupuestos__error">Espacio no encontrado</div>

  return (
    <>
      <header className="titlePage">
        <h1>Editar espacio</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        <EspacioForm
          initialValues={espacioData.data}
          onSubmit={handleSubmit}
          loading={updateLoading}
          onCancel={() => navigate("/espacios")}
        />
      </section>

    </>
  )
}
