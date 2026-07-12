import React from 'react'
import { EventosPage } from '../pages/admin/EventosPage'
import { ClientePage } from '../pages/admin/clientePage'
import { EspaciosPage } from '../pages/admin/EspaciosPage'
import { PonentesPage } from '../pages/admin/PonentesPage'
import { AgentePage } from '../pages/admin/agentePage'
import { ConcursosPage } from '../pages/admin/ConcursosPage'
import { Routes, Route, Navigate } from 'react-router'
import { Navbar } from '../components/Navbar'

export const AdminRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/eventos' element={<EventosPage />} />
        <Route path='/clientes' element={<ClientePage />} />
        <Route path='/espacios' element={<EspaciosPage />} />
        <Route path='/ponentes' element={<PonentesPage />} />
        <Route path='/consultas' element={<AgentePage />} />
        <Route path='/concursos' element={<ConcursosPage />} />
        <Route path='/*' element={<Navigate to='/eventos' />} />
      </Routes>
    </>
  )
}
