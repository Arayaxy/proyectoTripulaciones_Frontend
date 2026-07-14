import { useState } from "react"

const defaultValues = {
  nombreEspacio: "",
  ciudad: "",
  direccion: "",
  aforo: "",
  nota: "",
  telefonoContacto: "",
  emailContacto: "",
  nombreContacto: "",
}

export const EspacioForm = ({ initialValues, onSubmit, loading, onCancel, readOnly }) => {
  const [values, setValues] = useState(initialValues ?? defaultValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (vals) => {
    const errs = {}
    if (!vals.nombreEspacio?.trim()) errs.nombreEspacio = "El nombre del espacio es obligatorio"
    if (!vals.ciudad?.trim()) errs.ciudad = "La ciudad es obligatoria"
    if (!vals.direccion?.trim()) errs.direccion = "La dirección es obligatoria"
    if (!vals.aforo || Number(vals.aforo) <= 0) errs.aforo = "El aforo debe ser mayor que 0"
    if (!vals.telefonoContacto?.trim()) errs.telefonoContacto = "El teléfono de contacto es obligatorio"
    if (!vals.nombreContacto?.trim()) errs.nombreContacto = "El nombre de contacto es obligatorio"
    if (!vals.emailContacto?.trim()) errs.emailContacto = "El email de contacto es obligatorio"
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const payload = {
        ...values,
        aforo: Number(values.aforo),
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
        disabled={loading || readOnly}
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
        disabled={loading || readOnly}
        rows="4"
      />
    </div>
  )

  return (
    <form className="presupuesto-form" onSubmit={handleSubmit} noValidate>
      {renderField("nombreEspacio", "Nombre del espacio *")}
      {renderField("ciudad", "Ciudad *")}
      {renderField("direccion", "Dirección *")}
      {renderField("aforo", "Aforo *", "number", { min: "1" })}
      {renderTextarea("nota", "Nota")}
      <fieldset className="presupuesto-form__section">
        <legend>Contacto</legend>
        {renderField("telefonoContacto", "Teléfono *", "tel")}
        {renderField("emailContacto", "Email *", "email")}
        {renderField("nombreContacto", "Nombre contacto *")}
      </fieldset>

      {!readOnly && (
        <div className="presupuesto-form__actions">
          <button className="presupuesto-form__btn presupuesto-form__btn--submit" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button className="presupuesto-form__btn presupuesto-form__btn--cancel" type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        </div>
      )}
    </form>
  )
}
