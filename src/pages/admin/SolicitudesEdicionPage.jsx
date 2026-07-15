import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const SolicitudesEdicionPage = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const [estadoFiltro, setEstadoFiltro] = useState('Pendiente')

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
  const camposPonente = ['email', 'telefono', 'empresa', 'cargo', 'sector', 'docuIdentificacion']
  const camposPonencia = ['nombreHotel', 'localizacionHotel', 'notaTransporte', 'ponenteEstado', 'tipoPonencia']

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  const aplicarCambioSolicitado = async (solicitud) => {
    const body = {
      [solicitud.campo]: solicitud.valorSolicitado,
    }

    if (camposPonente.includes(solicitud.campo)) {
      return fetch(`${API_URL}/ponentes/${solicitud.ponencia.idPonente}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    }

    if (camposPonencia.includes(solicitud.campo)) {
      return fetch(`${API_URL}/ponencias/${solicitud.ponencia.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    }

    throw new Error('Campo no permitido para actualizar')
  }

  const handleCambiarEstado = async (solicitud, nuevoEstado) => {
    try {
      if (nuevoEstado === 'Aprobada') {
        const applyResponse = await aplicarCambioSolicitado(solicitud)
        const applyResult = await applyResponse.json()

        if (!applyResponse.ok) {
          throw new Error(applyResult.message || 'No se pudo aplicar el cambio solicitado')
        }
      }

      const response = await fetch(`${API_URL}/solicitudes-edicion/${solicitud.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
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
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <section>
      <h1>Solicitudes de edicion</h1>

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

      <div>
        {solicitudes.map((solicitud) => (
          <article key={solicitud.id}>
            <h2>Solicitud sobre: {solicitud.campo}</h2>
            <p>ID solicitud: {solicitud.id}</p>
            <p>ID ponencia: {solicitud.idPonencia}</p>
            <p>ID ponente: {solicitud.ponencia?.idPonente}</p>
            <p>Campo solicitado: {solicitud.campo}</p>
            <p>Nuevo valor: {solicitud.valorSolicitado}</p>
            <p>Mensaje: {solicitud.mensaje || 'Sin mensaje'}</p>
            <p>Estado: {solicitud.estado}</p>
            <p>Fecha solicitud: {formatFecha(solicitud.fechaSolicitud)}</p>

            {solicitud.estado === 'Pendiente' && (
              <div>
                <button onClick={() => handleCambiarEstado(solicitud, 'Aprobada')}>
                  Aprobar
                </button>

                <button onClick={() => handleCambiarEstado(solicitud, 'Rechazada')}>
                  Rechazar
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
