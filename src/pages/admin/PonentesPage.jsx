import { useState } from "react"
import { FichaPonenciaDetalle } from "../../components/FichaPonenciaDetalle"
import { useFetch } from "../../hooks/useFetch"
import { useAuth } from "../../contexts/AuthContext"

export const PonentesPage = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const { user } = useAuth()
  const [eventoSeleccionado, setEventoSeleccionado] = useState('')
  const [ponenciaSeleccionada, setPonenciaSeleccionada] = useState('')
  const [ponenciaBuscada, setPonenciaBuscada] = useState(null)

  const {
    data: eventosData,
    loading: eventosLoading,
    error: eventosError,
  } = useFetch(`${API_URL}/eventos`)

  const eventos = eventosData?.data || []
  const ponenciasUrl = eventoSeleccionado
    ? `${API_URL}/ponencias?idEvento=${eventoSeleccionado}`
    : null

  const {
    data: ponenciasData,
    loading: ponenciasLoading,
    error: ponenciasError,
  } = useFetch(ponenciasUrl)

  const ponencias = ponenciasData?.data || []

  const handleBuscarPonencia = () => {
    const ponenciaEncontrada = ponencias.find(
      (ponencia) => ponencia.id === ponenciaSeleccionada
    )

    setPonenciaBuscada(ponenciaEncontrada)
  }

  return (
    <>
      <section>
        <div>
          <label htmlFor='evento'>Evento</label>
          <select
            id='evento'
            value={eventoSeleccionado}
            onChange={(ev) => {
              setEventoSeleccionado(ev.target.value)
              setPonenciaSeleccionada('')
              setPonenciaBuscada(null)
            }}
          >
            <option value=''>Selecciona un evento</option>

            {eventos.map((evento) => (
              <option key={evento.id} value={evento.id}>
                {evento.nombreEvento}
              </option>
            ))}
          </select>

          {eventosLoading && <p>Cargando eventos...</p>}
          {eventosError && <p>{eventosError}</p>}
        </div>

        <div>
          <label htmlFor='ponencia'>Ponente</label>
          <select
            id='ponencia'
            value={ponenciaSeleccionada}
            onChange={(ev) => setPonenciaSeleccionada(ev.target.value)}
            disabled={!eventoSeleccionado}
          >
            <option value=''>Selecciona un ponente</option>

            {ponencias.map((ponencia) => (
              <option key={ponencia.id} value={ponencia.id}>
                {ponencia.ponente?.nombrePonente} - {ponencia.tipoPonencia}
              </option>
            ))}
          </select>

          {ponenciasLoading && <p>Cargando ponentes...</p>}
          {ponenciasError && <p>{ponenciasError}</p>}
        </div>

        <button
          onClick={handleBuscarPonencia}
          disabled={!eventoSeleccionado || !ponenciaSeleccionada}
        >
          Buscar
        </button>

        <div>
          <FichaPonenciaDetalle
            ponencia={ponenciaBuscada}
            isAdmin={user?.role === 'admin'}
            userRole={user?.role}
            onPonenciaActualizada={setPonenciaBuscada}
          />
        </div>
      </section>
    </>
  )
}
