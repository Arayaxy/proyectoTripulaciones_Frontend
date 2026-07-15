import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { NavbarInterno } from "../../components/NavbarInterno"
import { FileUpload } from "../../components/FileUpload"
import "../../components/partials/_busquedaAgenteForm.scss"

const API_URL = import.meta.env.VITE_API_URL

export const CrearPonenciaPage = () => {
  const { eventoId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const eventoState = location.state?.evento
  const [message, setMessage] = useState("")

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
    fechaInicio: eventoState?.fechaInicio ? eventoState.fechaInicio.slice(0, 10) : "",
    fechaFin: eventoState?.fechaFin ? eventoState.fechaFin.slice(0, 10) : "",
    nombreEvento: eventoState?.nombreEvento || "",
    ciudadOrigen: "",
    personas: "1",
    preferencias: "",
    necesitaHotel: false,
    necesitaViaje: false,
    necesitaTaxi: false,
    necesitaCoche: false,
    nombrePonente: "",
    emailPonente: "",
  })

  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [formValues, setFormValues] = useState(null)

  const { data, loading, error, setData, setError } = useFetch(
    shouldSubmit ? `${API_URL}/ponencias` : null,
    "POST",
    shouldSubmit ? formValues : null
  )

  useEffect(() => {
    if (data) {
      setMessage("Ponencia creada correctamente")
      setShouldSubmit(false)
      setFormValues(null)
      setTimeout(() => navigate(`/detalle/${eventoId}?seccion=ponencias`), 1000)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setMessage(`Error: ${error}`)
      setShouldSubmit(false)
      setError(null)
    }
  }, [error])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const [buscando, setBuscando] = useState(false)
  const [resultados, setResultados] = useState(null)
  const [errorBusqueda, setErrorBusqueda] = useState(null)

  const VIAJES_URL = import.meta.env.VITE_VIAJES_URL

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

  const handleBuscar = async () => {
    setBuscando(true)
    setErrorBusqueda(null)
    setResultados(null)
    const body = {
      nombre_ponente: form.nombrePonente,
      email_ponente: form.emailPonente,
      nombre_evento: form.nombreEvento,
      ciudad_evento: form.ciudadEvento,
      fecha_inicio: form.fechaInicio,
      fecha_fin: form.fechaFin,
      ciudad_origen: form.ciudadOrigen,
      personas: form.personas,
      preferencias: form.preferencias,
      necesita_hotel: form.necesitaHotel,
      necesita_viaje: form.necesitaViaje,
      necesita_taxi: form.necesitaTaxi,
      necesita_coche: form.necesitaCoche,
    }
    try {
      const res = await fetch(VIAJES_URL, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      console.log("Resultado búsqueda:", json)
      if (!res.ok) throw new Error(json.mensaje || "Error en la búsqueda")
      setResultados(json)
    } catch (err) {
      setErrorBusqueda(err.message)
    } finally {
      setBuscando(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      tipoPonencia: form.tipoPonencia,
      ponenteEstado: form.ponenteEstado,
      idPonente: form.idPonente,
      horarioPonencia: form.horarioPonencia ? new Date(form.horarioPonencia).toISOString() : undefined,
      checkinHorario: form.checkinHorario ? new Date(form.checkinHorario).toISOString() : undefined,
      horarioIdaTransporte: form.horarioIdaTransporte ? new Date(form.horarioIdaTransporte).toISOString() : undefined,
      horarioVueltaTransporte: form.horarioVueltaTransporte ? new Date(form.horarioVueltaTransporte).toISOString() : undefined,
      nombreHotel: form.nombreHotel || undefined,
      localizacionHotel: form.localizacionHotel || undefined,
      billeteIdaLink: form.billeteIdaLink || undefined,
      billeteVueltaLink: form.billeteVueltaLink || undefined,
      notaTransporte: form.notaTransporte || undefined,
      presentacionLink: form.presentacionLink || undefined,
      idEvento: eventoId,
    }
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = undefined })
    setFormValues(payload)
    setShouldSubmit(true)
  }

  return (
    <>
      <header className="titlePage">
        <h1>Nueva Ponencia</h1>
      </header>

      {message && (
        <div className={`presupuestos__message ${message.includes("Error") ? "presupuestos__message--error" : "presupuestos__message--success"}`}>
          {message}
        </div>
      )}

      <section className="container">
        {eventoId && <NavbarInterno eventoId={eventoId} />}

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
              <input className="input" type="datetime-local" name="horarioPonencia" value={form.horarioPonencia} onChange={handleChange} required />
            </label>
            <label className="form-cliente__field">
              <span>Check-in</span>
              <input className="input" type="datetime-local" name="checkinHorario" value={form.checkinHorario} onChange={handleChange} required />
            </label>
            <label className="form-cliente__field">
              <span>Ciudad del evento *</span>
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
              <span>Fecha inicio *</span>
              <input className="input" type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} />
            </label>
            <label className="form-cliente__field">
              <span>Fecha fin *</span>
              <input className="input" type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} />
            </label>
            <label className="form-cliente__field form-cliente__field--full">
              <span>Presentación</span>
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
            <label className="form-cliente__field">
              <span>Ciudad de origen *</span>
              <input className="input" name="ciudadOrigen" value={form.ciudadOrigen} onChange={handleChange} placeholder="Introducir información" />
            </label>
            <label className="form-cliente__field">
              <span>Personas *</span>
              <input className="input" type="number" name="personas" value={form.personas} onChange={handleChange} min="1" placeholder="1" />
            </label>
            <label className="form-cliente__field form-cliente__field--full">
              <span>Preferencias *</span>
              <textarea className="input" name="preferencias" value={form.preferencias} onChange={handleChange} rows="3" placeholder="Introducir información" />
            </label>
            <fieldset className="busqueda-agente-form__section">
              <legend>Necesidades</legend>
              <div className="busqueda-agente-form__checks">
                <label className="busqueda-agente-form__check">
                  <input type="checkbox" name="necesitaHotel" checked={form.necesitaHotel} onChange={handleChange} />
                  <span>Hotel</span>
                </label>
                <label className="busqueda-agente-form__check">
                  <input type="checkbox" name="necesitaViaje" checked={form.necesitaViaje} onChange={handleChange} />
                  <span>Viaje</span>
                </label>
                <label className="busqueda-agente-form__check">
                  <input type="checkbox" name="necesitaTaxi" checked={form.necesitaTaxi} onChange={handleChange} />
                  <span>Taxi</span>
                </label>
                <label className="busqueda-agente-form__check">
                  <input type="checkbox" name="necesitaCoche" checked={form.necesitaCoche} onChange={handleChange} />
                  <span>Coche de alquiler</span>
                </label>
              </div>
            </fieldset>
            <button className="btn btn--primary" type="button" onClick={handleBuscar} disabled={buscando}>
              {buscando ? "Buscando..." : "Buscar"}
            </button>
            {errorBusqueda && <p className="busqueda-agente-form__error">{errorBusqueda}</p>}

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
            {resultados?.propuesta?.hoteles?.length > 0 && (
              <div className="busqueda-agente-form__resultados">
                {resultados.propuesta.hoteles.map((hotel, i) => (
                  <div key={i} className="busqueda-agente-form__resultado-card">
                    <p><strong>{hotel.nombre}</strong> {hotel.valoracion && <>— {hotel.valoracion}/10</>}</p>
                    <p>{hotel.direccion}</p>
                    {hotel.precio_total && <p><strong>{hotel.precio_total} {hotel.moneda || "EUR"}</strong></p>}
                    {hotel.enlace_reserva && (
                      <a href={hotel.enlace_reserva} target="_blank" rel="noopener noreferrer" className="btn--reserva">Reservar</a>
                    )}
                    <button type="button" onClick={() => setForm((prev) => ({ ...prev, nombreHotel: hotel.nombre, localizacionHotel: hotel.direccion || hotel.localizacion || "" }))}>
                      Seleccionar
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            {resultados?.propuesta?.vuelos?.length > 0 && (
              <div className="busqueda-agente-form__resultados">
                {resultados.propuesta.vuelos.map((vuelo, i) => (
                  <div key={i} className="busqueda-agente-form__resultado-card">
                    <p><strong>{vuelo.proveedor || vuelo.aerolinea || `Opción ${i + 1}`}</strong> {vuelo.modo && <span>({vuelo.modo})</span>}</p>
                    {vuelo.ida && <p>Ida: {vuelo.ida.origen} → {vuelo.ida.destino} {vuelo.ida.salida || vuelo.ida.fecha} → {vuelo.ida.llegada}</p>}
                    {vuelo.vuelta && <p>Vuelta: {vuelo.vuelta.origen} → {vuelo.vuelta.destino} {vuelo.vuelta.salida || vuelo.vuelta.fecha} → {vuelo.vuelta.llegada}</p>}
                    {vuelo.precio_total && <p><strong>{vuelo.precio_total} {vuelo.moneda || "EUR"}</strong></p>}
                    {vuelo.enlace_reserva && (
                      <a href={vuelo.enlace_reserva} target="_blank" rel="noopener noreferrer" className="btn--reserva">Reservar</a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-cliente__actions">
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Crear Ponencia"}
            </button>
            <button className="btn btn--cancel" type="button" onClick={() => navigate(`/detalle/${eventoId}?seccion=ponencias`)} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
