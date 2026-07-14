import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const EditarPresupuestoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const { data: presupuestoData, loading: presupuestoLoading } = useFetch(
    id ? `${API_URL}/presupuestos/${id}` : null
  )

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data: updateData, loading: updateLoading, error, setData: setUpdateData, setError } = useFetch(
    shouldSubmit ? `${API_URL}/presupuestos/${id}` : null,
    "PATCH",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (updateData) {
      setMessage("Presupuesto actualizado correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate("/presupuestos"), 1000)
    }
  }, [updateData])

  useEffect(() => {
    if (error) {
      setMessage(`Error: ${error}`)
      setShouldSubmit(false)
      setFormValues(null)
      setError(null)
    }
  }, [error])

  const handleSubmit = (values) => {
    setFormValues(values)
    setShouldSubmit(true)
  }

  if (presupuestoLoading) return <div className="presupuestos__loading">Cargando presupuesto...</div>
  if (!presupuestoData?.data) return <div className="presupuestos__error">Presupuesto no encontrado</div>

  return (
    <div className="presupuestos">
      <header className="presupuestos__header">
        <h1>Editar Presupuesto</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <PresupuestoForm
        initialValues={presupuestoData.data}
        onSubmit={handleSubmit}
        loading={updateLoading}
        onCancel={() => navigate("/presupuestos")}
      />
    </div>
  )
}
