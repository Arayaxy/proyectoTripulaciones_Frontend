import { useState, useEffect } from 'react'
import './_clienteForm.scss';
import { useNavigate } from 'react-router'

const initialForm = { cliente: '', email: '', telefono: '', empresa: '', sector: '', ciudad: '' }

export const ClienteFormulario = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialForm)
  const [ficha, setFicha] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

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
          <input className="input" name="cliente" placeholder="Nombre" value={form.cliente} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Email</span>
          <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </label>
        <label className="form-cliente__field">
          <span>Teléfono</span>
          <input className="input" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Empresa</span>
          <input className="input" name="empresa" placeholder="Empresa" value={form.empresa} onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Sector</span>
          <input className="input" name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} />
        </label>
        <label className="form-cliente__field">
          <span>Ciudad</span>
          <input className="input" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />
        </label>
      </div>
      <button className="btn btn--primary" type="submit">Guardar</button>
    </form>
    <div className="btnVolver">
        <button className="btn btn--nobg" onClick={() => navigate('/clientes')}>&laquo; Volver a Clientes
        </button>
      </div>
  </>
  )
}
