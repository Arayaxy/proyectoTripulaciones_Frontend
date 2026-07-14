import { Routes, Route, Navigate } from "react-router"
import { Login } from "../pages/auth/Login"
import { ClientePage } from "../pages/admin/ClientePage"
import { EspaciosPage } from "../pages/admin/EspaciosPage"
import { PonentesPage } from "../pages/admin/PonentesPage"
import { AgentePage } from "../pages/admin/AgentePage"
import { ConcursosPage } from "../pages/admin/ConcursosPage"
import { RequireAdmin } from "../components/RequireAdmin"
import { FichaPonente } from "../pages/ponente/FichaPonente"
import { DatosEventoPage } from "../pages/admin/DatosEventoPage"
import { PonenciasPage } from "../pages/admin/PonenciasPage"
import { LugarPage } from "../pages/admin/LugarPage"
import { EventoDetailPage } from "../pages/admin/EventoDetailPage"
import { Layout } from "../components/Layout"
import { CrearEventoPage } from "../pages/admin/CrearEventoPage"
import { EventosPage } from "../pages/admin/EventosPage"
import { PresupuestosPage } from "../pages/admin/PresupuestoPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/ponencia' element={<FichaPonente />} />

      <Route element={<RequireAdmin><Layout /></RequireAdmin>}>
        <Route path='/eventos' element={<EventosPage />} />
        <Route path='/crear' element={<CrearEventoPage />} />
        <Route path='/clientes' element={<ClientePage />} />
        <Route path='/clientes/nuevo' element={<CrearClientePage />} />
        <Route path='/clientes/editar/:id' element={<EditarClientePage />} />
        <Route path='/espacios' element={<EspaciosPage />} />
        <Route path='/ponentes' element={<PonentesPage />} />
        <Route path='/consultas' element={<AgentePage />} />
        <Route path='/concursos' element={<ConcursosPage />} />
        <Route path='/detalle' element={<EventoDetailPage />} />
        <Route path='/datos' element={<DatosEventoPage />} />
        <Route path='/ponencias' element={<PonenciasPage />} />
        <Route path='/presupuestos' element={<PresupuestosPage />} />
        <Route path='/lugar' element={<LugarPage />} />
      </Route>
      {/* <Route path='/*' element={<Navigate to='/NotFound' />} /> */}
    </Routes>
  )
}
