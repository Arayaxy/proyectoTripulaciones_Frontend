import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

const initialForm = {
  nombrePonente: "",
  email: "",
  telefono: "",
  empresa: "",
  cargo: "",
  sector: "",
  docuIdentificacion: "",
}

export const CrearPonenteForm = ({ onCreated, onCancel }) => {
  const [form, setForm] = useState(initialForm)
  const [creando, setCreando] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombrePonente.trim() || !form.email.trim()) return
    setCreando(true)
    setError("")
    try {
      const res = await fetch(`${API_URL}/ponentes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.mensaje || "Error al crear ponente")
      const creado = json.data || json
      onCreated(creado)
    } catch (err) {
      setError(err.message)
    } finally {
      setCreando(false)
    }
  }

  return (
    <div className="crear-ponente-form">
      <h3>Nuevo ponente</h3>
      <form onSubmit={handleSubmit}>
        <div className="crear-ponente-form__grid">
          <div className="crear-ponente-form__field">
            <label>Nombre *</label>
            <input className="input" name="nombrePonente" value={form.nombrePonente} onChange={handleChange} placeholder="Nombre del ponente" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Email *</label>
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Teléfono *</label>
            <input className="input" type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Empresa *</label>
            <input className="input" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Empresa" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Cargo *</label>
            <input className="input" name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Sector *</label>
            <input className="input" name="sector" value={form.sector} onChange={handleChange} placeholder="Sector" required />
          </div>
          <div className="crear-ponente-form__field">
            <label>Documento identificación *</label>
            <input className="input" name="docuIdentificacion" value={form.docuIdentificacion} onChange={handleChange} placeholder="DNI/NIE/Pasaporte" required />
          </div>
        </div>
        {error && <p className="crear-ponente-form__error">{error}</p>}
        <div className="crear-ponente-form__actions">
          <button className="btn btn--primary" type="submit" disabled={creando}>{creando ? "Creando..." : "Crear"}</button>
          <button className="btn btn--outline" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
