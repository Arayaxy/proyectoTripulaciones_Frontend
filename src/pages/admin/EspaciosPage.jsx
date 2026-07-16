import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import "./_espacios.scss"

const API_URL = import.meta.env.VITE_API_URL

export const EspaciosPage = () => {
  const navigate = useNavigate()
  const { data, loading, setData } = useFetch(`${API_URL}/espacios`)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleGestionarSalas = (id) => navigate(`/espacios/${id}/salas`)
  const handleAnadirSala = (id) => navigate(`/espacios/${id}/salas/nuevo`)
  const handleEditarEspacio = (id) => navigate(`/espacios/editar/${id}`)

  const handleDelete = (id) => {
    const espacio = data?.data?.find((e) => e.id === id)
    const numSalas = espacio?.salas?.length || 0
    const msg = numSalas === 1
      ? "¿Estás seguro de eliminar este espacio y su sala?"
      : numSalas > 1
        ? `¿Estás seguro de eliminar este espacio y sus ${numSalas} salas?`
        : "¿Estás seguro de eliminar este espacio?"
    if (!window.confirm(msg)) return
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

      <div className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar por nombre del espacio o sala..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {data?.data?.length > 0 ? (
        <section className="container">
          <div className="presupuestos__list">
            {data.data
              .filter((espacio) => {
                const term = searchTerm.toLowerCase()
                return (
                  !term ||
                  espacio.nombreEspacio?.toLowerCase().includes(term) ||
                  espacio.salas?.some((s) => s.nombreSala?.toLowerCase().includes(term))
                )
              })
              .map((espacio) => (
              <div className="presupuesto-card" key={espacio.id}>
                <h2>{espacio.nombreEspacio}</h2>
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

                <hr />

                <h4>Salas ({espacio.salas?.length || 0})</h4>
                {espacio.salas?.map((s) => (
                  <div className="presupuesto-card__row" key={s.id}>
                    <span className="presupuesto-card__label">{s.nombreSala}:</span>
                    <span className="presupuesto-card__value">{s.tipoSala} - {s.capacidadMaxSala} pers.</span>
                  </div>
                ))}

                <div>
                  {espacio.salas?.length > 0 ? (
                    <button className="btn btn--anadir" onClick={() => handleGestionarSalas(espacio.id)}>
                      Gestionar salas
                    </button>
                  ) : (
                    <button className="btn btn--anadir" onClick={() => handleAnadirSala(espacio.id)}>
                      Añadir sala
                    </button>
                  )}
                </div>

                <hr />

                <div className="presupuesto-card__actions">
                  <button
                    className="btn btn--logout"
                    onClick={() => handleDelete(espacio.id)}
                    disabled={deleteLoading && deleteId === espacio.id}
                  >
                    {deleteLoading && deleteId === espacio.id ? "Eliminando..." : "Eliminar"}
                  </button>
                  <button className="btn btn--primary" onClick={() => handleEditarEspacio(espacio.id)}>
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
