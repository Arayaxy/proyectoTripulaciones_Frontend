import React from 'react';
import './_clientCard.scss';
import { useNavigate } from 'react-router'

export const ClientCard = ({ cliente, onDelete }) => {
  const navigate = useNavigate()

  return (
    <article className="client-card">
      <h2 className="client-card__name">{cliente.cliente}</h2>
      <p className="client-card__detail"><span className="client-card__label">Email:</span> {cliente.email}</p>
      <p className="client-card__detail"><span className="client-card__label">Teléfono:</span> {cliente.telefono}</p>
      <p className="client-card__detail"><span className="client-card__label">Empresa:</span> {cliente.empresa}</p>
      <p className="client-card__detail"><span className="client-card__label">Sector:</span> {cliente.sector}</p>
      <p className="client-card__detail"><span className="client-card__label">Ciudad:</span> {cliente.ciudad}</p>
      <button className="btn btn--outline btn--sm" onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>Editar</button>
      <button className="btn btn--outline btn--sm" onClick={() => onDelete(cliente.id)}>Eliminar</button>
    </article>
  )
}
