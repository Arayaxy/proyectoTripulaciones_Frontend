import React from 'react'

export const seccionDetail = ({ evento }) => {
  return (
    <div className="seccion-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
      <article className="preview-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
        <h3>Datos</h3>
        <p><strong>Nombre:</strong> {evento?.nombre || '—'}</p>
        <p><strong>Fecha:</strong> {evento?.fecha ? new Date(evento.fecha).toLocaleDateString() : '—'}</p>
      </article>
      <article className="preview-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
        <h3>Ponencias</h3>
        <p>Pendiente de asignar</p>
      </article>
      <article className="preview-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
        <h3>Lugar</h3>
        <p><strong>Lugar:</strong> {evento?.lugarConfirmado || 'Sin confirmar'}</p>
        <p><strong>Estado:</strong> {evento?.estado || '—'}</p>
      </article>
      <article className="preview-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
        <h3>Presupuesto</h3>
        <p><strong>Total:</strong> {evento?.presupuesto?.total ? `${evento.presupuesto.total}€` : '—'}</p>
        <p><strong>Estado:</strong> {evento?.presupuesto?.estadoPresupuesto ? 'Aprobado' : 'Pendiente'}</p>
      </article>
    </div>
  )
}
