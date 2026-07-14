import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { EspacioForm } from "../../components/EspacioForm"
import { SalaForm } from "../../components/SalaForm"

const API_URL = import.meta.env.VITE_API_URL

export const EspacioEditarPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const { data: espacioData, loading: espacioLoading } = useFetch(
    id ? `${API_URL}/espacios/${id}` : null
  )

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data: updateData, loading: updateLoading, error, setData: setUpdateData, setError } = useFetch(
    shouldSubmit ? `${API_URL}/espacios/${id}` : null,
    "PATCH",
    shouldSubmit ? formValues : null
  )

  const [salas, setSalas] = useState([])
  const [mostrarSalaForm, setMostrarSalaForm] = useState(false)
  const [salaEditando, setSalaEditando] = useState(null)

  const [salaRequest, setSalaRequest] = useState(null)
  const { data: salaData, loading: salaLoading } = useFetch(
    salaRequest?.url,
    salaRequest?.method,
    salaRequest?.body
  )

  const [deleteSalaId, setDeleteSalaId] = useState(null)

  const { data: deleteSalaData, loading: deleteSalaLoading } = useFetch(
    deleteSalaId ? `${API_URL}/salas/${deleteSalaId}` : null,
    "DELETE"
  )

  useEffect(() => {
    if (espacioData?.data) {
      setSalas(espacioData.data.salas || [])
    }
  }, [espacioData])

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

  useEffect(() => {
    if (salaData) {
      setSalas((prev) => {
        if (salaEditando) {
          return prev.map((s) => (s.id === salaEditando.id ? salaData.data : s))
        }
        return [...prev, salaData.data]
      })
      setMostrarSalaForm(false)
      setSalaEditando(null)
      setSalaRequest(null)
    }
  }, [salaData])

  useEffect(() => {
    if (deleteSalaData) {
      setSalas((prev) => prev.filter((s) => s.id !== deleteSalaId))
      setDeleteSalaId(null)
    }
  }, [deleteSalaData])

  const handleSubmit = (values) => {
    setFormValues(values)
    setShouldSubmit(true)
  }

  const handleCrearSala = (values) => {
    const payload = { ...values, idEspacio: id }
    setSalaRequest({
      url: `${API_URL}/salas`,
      method: "POST",
      body: payload,
    })
  }

  const handleEditarSala = (sala) => {
    setSalaEditando(sala)
    setMostrarSalaForm(true)
  }

  const handleActualizarSala = (values) => {
    const payload = { ...values, idEspacio: id }
    setSalaRequest({
      url: `${API_URL}/salas/${salaEditando.id}`,
      method: "PATCH",
      body: payload,
    })
  }

  const handleEliminarSala = (salaId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta sala?")) return
    setDeleteSalaId(salaId)
  }

  const handleCancelarSalaForm = () => {
    setMostrarSalaForm(false)
    setSalaEditando(null)
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

      <section className="container">
        <h2>Salas de {espacioData.data.nombreEspacio}</h2>

        {salas.length > 0 ? (
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
                    onClick={() => handleEliminarSala(sala.id)}
                    disabled={deleteSalaLoading}
                  >
                    {deleteSalaLoading ? "Eliminando..." : "Eliminar"}
                  </button>
                  <button className="btn btn--primary" onClick={() => handleEditarSala(sala)}>
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="presupuestos__empty">
            <p>No hay salas en este espacio</p>
          </div>
        )}

        {mostrarSalaForm ? (
          <SalaForm
            initialValues={salaEditando}
            onSubmit={salaEditando ? handleActualizarSala : handleCrearSala}
            loading={salaLoading}
            onCancel={handleCancelarSalaForm}
          />
        ) : (
          <button className="btn btn--anadir" onClick={() => setMostrarSalaForm(true)}>
            Añadir sala
          </button>
        )}
      </section>
    </>
  )
}
