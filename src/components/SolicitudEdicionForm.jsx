import { useState } from "react"

export const SolicitudEdicionForm = ({ ponencia }) => {
  const [campo, setCampo] = useState('')
  const [valorSolicitado, setValorSolicitado] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const solicitud = {

      idPonencia: ponencia.id,
      idPonente: ponencia.idPonente,
      campo,
      valorSolicitado,
      mensaje,

    }

    console.log('Solicitud de edicion:', solicitud)
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

      <button type="submit">
        Enviar solicitud
      </button>
    </form>
  )
}
