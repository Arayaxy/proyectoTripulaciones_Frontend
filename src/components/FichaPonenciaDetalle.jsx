import { ArchivoPonencia } from "./ArchivoPonencia"

export const FichaPonenciaDetalle = ({ ponencia, isAdmin, onPonenciaActualizada }) => {
  const API_URL = import.meta.env.VITE_API_URL

  if (!ponencia) return null

  return (
    <article>
      <h2>{ponencia.ponente?.nombrePonente}</h2>

      <h3>Datos del ponente</h3>
      <p>Email: {ponencia.ponente?.email}</p>
      <p>Telefono: {ponencia.ponente?.telefono}</p>
      <p>Empresa: {ponencia.ponente?.empresa}</p>
      <p>Cargo: {ponencia.ponente?.cargo}</p>
      <p>Sector: {ponencia.ponente?.sector}</p>
      <p>Documento: {ponencia.ponente?.docuIdentificacion}</p>

      <h3>Datos de la ponencia</h3>
      <p>Tipo de ponencia: {ponencia.tipoPonencia}</p>
      <p>Estado: {ponencia.ponenteEstado}</p>
      <p>Horario ponencia: {ponencia.horarioPonencia}</p>
      <ArchivoPonencia
        label="Presentacion"
        fileUrl={ponencia.presentacionLink}
        uploadUrl={`${API_URL}/ponencias/${ponencia.id}/presentacion`}
        isAdmin={isAdmin}
        accept=".pdf,.ppt,.pptx"
        onPonenciaActualizada={onPonenciaActualizada}
      />

      <h3>Hotel</h3>
      <p>Nombre hotel: {ponencia.nombreHotel}</p>
      <p>Localizacion hotel: {ponencia.localizacionHotel}</p>
      <p>Check-in: {ponencia.checkinHorario}</p>

      <h3>Transporte</h3>
      <p>Horario ida: {ponencia.horarioIdaTransporte}</p>
      <p>Horario vuelta: {ponencia.horarioVueltaTransporte}</p>
      <p>Nota transporte: {ponencia.notaTransporte}</p>
      <ArchivoPonencia
        label="Billete ida"
        fileUrl={ponencia.billeteIdaLink}
        uploadUrl={`${API_URL}/ponencias/${ponencia.id}/billete-ida`}
        isAdmin={isAdmin}
        accept=".pdf,.jpg,.jpeg,.png"
        onPonenciaActualizada={onPonenciaActualizada}
      />
      <ArchivoPonencia
        label="Billete vuelta"
        fileUrl={ponencia.billeteVueltaLink}
        uploadUrl={`${API_URL}/ponencias/${ponencia.id}/billete-vuelta`}
        isAdmin={isAdmin}
        accept=".pdf,.jpg,.jpeg,.png"
        onPonenciaActualizada={onPonenciaActualizada}
      />

      <h3>Evento</h3>
      <p>Evento: {ponencia.evento?.nombreEvento}</p>
      <p>Ciudad: {ponencia.evento?.ciudad}</p>
      <p>Tipo de evento: {ponencia.evento?.tipoEvento}</p>
    </article>
  )
}
