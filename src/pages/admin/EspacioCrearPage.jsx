import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { EspacioForm } from "../../components/EspacioForm"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioCrearPage = () => {
  const navigate = useNavigate()
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const [message, setMessage] = useState("")

  const { data, loading, error, setError } = useFetch(
    shouldSubmit ? `${API_URL}/espacios` : null,
    "POST",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (data) {
      setMessage("Espacio creado correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate("/espacios"), 1000)
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
    <>
      <header className="titlePage">
        <h1>Crear espacio</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        <EspacioForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate("/espacios")}
        />
      </section>
    </>
  )
}
