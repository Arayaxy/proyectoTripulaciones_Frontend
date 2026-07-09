import React from 'react'
import './_login.scss';

export const Login = () => {
  return (
    <div className="login__body">
      <form className="login__form">
        <input type="email" className="login__input" placeholder="Usuario" />
        <input type="password" className="login__input" placeholder="Contraseña" />
        <button type="submit" className="login__submit">Aceptar</button>
      </form>

      <button type="button" className="login__forgot">
        ¿Olvidaste la contraseña?
      </button>

      </div>
  )
}