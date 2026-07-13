const API_URL = import.meta.env.VITE_API_URL;

export const getClientes = async () => {
  const res = await fetch(`${API_URL}/api/v1/clientes`, {
    credentials: 'include'
  });
  return await res.json();
};

export const createCliente = async (formData) => {
  const res = await fetch(`${API_URL}/api/v1/clientes`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  return await res.json();
};
