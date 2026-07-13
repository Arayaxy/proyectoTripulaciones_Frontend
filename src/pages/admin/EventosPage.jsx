import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

export const EventosPage = () => {
  const { logOut, user, loading, error } = useAuth();

  return (
    <h1>

      EventosPage welcome, {user?.name}
    </h1>
  )
}
