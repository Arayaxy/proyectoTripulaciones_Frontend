import React from 'react'
import { useFetch } from '../../hooks/useFetch'

const API_URL = import.meta.env.VITE_API_URL;

export const cliente = () => {

  const { data, loading, error, setData, setError, setLoading } = useFetch(`${API_URL}/api/v1/clientes`)
  console.log(data)
  return (
    <div>
      <h1>cliente</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}
