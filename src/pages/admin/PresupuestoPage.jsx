import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const PresupuestosPage = () => {
  const [searchParams] = useSearchParams()
  const eventoId = searchParams.get("eventoId")

  const { data: eventoData, loading: eventoLoading } = useFetch(
    eventoId ? `${API_URL}/api/v1/eventos/${eventoId}` : null
  )

  const presupuestoId = eventoData?.data?.idPresupuesto

  const { data: presupuestoData, loading: presupuestoLoading, setData: setPresupuestoData } = useFetch(
    presupuestoId ? `${API_URL}/api/v1/presupuestos/${presupuestoId}` : null
  )

  const [mode, setMode] = useState("view")
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [submitConfig, setSubmitConfig] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false)
  const [message, setMessage] = useState("")

  const { data: submitData, loading: submitLoading, error: submitError, setData: setSubmitData, setError: setSubmitError } = useFetch(
    shouldSubmit ? submitConfig?.url : null,
    submitConfig?.method,
    shouldSubmit ? submitConfig?.body : null
  )

  const { data: deleteData, loading: deleteLoading } = useFetch(
    shouldDelete ? `${API_URL}/api/v1/presupuestos/${presupuestoId}` : null,
    "DELETE"
  )

  useEffect(() => {
    if (submitData) {
      setMessage(presupuestoId ? "Presupuesto actualizado" : "Presupuesto creado")
      setPresupuestoData(submitData)
      setMode("view")
      setShouldSubmit(false)
      setSubmitData(null)
    }
  }, [submitData])

  useEffect(() => {
    if (submitError) {
      setMessage(`Error: ${submitError}`)
      setShouldSubmit(false)
      setSubmitError(null)
    }
  }, [submitError])

  useEffect(() => {
    if (deleteData) {
      setMessage("Presupuesto eliminado")
      setPresupuestoData(null)
      setMode("view")
      setShouldDelete(false)
    }
  }, [deleteData])

  const handleCreate = (values) => {
    setSubmitConfig({ url: `${API_URL}/api/v1/presupuestos`, method: "POST", body: values })
    setShouldSubmit(true)
  }

  const handleUpdate = (values) => {
    setSubmitConfig({ url: `${API_URL}/api/v1/presupuestos/${presupuestoId}`, method: "PATCH", body: values })
    setShouldSubmit(true)
  }

  const handleDelete = () => {
    setShouldDelete(true)
  }

  if (eventoLoading || presupuestoLoading) {
    return <div className="presupuestos__loading">Cargando...</div>
  }

  if (!eventoData?.ok) {
    return <div className="presupuestos__error">Evento no encontrado</div>
  }

  return (
    <div className="presupuestos">
      <header className="presupuestos__header">
        <h1>Presupuesto</h1>
        <p className="presupuestos__evento">Evento: {eventoData.data.nombreEvento}</p>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      {mode === "view" && !presupuestoData && (
        <div className="presupuestos__empty">
          <p>No hay presupuesto para este evento</p>
          <button className="presupuestos__btn" onClick={() => setMode("create")}>
            Crear Presupuesto
          </button>
        </div>
      )}

      {mode === "view" && presupuestoData?.data && (
        <div className="presupuestos__detail">
          <PresupuestoForm
            initialValues={presupuestoData.data}
            readOnly
          />
          <div className="presupuestos__actions">
            <button
              className="presupuestos__btn presupuestos__btn--edit"
              onClick={() => setMode("edit")}
            >
              Editar
            </button>
            <button
              className="presupuestos__btn presupuestos__btn--delete"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      )}

      {(mode === "create" || mode === "edit") && (
        <PresupuestoForm
          initialValues={mode === "edit" ? presupuestoData?.data : null}
          onSubmit={mode === "create" ? handleCreate : handleUpdate}
          loading={submitLoading}
          onCancel={() => setMode("view")}
        />
      )}
    </div>
  )
}
