import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const PresupuestosPage = () => {

  const navigate = useNavigate()
  const { data, loading, setData } = useFetch(`${API_URL}/presupuestos`)

  const [mode, setMode] = useState("list")
  const [message, setMessage] = useState("")
  const [formValues, setFormValues] = useState(null)

  const [shouldCreate, setShouldCreate] = useState(false)
  const [newValues, setNewValues] = useState(null)

  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [updateValues, setUpdateValues] = useState(null)

  const [shouldDelete, setShouldDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const { data: createData, loading: createLoading } = useFetch(
    shouldCreate ? `${API_URL}/presupuestos` : null,
    "POST",
    shouldCreate ? newValues : null
  )

  const { data: updateData, loading: updateLoading } = useFetch(
    shouldUpdate ? `${API_URL}/presupuestos/${updateId}` : null,
    "PATCH",
    shouldUpdate ? updateValues : null
  )

  const { data: deleteData, loading: deleteLoading } = useFetch(
    shouldDelete ? `${API_URL}/presupuestos/${deleteId}` : null,
    "DELETE"
  )

  useEffect(() => {
    if (createData) {
      setData(prev => ({ ...prev, data: [...(prev?.data || []), createData.data] }))
      setShouldCreate(false)
      setNewValues(null)
      setMode("list")
      setMessage("Presupuesto creado correctamente")
    }
  }, [createData])

  useEffect(() => {
    if (updateData) {
      setData(prev => ({
        ...prev,
        data: prev.data.map(p => p.id === updateId ? updateData.data : p)
      }))
      setShouldUpdate(false)
      setUpdateValues(null)
      setUpdateId(null)
      setMode("list")
      setMessage("Presupuesto actualizado correctamente")
    }
  }, [updateData])

  useEffect(() => {
    if (deleteData) {
      setData(prev => ({
        ...prev,
        data: prev.data.filter(p => p.id !== deleteId)
      }))
      setShouldDelete(false)
      setDeleteId(null)
      setMessage("Presupuesto eliminado correctamente")
    }
  }, [deleteData])

  const handleCreate = (values) => {
    setNewValues(values)
    setShouldCreate(true)
  }

  const handleUpdate = (values) => {
    setUpdateValues(values)
    setShouldUpdate(true)
  }

const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este presupuesto?')) return
    setDeleteId(id)
    setShouldDelete(true)
}

  const openEdit = (presupuesto) => {
    navigate(`/presupuestos/editar/${presupuesto.id}`)
  }

  if (loading) return <div className="presupuestos__loading">Cargando presupuestos...</div>

  return (
    <div className="presupuestos">
      <header className="presupuestos__header">
        <h1>Presupuestos</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      {mode === "list" && (
        <>
          <div className="presupuestos__toolbar">
            <button className="presupuestos__btn" onClick={() => navigate("/presupuestos/crear")}>Crea nuevo presupuesto</button>
          </div>

          {data?.data?.length > 0 ? (
            <div className="presupuestos__list">
              {data.data.map(p => (
                <div className="presupuesto-card" key={p.id}>
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Total:</span>
                    <span className="presupuesto-card__value">{p.total}€</span>
                  </div>
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Estado:</span>
                    <span className={`presupuesto-card__value ${p.estadoPresupuesto ? "presupuesto-card__value--aprobado" : "presupuesto-card__value--pendiente"}`}>
                      {p.estadoPresupuesto ? "Aprobado" : "Pendiente"}
                    </span>
                  </div>
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Fecha:</span>
                    <span className="presupuesto-card__value">{new Date(p.fecha).toLocaleDateString()}</span>
                  </div>
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Servicios:</span>
                    <span className="presupuesto-card__value">
                      {["Catering", "Audiovisuales", "Otros"]
                        .filter(s => p[s.toLowerCase()])
                        .join(", ") || "Ninguno"}
                    </span>
                  </div>
                  <div className="presupuesto-card__actions">
                    <button className="presupuestos__btn presupuestos__btn--edit" onClick={() => openEdit(p)}>
                      Editar
                    </button>
                    <button
                      className="presupuestos__btn presupuestos__btn--delete"
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteLoading && deleteId === p.id}
                    >
                      {deleteLoading && deleteId === p.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="presupuestos__empty">
              <p>No hay presupuestos</p>
            </div>
          )}
        </>
      )}

      {(mode === "create" || mode === "edit") && (
        <PresupuestoForm
          initialValues={mode === "edit" ? formValues : null}
          onSubmit={mode === "create" ? handleCreate : handleUpdate}
          loading={mode === "create" ? createLoading : updateLoading}
          onCancel={() => { setMode("list"); setMessage("") }}
        />
      )}
    </div>
  )
}
