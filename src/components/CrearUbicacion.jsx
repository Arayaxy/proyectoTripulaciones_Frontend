import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const initialEspacio = {
  nombreEspacio: "",
  ciudad: "",
  direccion: "",
  aforo: "",
  nota: "",
  telefonoContacto: "",
  emailContacto: "",
  nombreContacto: "",
};

const initialSala = {
  nombreSala: "",
  tipoSala: "",
  capacidadMaxSala: "",
  notaSala: "",
};

export const CrearUbicacion = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [mostrarEspacio, setMostrarEspacio] = useState(false);
  const [mostrarSala, setMostrarSala] = useState(false);

  const [espacio, setEspacio] = useState(initialEspacio);
  const [sala, setSala] = useState(initialSala);

  const [espacioErrors, setEspacioErrors] = useState({});
  const [salaErrors, setSalaErrors] = useState({});
  const [espacioPayload, setEspacioPayload] = useState(null);
  const [salaPayload, setSalaPayload] = useState(null);

  const {
    data: espacioData,
    loading: loadingEspacio,
    error: errorEspacio,
    setData: setEspacioData,
    setError: setEspacioError,
  } = useFetch(
    espacioPayload ? `${API_URL}/espacios` : null,
    "POST",
    espacioPayload
  );

  const espacioCreado = espacioData?.data;

  const {
    data: salaData,
    loading: loadingSala,
    error: errorSala,
    setData: setSalaData,
    setError: setSalaError,
  } = useFetch(
    salaPayload ? `${API_URL}/salas` : null,
    "POST",
    salaPayload
  );

  const loading = loadingEspacio || loadingSala;

  const handleEspacioChange = (e) => {
    const { name, value } = e.target;
    setEspacio({ ...espacio, [name]: value });
  };

  const handleSalaChange = (e) => {
    const { name, value } = e.target;
    setSala({ ...sala, [name]: value });
  };

  const validateEspacio = (values) => {
    const errors = {};

    if (!values.nombreEspacio.trim()) {
      errors.nombreEspacio = "El nombre del espacio es obligatorio";
    }

    if (!values.ciudad.trim()) {
      errors.ciudad = "La ciudad es obligatoria";
    }

    if (!values.direccion.trim()) {
      errors.direccion = "La direccion es obligatoria";
    }

    if (!values.aforo || Number(values.aforo) <= 0) {
      errors.aforo = "El aforo debe ser mayor que 0";
    }

    return errors;
  };

  const validateSala = (values) => {
    const errors = {};

    if (!values.nombreSala.trim()) {
      errors.nombreSala = "El nombre de la sala es obligatorio";
    }

    if (!values.tipoSala.trim()) {
      errors.tipoSala = "El tipo de sala es obligatorio";
    }

    if (!values.capacidadMaxSala || Number(values.capacidadMaxSala) <= 0) {
      errors.capacidadMaxSala = "La capacidad debe ser mayor que 0";
    }

    if (!espacioCreado?.id) {
      errors.idEspacio = "Primero crea un espacio para poder anadir salas";
    }

    return errors;
  };

  const crearEspacio = (e) => {
    e.preventDefault();

    const errors = validateEspacio(espacio);
    setEspacioErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("[CrearUbicacion] Errores en espacio:", errors);
      return;
    }

    const datosEspacio = {
      ...espacio,
      aforo: Number(espacio.aforo),
    };

    setEspacioData(null);
    setEspacioError(null);
    setSalaData(null);
    setSalaPayload(null);
    setSala(initialSala);
    setSalaErrors({});
    setEspacioPayload(datosEspacio);

    console.log("[CrearUbicacion] Espacio a enviar:", datosEspacio);
  };

  const crearSala = (e) => {
    e.preventDefault();

    const errors = validateSala(sala);
    setSalaErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("[CrearUbicacion] Errores en sala:", errors);
      return;
    }

    const datosSala = {
      ...sala,
      capacidadMaxSala: Number(sala.capacidadMaxSala),
      idEspacio: espacioCreado.id,
    };

    setSalaData(null);
    setSalaError(null);
    setSalaPayload(datosSala);

    console.log("[CrearUbicacion] Sala a enviar:", datosSala);
    console.log("[CrearUbicacion] Sala vinculada al espacio:", espacioCreado.id);
  };

  return (
    <section>
      <button
        type="button"
        onClick={() => setMostrarEspacio(!mostrarEspacio)}
      >
        {mostrarEspacio ? "Ocultar crear espacio" : "Crear espacio"}
      </button>

      {mostrarEspacio && (
        <>
          <form onSubmit={crearEspacio}>
            <h2>Crear espacio</h2>

            <label>
              Nombre
              <input
                type="text"
                name="nombreEspacio"
                value={espacio.nombreEspacio}
                onChange={handleEspacioChange}
                disabled={loading}
              />
              {espacioErrors.nombreEspacio && <p>{espacioErrors.nombreEspacio}</p>}
            </label>

            <label>
              Ciudad
              <input
                type="text"
                name="ciudad"
                value={espacio.ciudad}
                onChange={handleEspacioChange}
                disabled={loading}
              />
              {espacioErrors.ciudad && <p>{espacioErrors.ciudad}</p>}
            </label>

            <label>
              Direccion
              <input
                type="text"
                name="direccion"
                value={espacio.direccion}
                onChange={handleEspacioChange}
                disabled={loading}
              />
              {espacioErrors.direccion && <p>{espacioErrors.direccion}</p>}
            </label>

            <label>
              Aforo
              <input
                type="number"
                name="aforo"
                value={espacio.aforo}
                onChange={handleEspacioChange}
                min="1"
                disabled={loading}
              />
              {espacioErrors.aforo && <p>{espacioErrors.aforo}</p>}
            </label>

            <label>
              Nota
              <textarea
                name="nota"
                value={espacio.nota}
                onChange={handleEspacioChange}
                disabled={loading}
              />
            </label>

            <label>
              Telefono contacto
              <input
                type="tel"
                name="telefonoContacto"
                value={espacio.telefonoContacto}
                onChange={handleEspacioChange}
                disabled={loading}
              />
            </label>

            <label>
              Email contacto
              <input
                type="email"
                name="emailContacto"
                value={espacio.emailContacto}
                onChange={handleEspacioChange}
                disabled={loading}
              />
            </label>

            <label>
              Nombre contacto
              <input
                type="text"
                name="nombreContacto"
                value={espacio.nombreContacto}
                onChange={handleEspacioChange}
                disabled={loading}
              />
            </label>

            <button type="submit" disabled={loadingEspacio}>
              {loadingEspacio ? "Guardando..." : "Guardar espacio"}
            </button>
          </form>

          {errorEspacio && <p>Error creando espacio: {errorEspacio}</p>}
          {espacioCreado && (
            <p>Espacio creado correctamente: {espacioCreado.nombreEspacio}</p>
          )}

          <hr />

          <button
            type="button"
            onClick={() => setMostrarSala(!mostrarSala)}
            disabled={!espacioCreado}
          >
            {mostrarSala ? "Ocultar sala" : "Anadir sala"}
          </button>

          {mostrarSala && (
            <form onSubmit={crearSala}>
              <h3>Crear sala</h3>

              <label>
                Nombre sala
                <input
                  type="text"
                  name="nombreSala"
                  value={sala.nombreSala}
                  onChange={handleSalaChange}
                  disabled={loading}
                />
                {salaErrors.nombreSala && <p>{salaErrors.nombreSala}</p>}
              </label>

              <label>
                Tipo sala
                <input
                  type="text"
                  name="tipoSala"
                  value={sala.tipoSala}
                  onChange={handleSalaChange}
                  disabled={loading}
                />
                {salaErrors.tipoSala && <p>{salaErrors.tipoSala}</p>}
              </label>

              <label>
                Capacidad maxima sala
                <input
                  type="number"
                  name="capacidadMaxSala"
                  value={sala.capacidadMaxSala}
                  onChange={handleSalaChange}
                  min="1"
                  disabled={loading}
                />
                {salaErrors.capacidadMaxSala && <p>{salaErrors.capacidadMaxSala}</p>}
              </label>

              <label>
                Nota sala
                <textarea
                  name="notaSala"
                  value={sala.notaSala}
                  onChange={handleSalaChange}
                  disabled={loading}
                />
              </label>

              {salaErrors.idEspacio && <p>{salaErrors.idEspacio}</p>}

              <button type="submit" disabled={loadingSala || !espacioCreado}>
                {loadingSala ? "Guardando..." : "Guardar sala"}
              </button>
            </form>
          )}

          {errorSala && <p>Error creando sala: {errorSala}</p>}
          {salaData && <p>Sala creada correctamente: {salaData.data?.nombreSala}</p>}
        </>
      )}
    </section>
  );
};
