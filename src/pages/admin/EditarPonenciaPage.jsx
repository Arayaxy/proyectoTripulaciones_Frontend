import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { NavbarInterno } from "../../components/NavbarInterno"
import { FileUpload } from "../../components/FileUpload"


const API_URL = import.meta.env.VITE_API_URL

export const EditarPonenciaPage = () => {
  const { eventoId, ponenciaId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const eventoState = location.state?.evento
  const [message, setMessage] = useState("")

  const { data: ponenciaData, loading: ponenciaLoading } = useFetch(
    ponenciaId ? `${API_URL}/ponencias/${ponenciaId}` : null
  )

  const { data: ponentesData } = useFetch(`${API_URL}/ponentes`)

  const [form, setForm] = useState({
    tipoPonencia: "",
    ponenteEstado: "",
    nombreHotel: "",
    localizacionHotel: "",
    horarioPonencia: "",
    checkinHorario: "",
    horarioIdaTransporte: "",
    horarioVueltaTransporte: "",
    notaTransporte: "",
    presentacionLink: "",
    billeteIdaLink: "",
    billeteVueltaLink: "",
    idPonente: "",
    ciudadEvento: eventoState?.ciudad || "",
    fechaInicio: eventoState?.fechaInicio ? eventoState.fechaInicio.slice(0, 16) : "",
    fechaFin: eventoState?.fechaFin ? eventoState.fechaFin.slice(0, 16) : "",
    nombreEvento: eventoState?.nombreEvento || "",
    preferencias: "",
    nombrePonente: "",
    emailPonente: "",
  })

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data: updateData, loading: updateLoading, error, setData: setUpdateData, setError } = useFetch(
    shouldSubmit ? `${API_URL}/ponencias/${ponenciaId}` : null,
    "PATCH",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (ponenciaData?.data) {
      const p = ponenciaData.data
      setForm({
        tipoPonencia: p.tipoPonencia || "",
        ponenteEstado: p.ponenteEstado || "",
        nombreHotel: p.nombreHotel || "",
        localizacionHotel: p.localizacionHotel || "",
        horarioPonencia: p.horarioPonencia ? p.horarioPonencia.slice(0, 16) : "",
        checkinHorario: p.checkinHorario ? p.checkinHorario.slice(0, 16) : "",
        horarioIdaTransporte: p.horarioIdaTransporte ? p.horarioIdaTransporte.slice(0, 16) : "",
        horarioVueltaTransporte: p.horarioVueltaTransporte ? p.horarioVueltaTransporte.slice(0, 16) : "",
        notaTransporte: p.notaTransporte || "",
        presentacionLink: p.presentacionLink || "",
        billeteIdaLink: p.billeteIdaLink || "",
        billeteVueltaLink: p.billeteVueltaLink || "",
        idPonente: p.idPonente || "",
        preferencias: p.preferencias || "",
        nombrePonente: p.ponente?.nombrePonente || "",
        emailPonente: p.ponente?.email || "",
      })
    }
  }, [ponenciaData])

  useEffect(() => {
    if (updateData) {
      setMessage("Ponencia actualizada correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate(`/detalle/${eventoId || ponenciaData?.data?.idEvento}?seccion=ponencias`), 1000)
    }
  }, [updateData])

  useEffect(() => {
    if (error) {
      setMessage(`Error: ${error}`)
      setShouldSubmit(false)
      setFormValues(null)
      setError(null)
    }
  }, [error])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name.endsWith('__date')) {
      const base = name.replace('__date', '')
      setForm((prev) => ({ ...prev, [base]: value + 'T' + (prev[base]?.split('T')[1] || '00:00') }))
    } else if (name.endsWith('__time')) {
      const base = name.replace('__time', '')
      setForm((prev) => ({ ...prev, [base]: (prev[base]?.split('T')[0] || '') + 'T' + value }))
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    }
  }

  const handlePonenteChange = (e) => {
    const ponenteId = e.target.value
    const ponente = ponentesData?.data?.find((p) => p.id === ponenteId)
    setForm((prev) => ({
      ...prev,
      idPonente: ponenteId,
      nombrePonente: ponente?.nombrePonente || "",
      emailPonente: ponente?.email || "",
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      horarioPonencia: form.horarioPonencia ? new Date(form.horarioPonencia).toISOString() : undefined,
      checkinHorario: form.checkinHorario ? new Date(form.checkinHorario).toISOString() : undefined,
      horarioIdaTransporte: form.horarioIdaTransporte ? new Date(form.horarioIdaTransporte).toISOString() : undefined,
      horarioVueltaTransporte: form.horarioVueltaTransporte ? new Date(form.horarioVueltaTransporte).toISOString() : undefined,
      fechaInicio: form.fechaInicio ? new Date(form.fechaInicio).toISOString() : undefined,
      fechaFin: form.fechaFin ? new Date(form.fechaFin).toISOString() : undefined,
    }
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = undefined })
    setFormValues(payload)
    setShouldSubmit(true)
  }

  if (ponenciaLoading) return <div className="event_info_cargando">Cargando ponencia...</div>
  if (!ponenciaData?.data) return <div className="evento_info_error">Ponencia no encontrada</div>

  const eventoIdActual = eventoId || ponenciaData?.data?.idEvento

  return (
    <>
      <header className="titlePage">
        <h1>Editar Ponencia</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        {eventoIdActual && <NavbarInterno eventoId={eventoIdActual} />}

        <form className="form-cliente" onSubmit={handleSubmit}>
          <h2>Datos de la Ponencia</h2>
          <div className="form-cliente__grid">
            <label className="form-cliente__field">
              <span>Tipo de Ponencia</span>
              <input className="input" name="tipoPonencia" value={form.tipoPonencia} onChange={handleChange} required />
            </label>
            <label className="form-cliente__field">
              <span>Estado del Ponente</span>
              <select className="input" name="ponenteEstado" value={form.ponenteEstado} onChange={handleChange} required>
                <option value="">Seleccionar estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </label>
            <label className="form-cliente__field">
              <span>Ponente</span>
              <select className="input" name="idPonente" value={form.idPonente} onChange={handlePonenteChange} required>
                <option value="">Seleccionar ponente</option>
                {ponentesData?.data?.map((ponente) => (
                  <option key={ponente.id} value={ponente.id}>{ponente.nombrePonente} - {ponente.empresa}</option>
                ))}
              </select>
            </label>
            <label className="form-cliente__field">
              <span>Horario Ponencia</span>
              <div className="form-cliente__row-duo">
                <input className="input" type="date" name="horarioPonencia__date" value={form.horarioPonencia?.split('T')[0] || ''} onChange={handleChange} required />
                <input className="input" type="time" name="horarioPonencia__time" value={form.horarioPonencia?.split('T')[1] || ''} onChange={handleChange} required />
              </div>
            </label>
            <label className="form-cliente__field">
              <span>Check-in</span>
              <div className="form-cliente__row-duo">
                <input className="input" type="date" name="checkinHorario__date" value={form.checkinHorario?.split('T')[0] || ''} onChange={handleChange} required />
                <input className="input" type="time" name="checkinHorario__time" value={form.checkinHorario?.split('T')[1] || ''} onChange={handleChange} required />
              </div>
            </label>
            <label className="form-cliente__field">
              <span>Ciudad del evento</span>
              <input className="input" name="ciudadEvento" value={form.ciudadEvento} onChange={handleChange} />
            </label>
            <div className="form-cliente__row-duo">
              <label className="form-cliente__field">
                <span>Transporte Ida</span>
                <input className="input" type="datetime-local" name="horarioIdaTransporte" value={form.horarioIdaTransporte} onChange={handleChange} />
              </label>
              <label className="form-cliente__field">
                <span>Transporte Vuelta</span>
                <input className="input" type="datetime-local" name="horarioVueltaTransporte" value={form.horarioVueltaTransporte} onChange={handleChange} />
              </label>
            </div>
            <label className="form-cliente__field">
              <span>Fecha inicio</span>
              <input className="input" type="datetime-local" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
            </label>
            <label className="form-cliente__field">
              <span>Fecha fin *</span>
              <input className="input" type="datetime-local" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
            </label>
            <label className="form-cliente__field form-cliente__field--full">
              <span>Presentación</span>
              {form.presentacionLink && (
                <div className="file-upload__existing">
                  <a href={form.presentacionLink} target="_blank" rel="noopener noreferrer">
                    Ver presentación actual
                  </a>
                  <button type="button" className="file-upload__remove" onClick={() => setForm((prev) => ({ ...prev, presentacionLink: "" }))}>
                    Eliminar
                  </button>
                </div>
              )}
              <FileUpload
                uploadUrl={`${API_URL}/upload/presentacion`}
                accept=".pdf,.ppt,.pptx"
                label="Seleccionar presentación"
                onSuccess={(result) => setForm((prev) => ({ ...prev, presentacionLink: result.data?.url || result.url }))}
                onError={(err) => setMessage(`Error al subir: ${err}`)}
              />
            </label>
            <label className="form-cliente__field form-cliente__field--full">
              <span>Nota Transporte</span>
              <textarea className="input" name="notaTransporte" value={form.notaTransporte} rows="2" onChange={handleChange} />
            </label>
            <label className="form-cliente__field form-cliente__field--full">
              <span>Preferencias</span>
              <textarea className="input" name="preferencias" value={form.preferencias} onChange={handleChange} rows="3" placeholder="Introducir información" />
            </label>
          </div>

          <div className="form-cliente__section">
            <h3>Hotel</h3>
            <div className="form-cliente__grid">
              <label className="form-cliente__field">
                <span>Nombre del Hotel</span>
                <input className="input" name="nombreHotel" value={form.nombreHotel} onChange={handleChange} required />
              </label>
              <label className="form-cliente__field">
                <span>Localización del Hotel</span>
                <input className="input" name="localizacionHotel" value={form.localizacionHotel} onChange={handleChange} required />
              </label>
            </div>
          </div>

          <div className="form-cliente__section">
            <h3>Billetes</h3>
            <div className="form-cliente__grid">
              <div className="form-cliente__row-duo">
                <label className="form-cliente__field">
                  <span>Link Billete Ida</span>
                  <input className="input" name="billeteIdaLink" value={form.billeteIdaLink} onChange={handleChange} />
                </label>
                <label className="form-cliente__field">
                  <span>Link Billete Vuelta</span>
                  <input className="input" name="billeteVueltaLink" value={form.billeteVueltaLink} onChange={handleChange} />
                </label>
              </div>
            </div>
          </div>

          <div className="form-cliente__actions">
            <button className="btn btn--primary" type="submit" disabled={updateLoading}>
              {updateLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button className="btn btn--cancel" type="button" onClick={() => navigate(`/detalle/${eventoIdActual}?seccion=ponencias`)} disabled={updateLoading}>
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
