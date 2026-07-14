import React from 'react';
import './_clientCard.scss';
import { useNavigate } from 'react-router'

export const ClientCard = ({ cliente, onDelete }) => {
  const navigate = useNavigate()

  return (
    <article className="client-card">
      <h2 className="client-card__name">{cliente.cliente}</h2>
      <p className="client-card__detail"><span className="client-card__label">Email:</span> <strong>{cliente.email}</strong></p>
      <p className="client-card__detail"><span className="client-card__label">Teléfono:</span> <strong>{cliente.telefono}</strong></p>
      <p className="client-card__detail"><span className="client-card__label">Empresa:</span> <strong>{cliente.empresa}</strong></p>
      <p className="client-card__detail"><span className="client-card__label">Sector:</span> <strong>{cliente.sector}</strong></p>
      <p className="client-card__detail"><span className="client-card__label">Ciudad:</span> <strong> {cliente.ciudad}</strong></p>
      <div className='client-card__botones'>
        <button className="btn btn--logout md" onClick={() => onDelete(cliente.id)}>Eliminar</button>
        <button className="btn btn--primary md" onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>Editar</button>

      </div>
    </article>
  )
}
