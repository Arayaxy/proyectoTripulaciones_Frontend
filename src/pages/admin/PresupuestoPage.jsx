import '../../components/partials/_presupuestos.scss'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const PresupuestosPage = () => {

  const navigate = useNavigate()
  const { data, loading, setData } = useFetch(`${API_URL}/eventos`)

  const presupuestos = data?.data?.filter(e => e.presupuesto).map(e => ({
    ...e.presupuesto,
    eventoNombre: e.nombreEvento,
    eventoId: e.id,
  })) || []

  const [searchTerm, setSearchTerm] = useState("")
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
      setData(prev => ({
        ...prev,
        data: [...(prev?.data || []), createData.data]
      }))
      setShouldCreate(false)
      setNewValues(null)
      setMode("list")
      setMessage("Presupuesto creado correctamente")
    }
  }, [createData, setData])

  useEffect(() => {
    if (updateData) {
      setData(prev => ({
        ...prev,
        data: prev.data.map(e =>
          e.id === updateId
            ? { ...e, presupuesto: updateData.data }
            : e
        )
      }))
      setShouldUpdate(false)
      setUpdateValues(null)
      setUpdateId(null)
      setMode("list")
      setMessage("Presupuesto actualizado correctamente")
    }
  }, [updateData, setData, updateId])

  useEffect(() => {
    if (deleteData) {
      setData(prev => ({
        ...prev,
        data: prev.data.map(e =>
          e.id === deleteId
            ? { ...e, presupuesto: null }
            : e
        )
      }))
      setShouldDelete(false)
      setDeleteId(null)
      setMessage("Presupuesto eliminado correctamente")
    }
  }, [deleteData, setData, deleteId])

  const filteredPresupuestos = presupuestos.filter(p => {
    const term = searchTerm.toLowerCase()
    if (!term) return true
    const servicios = ["Catering", "Audiovisuales", "Otros"]
    const matchNombre = p.eventoNombre?.toLowerCase().includes(term)
    const matchServicios = servicios.some(s => s.toLowerCase().includes(term))
    return matchNombre || matchServicios
  })

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

  if (loading) return <div className="presupuestos__loading">Cargando presupuestos...</div>

  return (
    <div>
      <header className='titlePage'>
        <h1>Presupuestos</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      {mode === "list" && (
        <>
          <div className="search-bar">
            <input
              className="search-bar__input"
              type="text"
              placeholder="Buscar por nombre de evento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredPresupuestos.length > 0 ? (
            <section className='container'>
              <div className="presupuestos__list">
                {filteredPresupuestos.map(p => (
                  <div className="presupuesto-card" key={p.id}>
                    <h2>{p.eventoNombre}</h2>
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
                      <button className="btn btn--outline sm" onClick={() => navigate(`/presupuestos/${p.id}`)}>
                        Ver detalle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="presupuestos__empty">
              <p>{searchTerm ? "No se encontraron presupuestos" : "No hay presupuestos"}</p>
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
