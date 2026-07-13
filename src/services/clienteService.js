const API_URL = import.meta.env.VITE_API_URL;

export const getClientes = async () => {
  const res = await fetch(`${API_URL}/clientes`, {
    credentials: 'include'
  });
  return await res.json();
};

export const createCliente = async (formData) => {
  const res = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  return await res.json();
};

export const deleteCliente = async (id) => {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return await res.json();
};

export const getCliente = async (id) => {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    credentials: 'include'
  });
  return await res.json();
};

export const updateCliente = async (id, data) => {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return await res.json();
};
