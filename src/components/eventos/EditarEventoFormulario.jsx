import { useState } from 'react'

const ESTADOS = ['Planificado', 'Reservado', 'Confirmado', 'Finalizado', 'Cancelado']

export const EditarEventoFormulario = ({ initialData, onSubmit, clientes }) => {
  const [form, setForm] = useState({
    ...initialData,
    fechaInicio: initialData.fechaInicio ? initialData.fechaInicio.slice(0, 10) : '',
    fechaFin: initialData.fechaFin ? initialData.fechaFin.slice(0, 10) : '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { cliente, sala, presupuesto, ponencias, ...cleanData } = form
    onSubmit({
      ...cleanData,
      numeroPersonas: Number(cleanData.numeroPersonas),
      fechaInicio: cleanData.fechaInicio ? new Date(cleanData.fechaInicio).toISOString() : undefined,
      fechaFin: cleanData.fechaFin ? new Date(cleanData.fechaFin).toISOString() : undefined,
    })
  }

  return (
    <form className="form-cliente" onSubmit={handleSubmit}>
      <h2>Datos del Evento</h2>
      <div className="form-cliente__grid">
        <label className="form-cliente__field">
          <span>Nombre del Evento</span>
          <input className="input" name="nombreEvento" value={form.nombreEvento || ''} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Ciudad</span>
          <input className="input" name="ciudad" value={form.ciudad || ''} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Lugar Confirmado</span>
          <input className="input" name="lugarConfirmado" value={form.lugarConfirmado || ''} onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Tipo de Evento</span>
          <input className="input" name="tipoEvento" value={form.tipoEvento || ''} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Fecha Inicio</span>
          <input className="input" type="date" name="fechaInicio" value={form.fechaInicio || ''} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Fecha Fin</span>
          <input className="input" type="date" name="fechaFin" value={form.fechaFin || ''} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Número de Personas</span>
          <input className="input" type="number" name="numeroPersonas" value={form.numeroPersonas || ''} min="1" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Cliente</span>
          <select className="input" name="idCliente" value={form.idCliente || ''} onChange={handleChange} required>
            <option value="">Seleccionar cliente</option>
            {clientes?.map((c) => (<option key={c.id} value={c.id}>{c.cliente}</option>))}
          </select>
        </label>
        <label className="form-cliente__field">
          <span>Estado</span>
          <select className="input" name="estado" value={form.estado || ''} onChange={handleChange} required>
            <option value="">Seleccionar estado</option>
            {ESTADOS.map((e) => (<option key={e} value={e}>{e}</option>))}
          </select>
        </label>
        <label className="form-cliente__field">
          <span>Nota</span>
          <textarea className="input" name="nota" value={form.nota || ''} rows="3" onChange={handleChange} />
        </label>
      </div>
      <button className="btn btn--primary" type="submit">Actualizar</button>
    </form>
  )
}
