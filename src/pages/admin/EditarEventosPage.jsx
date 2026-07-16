import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useFetch } from '../../hooks/useFetch'
import { EditarEventoFormulario } from '../../components/eventos/EditarEventoFormulario'

const API_URL = import.meta.env.VITE_API_URL

export const EditarEventoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useFetch(`${API_URL}/eventos/${id}`, 'GET')
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/clientes`, { credentials: 'include' })
      .then((r) => r.json())
      .then((res) => { if (res.ok) setClientes(res.data) })
  }, [])

  const handleSubmit = async (formData) => {
    const res = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
    const json = await res.json()
    if (json.ok) navigate('/eventos')
  }

  if (!data?.ok) return <div>Cargando...</div>

  return (
    <>
      <header className="titlePage">
        <h1>Editar Evento</h1>
      </header>
      <section className="container">
        <EditarEventoFormulario
          initialData={data.data}
          onSubmit={handleSubmit}
          clientes={clientes}
        />
      </section>
    </>
  )
}
