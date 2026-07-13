import { useState } from 'react'

export const EditarClienteFormulario = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState(initialData)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="cliente" placeholder="Nombre" value={form.cliente} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Teléfono
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      </label>
      <label>
        Empresa
        <input name="empresa" placeholder="Empresa" value={form.empresa} onChange={handleChange} />
      </label>
      <label>
        Sector
        <input name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} />
      </label>
      <label>
        Ciudad
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />
      </label>

      <button className="btn btn--primary" type="submit">Actualizar</button>
    </form>
  )
}
