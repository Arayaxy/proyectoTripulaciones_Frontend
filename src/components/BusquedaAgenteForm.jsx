import { useState } from "react"
import './partials/_busquedaAgenteForm.scss'

const initialForm = {
  nombre_ponente: "",
  email_ponente: "",
  nombre_evento: "",
  ciudad_evento: "",
  fecha_inicio: "",
  fecha_fin: "",
  ciudad_origen: "",
  personas: "1",
  preferencias: "",
  necesita_hotel: false,
  necesita_viaje: false,
  necesita_taxi: false,
  necesita_coche: false,
}

export const BusquedaAgenteForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = (vals) => {
    const errs = {}
    if (vals.necesita_viaje && !vals.ciudad_origen.trim()) {
      errs.ciudad_origen = "Para buscar viaje hace falta la ciudad de origen"
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  return (
    <form className="busqueda-agente-form" onSubmit={handleSubmit} noValidate>
      <div className="busqueda-agente-form__grid">
        <label className="busqueda-agente-form__field">
          <span>Nombre del ponente</span>
          <input className="input" name="nombre_ponente" value={form.nombre_ponente} onChange={handleChange} placeholder="Introducir información" />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Email del ponente</span>
          <input className="input" name="email_ponente" type="email" value={form.email_ponente} onChange={handleChange} placeholder="Introducir información" />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Nombre del evento</span>
          <input className="input" name="nombre_evento" value={form.nombre_evento} onChange={handleChange} placeholder="Introducir información" />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Ciudad del evento</span>
          <input className="input" name="ciudad_evento" value={form.ciudad_evento} onChange={handleChange} placeholder="Introducir información" />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Fecha inicio</span>
          <input className="input" type="date" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Fecha fin</span>
          <input className="input" type="date" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} />
        </label>
        <label className="busqueda-agente-form__field">
          <span>Ciudad de origen</span>
          <input className="input" name="ciudad_origen" value={form.ciudad_origen} onChange={handleChange} placeholder="Introducir información" />
          {errors.ciudad_origen && <p className="busqueda-agente-form__error">{errors.ciudad_origen}</p>}
        </label>
        <label className="busqueda-agente-form__field">
          <span>Personas</span>
          <input className="input" type="number" name="personas" value={form.personas} onChange={handleChange} min="1" placeholder="1" />
        </label>
        <label className="busqueda-agente-form__field busqueda-agente-form__field--full">
          <span>Preferencias</span>
          <textarea className="input" name="preferencias" value={form.preferencias} onChange={handleChange} rows="3" placeholder="Introducir información" />
        </label>
      </div>

      <fieldset className="busqueda-agente-form__section">
        <legend>Necesidades</legend>
        <div className="busqueda-agente-form__checks">
          <label className="busqueda-agente-form__check">
            <input type="checkbox" name="necesita_hotel" checked={form.necesita_hotel} onChange={handleChange} />
            <span>Hotel</span>
          </label>
          <label className="busqueda-agente-form__check">
            <input type="checkbox" name="necesita_viaje" checked={form.necesita_viaje} onChange={handleChange} />
            <span>Viaje</span>
          </label>
          <label className="busqueda-agente-form__check">
            <input type="checkbox" name="necesita_taxi" checked={form.necesita_taxi} onChange={handleChange} />
            <span>Taxi</span>
          </label>
          <label className="busqueda-agente-form__check">
            <input type="checkbox" name="necesita_coche" checked={form.necesita_coche} onChange={handleChange} />
            <span>Coche de alquiler</span>
          </label>
        </div>
      </fieldset>

      <button className="btn btn--primary" type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  )
}
