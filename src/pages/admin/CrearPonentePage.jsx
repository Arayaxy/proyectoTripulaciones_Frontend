import { useNavigate } from 'react-router'
import { CrearPonenteForm } from '../../components/CrearPonenteForm'

export const CrearPonentePage = () => {
  const navigate = useNavigate()

  const handleCreated = (creado) => {
    navigate(-1, { state: { nuevoPonente: creado } })
  }

  return (
    <>
      <header className="titlePage">
        <h1>Nuevo ponente</h1>
      </header>
      <section className="container">
        <CrearPonenteForm onCreated={handleCreated} onCancel={() => navigate(-1)} />
      </section>
    </>
  )
}
