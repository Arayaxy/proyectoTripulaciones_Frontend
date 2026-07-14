import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const CrearPresupuestoPage = () => {
  const navigate = useNavigate()
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const [message, setMessage] = useState("")

  const { data, loading, error, setData, setError } = useFetch(
    shouldSubmit ? `${API_URL}/api/v1/presupuestos` : null,
    "POST",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (data) {
      setMessage("Presupuesto creado correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate("/presupuestos"), 1000)
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
    setFormValues(values)
    setShouldSubmit(true)
  }

  return (
    <div className="presupuestos">
      <header className="presupuestos__header">
        <h1>Crear Presupuesto</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <PresupuestoForm
        onSubmit={handleSubmit}
        loading={loading}
        onCancel={() => navigate("/presupuestos")}
      />
    </div>
  )
}
