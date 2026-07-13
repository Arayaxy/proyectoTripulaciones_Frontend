import React, { useState, useRef } from 'react';
import './_fileUpload.scss';

export const FileUpload = ({ uploadUrl, onSuccess, onError, accept = "*", label = "Seleccionar archivo" }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Error al subir el archivo");
      }

      onSuccess(json);
    } catch (err) {
      setError(err.message);
      if (onError) onError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`file-upload ${dragOver ? "file-upload--dragover" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleSelect}
        hidden
      />

      {!file && <p className="file-upload__placeholder">{label}</p>}

      {file && (
        <div className="file-upload__info">
          <p className="file-upload__filename">{file.name}</p>
          <button
            className="file-upload__submit"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Enviar"}
          </button>
        </div>
      )}

      {error && <p className="file-upload__error">{error}</p>}
    </div>
  );
}
