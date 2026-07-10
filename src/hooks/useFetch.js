import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET", body = null) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {

        const config = {
          method: method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (body) {
          config.body = JSON.stringify(body);
        }

        const response = await fetch(url, config);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Algo salió mal en la petición");
        }

        setData(result);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error, setData, setError, setLoading };
}
