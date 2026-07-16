import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { BusquedaAgenteForm } from '../../components/BusquedaAgenteForm'
import { ResultadoBusqueda } from '../../components/ResultadoBusqueda'
import '../../components/partials/_agente.scss'

const ENDPOINT_URL = import.meta.env.VITE_VIAJES_URL

export const BusquedasPage = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch(ENDPOINT_URL, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.mensaje || "Error en la búsqueda")
        return
      }
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className='titlePage'>
        <h1>Búsquedas</h1>
      </header>
      <section className='container'>
        <BusquedaAgenteForm onSubmit={handleSubmit} loading={loading} />
        {error && <p className="agente__error">Error: {error}</p>}
        {data && <ResultadoBusqueda data={data} />}
      </section>
    </>
  )
}
