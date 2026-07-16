import { useState } from "react"

export const SolicitudEdicionForm = ({ ponencia }) => {
  const API_URL = import.meta.env.VITE_API_URL

  const [campo, setCampo] = useState('')
  const [valorSolicitado, setValorSolicitado] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [enviada, setEnviada] = useState(false)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setEnviando(true)
    setError(null)
    setEnviada(false)

    const solicitud = {
      idPonencia: ponencia.id,
      campo,
      valorSolicitado,
      mensaje,
    }

    try {
      const response = await fetch(`${API_URL}/solicitudes-edicion`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solicitud),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'No se pudo enviar la solicitud')
      }

      setEnviada(true)
      setCampo('')
      setValorSolicitado('')
      setMensaje('')
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Solicitar Edicion</h3>

      <div>

        <label htmlFor="campo">Campo a corregir</label>
        <select id="campo" value={campo} onChange={(ev) => setCampo(ev.target.value)}
          required
        >
          <option value="">Selecciona un campo</option>
          <option value="email">Email</option>
          <option value="telefono">Telefono</option>
          <option value="empresa">Empresa</option>
          <option value="cargo">Cargo</option>
          <option value="nombreHotel">Hotel</option>
          <option value="localizacionHotel">Localizacion hotel</option>
          <option value="notaTransporte">Nota transporte</option>
        </select>
      </div>

      <div>

        <label htmlFor="valorSolicitado">Nueva correccion</label>

        <input
          id="valorSolicitado"
          type="text"
          value={valorSolicitado}
          onChange={(ev) => setValorSolicitado(ev.target.value)}
          required
        />

      </div>
      <div>
        <label htmlFor="mensaje">Mensaje</label>

        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(ev) => setMensaje(ev.target.value)}
          placeholder="Explica brevemente el motivo del cambio"
        />
      </div>

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar solicitud'}
      </button>

      {error && <p>{error}</p>}
      {enviada && <p>Solicitud enviada correctamente</p>}
    </form>
  )
}
