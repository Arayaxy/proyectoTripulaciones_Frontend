import { useState, useEffect } from 'react'
import { FileUpload } from '../../components/FileUpload'

const AUTOCOMPLETE_URL = import.meta.env.VITE_AUTOCOMPLETE_URL;
const ESTADOS = ['Planificado', 'Reservado', 'Confirmado', 'Finalizado', 'Cancelado']

const initialForm = {
  nombreEvento: '',
  ciudad: '',
  lugarConfirmado: '',
  fechaInicio: '',
  fechaFin: '',
  numeroPersonas: '',
  tipoEvento: '',
  nota: '',
  idCliente: '',
  estado: 'Planificado',
}

export const CrearEventoFormulario = ({ onSubmit, loading, clientes }) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [respuesta, setRespuesta] = useState(null)
  const [autocompleteData, setAutocompleteData] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.nombreEvento.trim()) errs.nombreEvento = "El nombre del evento es obligatorio"
    if (!form.ciudad.trim()) errs.ciudad = "La ciudad es obligatoria"
    if (!form.tipoEvento.trim()) errs.tipoEvento = "El tipo de evento es obligatorio"
    if (!form.fechaInicio) errs.fechaInicio = "La fecha de inicio es obligatoria"
    if (!form.fechaFin) errs.fechaFin = "La fecha de fin es obligatoria"
    if (!form.numeroPersonas || Number(form.numeroPersonas) <= 0) errs.numeroPersonas = "Indica un número de asistentes válido"
    if (!form.idCliente) errs.idCliente = "Selecciona un cliente"
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({
      ...form,
      numeroPersonas: Number(form.numeroPersonas),
      fechaInicio: form.fechaInicio ? new Date(form.fechaInicio).toISOString() : undefined,
      fechaFin: form.fechaFin ? new Date(form.fechaFin).toISOString() : undefined,
    })
  }

  useEffect(() => {
    if (autocompleteData) {
      const toDateInput = (val) => {
        if (!val) return '';
        const parts = val.split('/');
        if (parts.length === 3) {
          const [dd, mm, yyyy] = parts;
          return `${yyyy}-${mm}-${dd}`;
        }
        const d = new Date(val);
        if (isNaN(d.getTime())) return val;
        return d.toISOString().split('T')[0];
      };
      setForm((prev) => ({
        ...prev,
        nombreEvento: autocompleteData.nombre_evento || prev.nombreEvento,
        ciudad: autocompleteData.ciudad || prev.ciudad,
        lugarConfirmado: autocompleteData.lugar_confirmado || prev.lugarConfirmado,
        fechaInicio: toDateInput(autocompleteData.fecha_inicio) || prev.fechaInicio,
        fechaFin: toDateInput(autocompleteData.fecha_fin) || prev.fechaFin,
        numeroPersonas: autocompleteData.numero_personas || prev.numeroPersonas,
        tipoEvento: autocompleteData.tipo_evento || prev.tipoEvento,
        nota: autocompleteData.nota || prev.nota,
      }));
    }
  }, [autocompleteData]);

  const handleAutocompleteSuccess = (json) => {
    console.log(json)
    if (json?.datos_detectados?.evento) {
      setAutocompleteData(json.datos_detectados.evento);
    }
  };

  return (
    <>
      <form className="form-cliente" onSubmit={handleSubmit} noValidate>
        <h2>Datos del Evento</h2>
        <div className="form-cliente__grid">
          <label className="form-cliente__field">
            <span>Nombre del Evento *</span>
            <input className="input" name="nombreEvento" placeholder="Nombre del evento" value={form.nombreEvento} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Ciudad *</span>
            <input className="input" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Lugar Confirmado</span>
            <input className="input" name="lugarConfirmado" placeholder="Lugar" value={form.lugarConfirmado} onChange={handleChange} />
          </label>
          <label className="form-cliente__field">
            <span>Tipo de Evento *</span>
            <input className="input" name="tipoEvento" placeholder="Tipo de evento" value={form.tipoEvento} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Fecha Inicio *</span>
            <input className="input" type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Fecha Fin *</span>
            <input className="input" type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Número de Personas *</span>
            <input className="input" type="number" name="numeroPersonas" placeholder="0" min="1" value={form.numeroPersonas} onChange={handleChange} required />
          </label>
          <label className="form-cliente__field">
            <span>Cliente *</span>
            <select className="input" name="idCliente" value={form.idCliente} onChange={handleChange} required>
              <option value="">Seleccionar cliente</option>
              {clientes?.map((c) => (<option key={c.id} value={c.id}>{`${c.cliente} - ${c.empresa}`}</option>))}
            </select>
          </label>
          <label className="form-cliente__field">
            <span>Estado</span>
            <select className="input" name="estado" value={form.estado} onChange={handleChange} required>
              <option value="">Seleccionar estado</option>
              {ESTADOS.map((e) => (<option key={e} value={e}>{e}</option>))}
            </select>
          </label>
          <label className="form-cliente__field">
            <span>Nota</span>
            <textarea className="input" name="nota" placeholder="Nota opcional" rows="3" value={form.nota} onChange={handleChange} />
          </label>
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="presupuesto-form__error">Completa todos los campos obligatorios</p>
        )}
        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>

      <FileUpload uploadUrl={AUTOCOMPLETE_URL} onSuccess={handleAutocompleteSuccess} withCredentials={false} />
    </>
  )
}
