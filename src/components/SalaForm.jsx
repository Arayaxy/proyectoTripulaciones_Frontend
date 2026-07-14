import { useState } from "react"

const defaultValues = {
  nombreSala: "",
  tipoSala: "",
  capacidadMaxSala: "",
  notaSala: "",
}

export const SalaForm = ({ initialValues, onSubmit, loading, onCancel }) => {
  const [values, setValues] = useState(initialValues ?? defaultValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (vals) => {
    const errs = {}
    if (!vals.nombreSala?.trim()) errs.nombreSala = "El nombre de la sala es obligatorio"
    if (!vals.tipoSala?.trim()) errs.tipoSala = "El tipo de sala es obligatorio"
    if (!vals.capacidadMaxSala || Number(vals.capacidadMaxSala) <= 0) {
      errs.capacidadMaxSala = "La capacidad debe ser mayor que 0"
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const payload = {
        ...values,
        capacidadMaxSala: Number(values.capacidadMaxSala),
      }
      onSubmit(payload)
    }
  }

  const renderField = (name, label, type = "text", opts = {}) => (
    <div className="presupuesto-form__field">
      <label className="presupuesto-form__label">{label}</label>
      <input
        className="presupuesto-form__input"
        type={type}
        name={name}
        value={values[name] ?? ""}
        onChange={handleChange}
        disabled={loading}
        {...opts}
      />
      {errors[name] && <p className="presupuesto-form__error">{errors[name]}</p>}
    </div>
  )

  const renderTextarea = (name, label) => (
    <div className="presupuesto-form__field">
      <label className="presupuesto-form__label">{label}</label>
      <textarea
        className="presupuesto-form__input presupuesto-form__input--textarea"
        name={name}
        value={values[name] ?? ""}
        onChange={handleChange}
        disabled={loading}
        rows="3"
      />
    </div>
  )

  return (
    <form className="presupuesto-form" onSubmit={handleSubmit} noValidate>
      {renderField("nombreSala", "Nombre de la sala *")}
      {renderField("tipoSala", "Tipo de sala *")}
      {renderField("capacidadMaxSala", "Capacidad máxima *", "number", { min: "1" })}
      {renderTextarea("notaSala", "Nota")}

      <div className="presupuesto-form__actions">
        <button className="presupuesto-form__btn presupuesto-form__btn--submit" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button className="presupuesto-form__btn presupuesto-form__btn--cancel" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
