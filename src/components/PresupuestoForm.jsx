import { useState } from "react"

const defaultValues = {
  estadoPresupuesto: false,
  total: "",
  fecha: new Date().toISOString().split("T")[0],
  precioUbicacion: "",
  notaUbicacion: "",
  catering: false,
  precioCatering: "",
  notaCatering: "",
  audiovisuales: false,
  precioAudiovisuales: "",
  notaAudiovisuales: "",
  otros: false,
  precioOtros: "",
  notaOtros: "",
  observaciones: "",
}

export const PresupuestoForm = ({ initialValues, onSubmit, loading, onCancel, readOnly }) => {
  const [values, setValues] = useState(initialValues ?? defaultValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validate = (vals) => {
    const errs = {}
    if (!vals.total || parseFloat(vals.total) < 0) {
      errs.total = "El total debe ser un número positivo"
    }
    if (vals.precioUbicacion && parseFloat(vals.precioUbicacion) < 0) {
      errs.precioUbicacion = "Debe ser un número positivo"
    }
    if (vals.precioCatering && parseFloat(vals.precioCatering) < 0) {
      errs.precioCatering = "Debe ser un número positivo"
    }
    if (vals.precioAudiovisuales && parseFloat(vals.precioAudiovisuales) < 0) {
      errs.precioAudiovisuales = "Debe ser un número positivo"
    }
    if (vals.precioOtros && parseFloat(vals.precioOtros) < 0) {
      errs.precioOtros = "Debe ser un número positivo"
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const { id, evento, ...cleanValues } = values
      const payload = {
        ...cleanValues,
        total: parseFloat(cleanValues.total) || 0,
        precioUbicacion: parseFloat(values.precioUbicacion) || 0,
        precioCatering: parseFloat(values.precioCatering) || 0,
        precioAudiovisuales: parseFloat(values.precioAudiovisuales) || 0,
        precioOtros: parseFloat(values.precioOtros) || 0,
        fecha: values.fecha ? new Date(values.fecha).toISOString() : new Date().toISOString(),
      }
      onSubmit(payload)
    }
  }

  const renderCheckbox = (name, label) => (
    <label className="presupuesto-form__label presupuesto-form__label--checkbox">
      <input
        type="checkbox"
        name={name}
        checked={values[name]}
        onChange={handleChange}
        disabled={loading || readOnly}
      />
      {label}
    </label>
  )

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

  const renderSection = (title, checkboxName, priceName, noteName) => (
    <fieldset className="presupuesto-form__section">
      <legend>{renderCheckbox(checkboxName, title)}</legend>
      {values[checkboxName] && (
        <>
          {renderField(priceName, "Precio", "number", { min: 0, step: "0.01" })}
          {renderField(noteName, "Nota")}
        </>
      )}
    </fieldset>
  )

  return (
    <form className="presupuesto-form" onSubmit={handleSubmit} noValidate>
      <div className="presupuesto-form__field">
        {renderCheckbox("estadoPresupuesto", "Presupuesto aprobado")}
      </div>

      {renderField("total", "Total *", "number", { min: 0, step: "0.01" })}
      {renderField("fecha", "Fecha", "date")}

      <fieldset className="presupuesto-form__section">
        <legend>Ubicación</legend>
        {renderField("precioUbicacion", "Precio", "number", { min: 0, step: "0.01" })}
        {renderField("notaUbicacion", "Nota")}
      </fieldset>
      {renderSection("Catering", "catering", "precioCatering", "notaCatering")}
      {renderSection("Audiovisuales", "audiovisuales", "precioAudiovisuales", "notaAudiovisuales")}
      {renderSection("Otros", "otros", "precioOtros", "notaOtros")}

      {renderTextarea("observaciones", "Observaciones")}

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
