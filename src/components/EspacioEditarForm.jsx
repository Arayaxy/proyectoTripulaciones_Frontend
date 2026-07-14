import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const EspacioEditarForm = ({ espacio, setEspacioEnEdicion }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [request, setRequest] = useState(null);

  const { data, loading, error } = useFetch(
    request?.url,
    request?.method,
    request?.body
  );

  const [espacioModificaciones, setEspacioModificaciones] = useState({
    nombreEspacio: espacio.nombreEspacio,
    ciudad: espacio.ciudad,
    direccion: espacio.direccion,
    aforo: espacio.aforo,
    nota: espacio.nota,
    telefonoContacto: espacio.telefonoContacto,
    emailContacto: espacio.emailContacto,
    nombreContacto: espacio.nombreContacto,
  });

  const [sala, setSala] = useState({
    nombreSala: "",
    tipoSala: "",
    capacidadMaxSala: "",
    notaSala: "",
  });

  const handleEspacioChange = (e) => {
    const { name, value } = e.target;

    setEspacioModificaciones({
      ...espacioModificaciones,
      [name]: value,
    });
  };

  const editarEspacio = (e) => {
    e.preventDefault();

    const datosEspacio = {
      ...espacioModificaciones,
      aforo: Number(espacioModificaciones.aforo),
    };

    console.log("Espacio a enviar:", datosEspacio);

    // POST /espacios
    setRequest({
      url: `${API_URL}/espacios/${espacio.id}`,
      method: "PATCH",
      body: datosEspacio,
    });
    console.log(datosEspacio);

    setEspacioEnEdicion(null);
  };

  return (
    <section>
      <form onSubmit={editarEspacio}>
        <h2>Editar espacio</h2>

        <label>
          Nombre
          <input
            type="text"
            name="nombreEspacio"
            value={espacioModificaciones.nombreEspacio}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Ciudad
          <input
            type="text"
            name="ciudad"
            value={espacioModificaciones.ciudad}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Direccion
          <input
            type="text"
            name="direccion"
            value={espacioModificaciones.direccion}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Aforo
          <input
            type="number"
            name="aforo"
            value={espacioModificaciones.aforo}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Nota
          <textarea
            name="nota"
            value={espacioModificaciones.nota}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Telefono contacto
          <input
            type="tel"
            name="telefonoContacto"
            value={espacioModificaciones.telefonoContacto}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Email contacto
          <input
            type="email"
            name="emailContacto"
            value={espacioModificaciones.emailContacto}
            onChange={handleEspacioChange}
          />
        </label>

        <label>
          Nombre contacto
          <input
            type="text"
            name="nombreContacto"
            value={espacioModificaciones.nombreContacto}
            onChange={handleEspacioChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Editando..." : "Aplicar"}
        </button>

        {error && <p>{error}</p>}
        {data && <p>Espacio editado correctamente</p>}

      </form>
    </section>
  );
};
