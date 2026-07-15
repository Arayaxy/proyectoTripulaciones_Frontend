import { useState } from 'react'

const initialForm = {
  nombreEvento: '',
  ciudad: '',
  lugarConfirmado: '',
  fechaInicio: '',
  fechaFin: '',
  numeroPersonas: '',
  tipoEvento: '',
  nota: '',
  idCliente: '',
  idEstado: '',
}

export const CrearEventoFormulario = ({ onSubmit, clientes, estados }) => {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      numeroPersonas: Number(form.numeroPersonas),
      fechaInicio: form.fechaInicio ? new Date(form.fechaInicio).toISOString() : undefined,
      fechaFin: form.fechaFin ? new Date(form.fechaFin).toISOString() : undefined,
    })
  }

  return (
    <form className="form-cliente" onSubmit={handleSubmit} noValidate>
      <h2>Datos del Evento</h2>
      <div className="form-cliente__grid">
        <label className="form-cliente__field">
          <span>Nombre del Evento</span>
          <input className="input" name="nombreEvento" placeholder="Nombre del evento" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Ciudad</span>
          <input className="input" name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Lugar Confirmado</span>
          <input className="input" name="lugarConfirmado" placeholder="Lugar" onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Tipo de Evento</span>
          <input className="input" name="tipoEvento" placeholder="Tipo de evento" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Fecha Inicio</span>
          <input className="input" type="date" name="fechaInicio" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Fecha Fin</span>
          <input className="input" type="date" name="fechaFin" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Número de Personas</span>
          <input className="input" type="number" name="numeroPersonas" placeholder="0" min="1" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Cliente</span>
          <select className="input" name="idCliente" onChange={handleChange} required>
            <option value="">Seleccionar cliente</option>
            {clientes?.map((c) => (<option key={c.id} value={c.id}>{c.cliente}</option>))}
          </select>
        </label>
        <label className="form-cliente__field">
          <span>Estado</span>
          <select className="input" name="idEstado" onChange={handleChange} required>
            <option value="">Seleccionar estado</option>
            {estados?.map((e) => (<option key={e.id} value={e.id}>{e.descripcion}</option>))}
          </select>
        </label>
        <label className="form-cliente__field">
          <span>Nota</span>
          <textarea className="input" name="nota" placeholder="Nota opcional" rows="3" onChange={handleChange} />
        </label>
      </div>
      <button className="btn btn--primary" type="submit">Guardar</button>
    </form>
  )
}
