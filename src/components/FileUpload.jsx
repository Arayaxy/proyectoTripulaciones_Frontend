import React, { useState, useRef } from 'react';
import './partials/_fileUpload.scss';

export const FileUpload = ({ uploadUrl, onSuccess, onError, accept = "*", label = "Seleccionar archivo", withCredentials = true }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

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
        credentials: withCredentials ? "include" : "omit",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al subir el archivo");
      onSuccess(json);
    } catch (err) {
      setError(err.message);
      if (onError) onError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <input ref={inputRef} type="file" accept={accept} onChange={handleSelect} hidden />
      <button className="file-upload__select" onClick={() => inputRef.current?.click()}>
        {label}
      </button>
      {file && (
        <div className="file-upload__info">
          <p className="file-upload__filename">{file.name}</p>
          <button className="file-upload__submit" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Subiendo..." : "Enviar"}
          </button>
        </div>
      )}
      {error && <p className="file-upload__error">{error}</p>}
    </div>
  );
};