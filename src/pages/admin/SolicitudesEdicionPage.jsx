import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const SolicitudesEdicionPage = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const [estadoFiltro, setEstadoFiltro] = useState('Pendiente')
  const [accionError, setAccionError] = useState(null)
  const [accionMensaje, setAccionMensaje] = useState(null)
  const [accionEnCursoId, setAccionEnCursoId] = useState(null)

  const url = estadoFiltro
    ? `${API_URL}/solicitudes-edicion?estado=${estadoFiltro}`
    : `${API_URL}/solicitudes-edicion`

  const {
    data: solicitudesData,
    loading,
    error,
    setData,
  } = useFetch(url)

  const solicitudes = solicitudesData?.data || []

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  const handleCambiarEstado = async (solicitud, nuevoEstado) => {
    try {
      setAccionError(null)
      setAccionMensaje(null)
      setAccionEnCursoId(solicitud.id)

      const accion = nuevoEstado === 'Aprobada' ? 'aprobar' : 'rechazar'

      const response = await fetch(`${API_URL}/solicitudes-edicion/${solicitud.id}/${accion}`, {
        method: 'PATCH',
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'No se pudo actualizar la solicitud')
      }

      setData((prevData) => {
        if (!prevData?.data) return prevData

        const solicitudesActualizadas = prevData.data.map((solicitud) =>
          solicitud.id === result.data.id ? result.data : solicitud
        )

        return {
          ...prevData,
          data: solicitudesActualizadas,
        }
      })
      setAccionMensaje('Solicitud actualizada correctamente')
    } catch (err) {
      setAccionError(err.message)
    } finally {
      setAccionEnCursoId(null)
    }
  }

  return (
    <>
      <header className="titlePage">
      <h1>Solicitudes de edicion</h1>
      </header>
      <section className="container">
        <div>
        <label htmlFor="estadoFiltro">Estado</label>
        <select
          id="estadoFiltro"
          value={estadoFiltro}
          onChange={(ev) => setEstadoFiltro(ev.target.value)}
        >
          <option value="">Todas</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Aprobada">Aprobadas</option>
          <option value="Rechazada">Rechazadas</option>
        </select>
        </div>

      {loading && <p>Cargando solicitudes...</p>}
      {error && <p>{error}</p>}
      {accionError && <p>{accionError}</p>}
      {accionMensaje && <p>{accionMensaje}</p>}

      <div>
        {solicitudes.map((solicitud) => (
          <article key={solicitud.id}>
            <h2>Solicitud sobre: {solicitud.campo}</h2>
            <p>Evento: {solicitud.ponencia?.evento?.nombreEvento || 'Sin evento'}</p>
            <p>Ponente: {solicitud.ponencia?.ponente?.nombrePonente || 'Sin ponente'}</p>
            <p>Tipo ponencia: {solicitud.ponencia?.tipoPonencia || 'Sin tipo'}</p>
            <p>Campo solicitado: {solicitud.campo}</p>
            <p>Nuevo valor: {solicitud.valorSolicitado}</p>
            <p>Mensaje: {solicitud.mensaje || 'Sin mensaje'}</p>
            <p>Estado: {solicitud.estado}</p>
            <p>Fecha solicitud: {formatFecha(solicitud.fechaSolicitud)}</p>

            {solicitud.estado === 'Pendiente' && (
              <div>
                <button
                  onClick={() => handleCambiarEstado(solicitud, 'Aprobada')}
                  disabled={accionEnCursoId === solicitud.id}
                >
                  {accionEnCursoId === solicitud.id ? 'Procesando...' : 'Aprobar'}
                </button>

                <button
                  onClick={() => handleCambiarEstado(solicitud, 'Rechazada')}
                  disabled={accionEnCursoId === solicitud.id}
                >
                  Rechazar
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      </section>
    </>
  )
}
