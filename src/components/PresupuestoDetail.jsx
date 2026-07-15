import React from 'react'
import { useNavigate } from 'react-router'

export const PresupuestoDetail = ({ presupuesto }) => {
  const navigate = useNavigate()

  return (
    <article className="presupuesto_detail">
      <p className="presupuesto_detail_presupuesto">
        <span className="presupuesto_detail_label">Presupuesto:</span>{' '}
        <strong>{presupuesto?.estadoPresupuesto}</strong>
      </p>
      <p className="presupuesto_detail_observaciones">{presupuesto?.observaciones}</p>
      <div>
        <button
          className="btn_presupuesto"
          onClick={() => presupuesto?.id && navigate(`/presupuestos/editar/${presupuesto.id}`)}
        >
          Ir a Presupuesto
        </button>
      </div>
    </article>
  )
}
