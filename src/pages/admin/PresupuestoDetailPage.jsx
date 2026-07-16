import { useParams, useNavigate } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import { PresupuestoForm } from "../../components/PresupuestoForm"

const API_URL = import.meta.env.VITE_API_URL

export const PresupuestoDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useFetch(`${API_URL}/presupuestos/${id}`)

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este presupuesto?')) return
    try {
      const res = await fetch(`${API_URL}/presupuestos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const json = await res.json()
      if (json.ok) {
        navigate('/presupuestos')
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="presupuestos__loading">Cargando presupuesto...</div>
  if (!data?.data) return <div className="presupuestos__error">Presupuesto no encontrado</div>

  return (
    <div>
      <header className="titlePage">
        <h1>Presupuesto</h1>
        <button className="btn btn--primary" onClick={() => navigate("/presupuestos")}>
          Volver
        </button>
      </header>
      <section className="container">
        {data.data.evento && (
          <h2>{data.data.evento.nombreEvento}</h2>
        )}
        <PresupuestoForm readOnly initialValues={data.data} />
        <div className="presupuesto-card__actions" style={{ marginTop: '24px' }}>
          <button className="btn btn--logout" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="btn btn--primary" onClick={() => navigate(`/presupuestos/editar/${id}`)}>
            Editar
          </button>
        </div>
      </section>
    </div>
  )
}
