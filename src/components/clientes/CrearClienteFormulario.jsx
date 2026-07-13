import { useState } from 'react'

const initialForm = { cliente: '', email: '', telefono: '', empresa: '', sector: '', ciudad: '' }

export const ClienteFormulario = ({ onSubmit }) => {
  const [form, setForm] = useState(initialForm)
  const [ficha, setFicha] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (ficha) formData.append('ficha', ficha)
    onSubmit(formData)
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

      <label>
        Ficha del cliente
        <input type="file" name="ficha" accept=".pdf" onChange={(e) => setFicha(e.target.files[0])} />
      </label>

      <button className="btn btn--primary" type="submit">Guardar</button>
    </form>
  )
}
