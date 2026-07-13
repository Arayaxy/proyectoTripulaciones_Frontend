import { useNavigate } from 'react-router'
import { cliente as Cliente } from '../../components/clientes/cliente'

export const ClientePage = () => {
  const navigate = useNavigate()
  return (
    <div>
            <button className="btn btn--primary" onClick={() => navigate('/clientes/nuevo')}>+ Nuevo Cliente</button>
      <Cliente />
    </div>
  )
}

