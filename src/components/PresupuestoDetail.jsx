import React from 'react'
import { useNavigate } from 'react-router'

export const PresupuestoDetail = ({ presupuesto, eventoId }) => {
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
          onClick={() => navigate(`/detalle/${eventoId}?seccion=presupuesto`)}
        >
          Ir a Presupuesto
        </button>
      </div>
    </article>
  )
}
