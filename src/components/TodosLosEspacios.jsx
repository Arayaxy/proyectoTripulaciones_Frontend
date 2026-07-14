import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export const TodosLosEspacios = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [request, setRequest] = useState(null);
  const { data, loading, error } = useFetch(
    request?.url,
    request?.method,
    request?.body
  );

  // DELETE /espacios
  setRequest({
    url: `${API_URL}/espacios`,
    method: "GET",
  });

  // const {
  //   data: dataInitial,
  //   loading: loadingInitial,
  //   error: errorInitial,
  // } = useFetch(`${API_URL}/espacios`);

  const espacios = data?.data || [];

  const handleBorrarEspacio = (espacioId) => {
    console.log("Espacio a borrar:", espacioId);

    // DELETE /espacios
    setRequest({
      url: `${API_URL}/espacios/${espacioId}`,
      method: "DELETE",
    });
  };

  if (loading) return <p>Cargando espacios...</p>;
  if (error) return <p>Error al cargar los espacios: {error}</p>;

  return (
    <section>
      <h2>Todos los espacios</h2>
      <div>
        {espacios.map((espacio) => (
          <div key={espacio.id}>
            <h3>{espacio.nombreEspacio}</h3>
            <button onClick={() => handleBorrarEspacio(espacio.id)}>Eliminar espacio</button>
            <p>Ciudad: {espacio.ciudad}</p>
            <p>Direccion: {espacio.direccion}</p>
            <p>Aforo: {espacio.aforo}</p>

            {espacio.nota && (
              <p><strong>Nota:</strong> {espacio.nota}</p>
            )}

            <p><strong>Contacto:</strong> {espacio.nombreContacto}</p>
            <p><strong>Telefono:</strong> {espacio.telefonoContacto}</p>
            <p><strong>Email:</strong> {espacio.emailContacto}</p>

            {espacio.salas?.length > 0 && (
              <div>
                <h4>Salas</h4>

                {espacio.salas.map((sala) => (
                  <p key={sala.id}>
                    {sala.nombreSala} - {sala.capacidadMaxSala} personas
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
