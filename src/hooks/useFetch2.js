import { useEffect, useState } from "react";

/**
 * Hook reutilizable para llamar a la API del backend.
 * Anade automaticamente el token JWT si existe en localStorage.
 *
 * @param {string|null} url - Endpoint opcional que se ejecuta al montar el componente.
 * @param {object} options - Opciones opcionales para esa primera peticion.
 * @returns {{data: unknown, loading: boolean, error: string|null, request: Function}}
 */
export const useFetch = (url = null, options = {}) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Lanza una peticion HTTP contra la API configurada en VITE_API_URL.
   *
   * @param {string} endpoint - Ruta relativa de la API, por ejemplo "/clases".
   * @param {object} config - Metodo, headers y body de la peticion.
   * @returns {Promise<object>} Respuesta JSON del backend.
   */
  const request = async (endpoint, config = {}) => {

    setLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem('token');

      const headers = {

        'Content-Type': 'application/json',
        ...config.headers

      };

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {

        method: config.method || 'GET',
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined

      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.msg || `Error: ${res.status}`);
      }

      setData(result);
      return result;

    } catch (error) {

      console.log(error);
      setError(error.message);
      throw error;

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      await request(url, options);
    };

    fetchData();
  }, [url]);

  return { data, loading, error, request };
};
