import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioSalasPage = () => {
  const { id: espacioId } = useParams()
  const navigate = useNavigate()

  const { data: espacioData, loading: espacioLoading } = useFetch(
    espacioId ? `${API_URL}/espacios/${espacioId}` : null
  )

  const [salas, setSalas] = useState([])
  const [message, setMessage] = useState("")

  const [shouldDelete, setShouldDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const { data: deleteData, loading: deleteLoading } = useFetch(
    shouldDelete ? `${API_URL}/salas/${deleteId}` : null,
    "DELETE"
  )

  useEffect(() => {
    if (espacioData?.data) {
      setSalas(espacioData.data.salas || [])
    }
  }, [espacioData])

  useEffect(() => {
    if (deleteData) {
      setSalas((prev) => prev.filter((s) => s.id !== deleteId))
      setShouldDelete(false)
      setDeleteId(null)
      setMessage("Sala eliminada correctamente")
      setTimeout(() => setMessage(""), 3000)
    }
  }, [deleteData])

  const handleDelete = (salaId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta sala?")) return
    setDeleteId(salaId)
    setShouldDelete(true)
  }

  if (espacioLoading) return <div className="presupuestos__loading">Cargando salas...</div>
  if (!espacioData?.data) return <div className="presupuestos__error">Espacio no encontrado</div>

  const nombreEspacio = espacioData.data.nombreEspacio

  return (
    <div>
      <header className="titlePage">
        <div>
          <h1>Salas de {nombreEspacio}</h1>
        </div>
        <div>
          <button className="btn btn--anadir" onClick={() => navigate(`/espacios/${espacioId}/salas/nuevo`)}>
            Añadir sala
          </button>
          <button className="btn btn--primary" onClick={() => navigate(`/espacios`)}>
            Volver a espacios
          </button>
        </div>
      </header>

      {message && (
        <div className="presupuestos__message presupuestos__message--success">
          {message}
        </div>
      )}

      {salas.length > 0 ? (
        <section className="container">
          <div className="presupuestos__list">
            {salas.map((sala) => (
              <div className="presupuesto-card" key={sala.id}>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Nombre:</span>
                  <span className="presupuesto-card__value">{sala.nombreSala}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Tipo:</span>
                  <span className="presupuesto-card__value">{sala.tipoSala}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Capacidad:</span>
                  <span className="presupuesto-card__value">{sala.capacidadMaxSala} personas</span>
                </div>
                {sala.notaSala && (
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Nota:</span>
                    <span className="presupuesto-card__value">{sala.notaSala}</span>
                  </div>
                )}
                <div className="presupuesto-card__actions">
                  <button
                    className="btn btn--logout"
                    onClick={() => handleDelete(sala.id)}
                    disabled={deleteLoading && deleteId === sala.id}
                  >
                    {deleteLoading && deleteId === sala.id ? "Eliminando..." : "Eliminar"}
                  </button>
                  <button className="btn btn--primary" onClick={() => navigate(`/espacios/${espacioId}/salas/editar/${sala.id}`)}>
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="presupuestos__empty">
          <p>No hay salas en este espacio</p>
        </div>
      )}
    </div>
  )
}
