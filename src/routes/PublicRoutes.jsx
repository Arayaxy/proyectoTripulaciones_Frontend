import React from 'react'
import { Routes, Route } from 'react-router'
import { Login } from '../pages/auth/Login'

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}
