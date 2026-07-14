import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const EspacioForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [mostrarEspacio, setMostrarEspacio] = useState(false);
  const [mostrarSala, setMostrarSala] = useState(false);
  const [request, setRequest] = useState(null);

  const { data, loading, error } = useFetch(
    request?.url,
    request?.method,
    request?.body
  );

  const [espacio, setEspacio] = useState({
    nombreEspacio: "",
    ciudad: "",
    direccion: "",
    aforo: "",
    nota: "",
    telefonoContacto: "",
    emailContacto: "",
    nombreContacto: "",
  });

  const [sala, setSala] = useState({
    nombreSala: "",
    tipoSala: "",
    capacidadMaxSala: "",
    notaSala: "",
  });

  const handleEspacioChange = (e) => {
    const { name, value } = e.target;

    setEspacio({
      ...espacio,
      [name]: value,
    });
  };

  const handleSalaChange = (e) => {
    const { name, value } = e.target;

    setSala({
      ...sala,
      [name]: value,
    });
  };

  const crearEspacio = (e) => {
    e.preventDefault();

    const datosEspacio = {
      ...espacio,
      aforo: Number(espacio.aforo),
    };

    console.log("Espacio a enviar:", datosEspacio);

    // POST /espacios
    setRequest({
      url: `${API_URL}/espacios`,
      method: "POST",
      body: datosEspacio,
    });
    console.log(datosEspacio);
  };

  const crearSala = (e) => {
    e.preventDefault();

    const datosSala = {
      ...sala,
      capacidadMaxSala: Number(sala.capacidadMaxSala),
      // idEspacio: espacioCreado.id
    };

    console.log("Sala a enviar:", datosSala);

    // POST /salas
    setRequest({
      url: `${API_URL}/salas`,
      method: "POST",
      body: datosSala,
    });
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
        <form onSubmit={crearEspacio}>
          <h2>Crear espacio</h2>

          <label>
            Nombre
            <input
              type="text"
              name="nombreEspacio"
              value={espacio.nombreEspacio}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Ciudad
            <input
              type="text"
              name="ciudad"
              value={espacio.ciudad}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Direccion
            <input
              type="text"
              name="direccion"
              value={espacio.direccion}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Aforo
            <input
              type="number"
              name="aforo"
              value={espacio.aforo}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Nota
            <textarea
              name="nota"
              value={espacio.nota}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Telefono contacto
            <input
              type="tel"
              name="telefonoContacto"
              value={espacio.telefonoContacto}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Email contacto
            <input
              type="email"
              name="emailContacto"
              value={espacio.emailContacto}
              onChange={handleEspacioChange}
            />
          </label>

          <label>
            Nombre contacto
            <input
              type="text"
              name="nombreContacto"
              value={espacio.nombreContacto}
              onChange={handleEspacioChange}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar espacio"}
          </button>

          {error && <p>{error}</p>}
          {data && <p>Espacio creado correctamente</p>}

          <hr />

          <button
            type="button"
            onClick={() => setMostrarSala(!mostrarSala)}
          >
            {mostrarSala ? "Ocultar sala" : "Anadir sala"}
          </button>

          {mostrarSala && (
            <div>
              <h3>Crear sala</h3>

              <label>
                Nombre sala
                <input
                  type="text"
                  name="nombreSala"
                  value={sala.nombreSala}
                  onChange={handleSalaChange}
                />
              </label>

              <label>
                Tipo sala
                <input
                  type="text"
                  name="tipoSala"
                  value={sala.tipoSala}
                  onChange={handleSalaChange}
                />
              </label>

              <label>
                Capacidad maxima sala
                <input
                  type="number"
                  name="capacidadMaxSala"
                  value={sala.capacidadMaxSala}
                  onChange={handleSalaChange}
                />
              </label>

              <label>
                Nota sala
                <textarea
                  name="notaSala"
                  value={sala.notaSala}
                  onChange={handleSalaChange}
                />
              </label>

              <button type="button" onClick={crearSala}>
                Guardar sala
              </button>
            </div>
          )}
        </form>
      )}
    </section>
  );
};
