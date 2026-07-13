import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { ClientCard } from './ClientCard';

const API_URL = import.meta.env.VITE_API_URL;

export const cliente = () => {
  const { data } = useFetch(`${API_URL}/api/v1/clientes`, 'GET');

  return (
    <div>
      <h1>cliente</h1>

      {data?.ok && data.data.map((cli) => (
        <ClientCard key={cli.id} cliente={cli} />
      ))}
    </div>
  );
};