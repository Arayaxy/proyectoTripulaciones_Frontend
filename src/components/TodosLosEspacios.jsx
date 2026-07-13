import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

export const TodosLosEspacios = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  // Creamos la variable que cuando sea true se realiza el fetch.
  const [shouldSend, setShouldSend] = useState(false);

  const {
    data,
    loading,
    error,
  } = useFetch(shouldSend ? `${API_URL}/espacios` : null);
  // La url al useFetch se pasa cuando shouldSend se vuelve true.

  const espacios = data?.data || [];

  if (loading) return <p>Cargando espacios...</p>;
  if (error) return <p>Error al cargar los espacios: {error}</p>;

  // Poner shouldSend a false al dar al botón Hola
  const loadHandle = () => {
    setShouldSend(true);
  };

  return (
    <section>
      <h2>Todos los espacios</h2>

      {/* El botón Hola. */}
      <button onClick={loadHandle}>Hola</button>

      <div>
        {espacios.map((espacio) => (
          <div key={espacio.id}>
            <h3>{espacio.nombreEspacio}</h3>

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
