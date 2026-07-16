import { FileUpload } from "./FileUpload"

export const ArchivoPonencia = ({
  label,
  fileUrl,
  uploadUrl,
  isAdmin,
  accept = "*",
  onPonenciaActualizada,
}) => {
  const handleUploadSuccess = (json) => {
    if (json?.data) {
      onPonenciaActualizada(json.data)
    }
  }

  return (
    <div>
      <p>{label}</p>

      {fileUrl ? (
        <a href={fileUrl} target="_blank" rel="noreferrer">
          Ver archivo
        </a>
      ) : (
        <p>Sin archivo</p>
      )}

      {isAdmin && (
        <FileUpload
          uploadUrl={uploadUrl}
          label={`Subir ${label}`}
          accept={accept}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  )
}
