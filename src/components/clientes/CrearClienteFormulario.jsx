import { useState } from 'react'
import './_clienteForm.scss';

const initialForm = { cliente: '', email: '', telefono: '', empresa: '', sector: '', ciudad: '' }

export const ClienteFormulario = ({ onSubmit }) => {
  const [form, setForm] = useState(initialForm)
  const [ficha, setFicha] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <>

    <form className="form-cliente" onSubmit={handleSubmit} noValidate>
      <h2>Datos del Cliente</h2>
      <div className="form-cliente__grid">
        <label className="form-cliente__field">
          <span>Nombre</span>
          <input className="input" name="cliente" placeholder="Nombre" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Email</span>
          <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Teléfono</span>
          <input className="input" name="telefono" placeholder="Teléfono" onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Empresa</span>
          <input className="input" name="empresa" placeholder="Empresa" onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Sector</span>
          <input className="input" name="sector" placeholder="Sector" onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Ciudad</span>
          <input className="input" name="ciudad" placeholder="Ciudad" onChange={handleChange} />
        </label>
      </div>
      <button className="btn btn--primary" type="submit">Guardar</button>
    </form>
  </>
  )
}
