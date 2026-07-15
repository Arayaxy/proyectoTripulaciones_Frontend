import React from 'react'

export const PresupuestoDetail = (presupuesto) => {
  return (
    <article className="presupuesto_detail">
      <p className="presupuesto_detail_presupuesto">
        <span className="presupuesto_detail_label">Presupuesto:</span>{' '}
        <strong>{presupuesto.estadoPresupuesto}</strong>
      </p>
      <p className="presupuesto_detail_observaciones">{presupuesto.observaciones}</p>
      <div>
        <button className="btn_presupuesto" onClick={() => navigate(`/eventos/presupuesto/${presupuesto.id}`)}>
          Ir a Presupuesto
        </button>
      </div>
    </article>
  )
}
