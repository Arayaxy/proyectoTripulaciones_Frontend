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
    // const formData = new FormData()
    // Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    // if (ficha) formData.append('ficha', ficha)
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="cliente" placeholder="Nombre" onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      </label>
      <label>
        Teléfono
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      </label>
      <label>
        Empresa
        <input name="empresa" placeholder="Empresa" onChange={handleChange} />
      </label>
      <label>
        Sector
        <input name="sector" placeholder="Sector" onChange={handleChange} />
      </label>
      <label>
        Ciudad
        <input name="ciudad" placeholder="Ciudad" onChange={handleChange} />
      </label>

      <button className="btn btn--primary" type="submit">Guardar</button>
    </form>
  )
}
