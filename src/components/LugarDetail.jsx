import { useNavigate } from 'react-router'

export const LugarDetail = ({ evento }) => {
  const navigate = useNavigate()

  return (
    <article className="detail_card">
      <p className="detail_card_lugar">
        <span className="detail_card_label">Lugar:</span>{' '}
        <strong>{evento?.lugarConfirmado}</strong>
      </p>
      <h2 className="detail_card_estado">{evento?.estado}</h2>
      <p className="detail_card_nota">{evento?.nota}</p>
      <div>
        <button className="btn_lugar" onClick={() => evento?.id && navigate(`/detalle/${evento.id}?seccion=lugar`)}>
          Ir a Lugar
        </button>
      </div>
    </article>
  )
}
