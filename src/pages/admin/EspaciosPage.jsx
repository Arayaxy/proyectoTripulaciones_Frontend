import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"

const API_URL = import.meta.env.VITE_API_URL

export const EspaciosPage = () => {
  const navigate = useNavigate()
  const { data, loading, setData } = useFetch(`${API_URL}/espacios`)
  const [message, setMessage] = useState("")

  const [shouldDelete, setShouldDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const { data: deleteData, loading: deleteLoading } = useFetch(
    shouldDelete ? `${API_URL}/espacios/${deleteId}` : null,
    "DELETE"
  )

  useEffect(() => {
    if (deleteData) {
      setData((prev) => ({
        ...prev,
        data: prev.data.filter((e) => e.id !== deleteId),
      }))
      setShouldDelete(false)
      setDeleteId(null)
      setMessage("Espacio eliminado correctamente")
      setTimeout(() => setMessage(""), 3000)
    }
  }, [deleteData])

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este espacio?")) return
    setDeleteId(id)
    setShouldDelete(true)
  }

  if (loading) return <div className="presupuestos__loading">Cargando espacios...</div>

  return (
    <div>
      <header className="titlePage">
        <h1>Espacios</h1>
        <button className="btn btn--anadir" onClick={() => navigate("/espacios/nuevo")}>
          Nuevo espacio
        </button>
      </header>

      {message && (
        <div className="presupuestos__message presupuestos__message--success">
          {message}
        </div>
      )}

      {data?.data?.length > 0 ? (
        <section className="container">
          <div className="presupuestos__list">
            {data.data.map((espacio) => (
              <div className="presupuesto-card" key={espacio.id}>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Nombre:</span>
                  <span className="presupuesto-card__value">{espacio.nombreEspacio}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Ciudad:</span>
                  <span className="presupuesto-card__value">{espacio.ciudad}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Dirección:</span>
                  <span className="presupuesto-card__value">{espacio.direccion}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Aforo:</span>
                  <span className="presupuesto-card__value">{espacio.aforo} personas</span>
                </div>

                {espacio.nota && (
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Nota:</span>
                    <span className="presupuesto-card__value">{espacio.nota}</span>
                  </div>
                )}

                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Contacto:</span>
                  <span className="presupuesto-card__value">{espacio.nombreContacto}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Teléfono:</span>
                  <span className="presupuesto-card__value">{espacio.telefonoContacto}</span>
                </div>
                <div className="presupuesto-card__row">
                  <span className="presupuesto-card__label">Email:</span>
                  <span className="presupuesto-card__value">{espacio.emailContacto}</span>
                </div>

                {espacio.salas?.length > 0 && (
                  <div className="presupuesto-card__row">
                    <span className="presupuesto-card__label">Salas:</span>
                    <span className="presupuesto-card__value">
                      {espacio.salas.map((s) => `${s.nombreSala} (${s.capacidadMaxSala} pers.)`).join(", ")}
                    </span>
                  </div>
                )}

                <div className="presupuesto-card__actions">
                  <button
                    className="btn btn--logout"
                    onClick={() => handleDelete(espacio.id)}
                    disabled={deleteLoading && deleteId === espacio.id}
                  >
                    {deleteLoading && deleteId === espacio.id ? "Eliminando..." : "Eliminar"}
                  </button>
                  <button className="btn btn--primary" onClick={() => navigate(`/espacios/editar/${espacio.id}`)}>
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="presupuestos__empty">
          <p>No hay espacios</p>
        </div>
      )}
    </div>
  )
}
