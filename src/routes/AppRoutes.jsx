import { Routes, Route, Navigate } from "react-router"
import { Login } from "../pages/auth/Login"
import { ClientePage } from "../pages/admin/ClientePage"
import { EspaciosPage } from "../pages/admin/EspaciosPage"
import { EspacioCrearPage } from "../pages/admin/EspacioCrearPage"
import { EspacioEditarPage } from "../pages/admin/EspacioEditarPage"
import { EspacioSalasPage } from "../pages/admin/EspacioSalasPage"
import { EspacioSalaCrearPage } from "../pages/admin/EspacioSalaCrearPage"
import { EspacioSalaEditarPage } from "../pages/admin/EspacioSalaEditarPage"
import { PonentesPage } from "../pages/admin/PonentesPage"
import { AgentePage } from "../pages/admin/AgentePage"
import { BusquedasPage } from "../pages/admin/BusquedasPage"
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
import { CrearClientePage } from "../pages/admin/CrearClientePage"
import { EditarClientePage } from "../pages/admin/EditarClientePage"
import { PresupuestosPage } from "../pages/admin/PresupuestoPage"
import { CrearPresupuestoPage } from "../pages/admin/CrearPresupuestoPage"
import { EditarPresupuestoPage } from "../pages/admin/EditarPresupuestoPage"
import { EditarEventoPage } from "../pages/admin/EditarEventosPage"
import { EditarPonenciaPage } from "../pages/admin/EditarPonenciaPage"
import { CrearPonenciaPage } from "../pages/admin/CrearPonenciaPage"
import { CrearPonentePage } from "../pages/admin/CrearPonentePage"
import { PublicRoute } from "../components/PublicRoute"
import { Backdoor } from "../pages/auth/Backdoor"
import { PresupuestoDetailPage } from "../pages/admin/PresupuestoDetailPage"

export const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/backdoor" element={<Backdoor />} />

      <Route path='/ponencia' element={<FichaPonente />} />

      <Route element={<RequireAdmin><Layout /></RequireAdmin>}>
        <Route path='/eventos' element={<EventosPage />} />
        <Route path='/eventos/nuevo' element={<CrearEventoPage />} />
        <Route path='/eventos/editar/:id' element={<EditarEventoPage />} />
        <Route path='/clientes' element={<ClientePage />} />
        <Route path='/clientes/nuevo' element={<CrearClientePage />} />
        <Route path='/clientes/editar/:id' element={<EditarClientePage />} />
        <Route path='/espacios' element={<EspaciosPage />} />
        <Route path='/espacios/nuevo' element={<EspacioCrearPage />} />
        <Route path='/espacios/editar/:id' element={<EspacioEditarPage />} />
        <Route path='/espacios/:id/salas' element={<EspacioSalasPage />} />
        <Route path='/espacios/:id/salas/nuevo' element={<EspacioSalaCrearPage />} />
        <Route path='/espacios/:id/salas/editar/:salaId' element={<EspacioSalaEditarPage />} />
        <Route path='/ponentes' element={<PonentesPage />} />
        <Route path='/ponentes/nuevo' element={<CrearPonentePage />} />
        <Route path='/consultas' element={<AgentePage />} />
        <Route path='/concursos' element={<ConcursosPage />} />
        <Route path='/busquedas' element={<BusquedasPage />} />
        <Route path='/detalle/:eventoId/ponencias/nuevo' element={<CrearPonenciaPage />} />
        <Route path='/detalle/:eventoId/ponencias/editar/:ponenciaId' element={<EditarPonenciaPage />} />
        <Route path='/detalle/:id' element={<EventoDetailPage />} />
        <Route path='/datos' element={<DatosEventoPage />} />
        <Route path='/ponencias' element={<PonenciasPage />} />
        <Route path='/presupuestos' element={<PresupuestosPage />} />
        <Route path='/presupuestos/crear' element={<CrearPresupuestoPage />} />
        <Route path='/presupuestos/editar/:id' element={<EditarPresupuestoPage />} />
        <Route path='/presupuestos/:id' element={<PresupuestoDetailPage />} />
        <Route path='/lugar' element={<LugarPage />} />
        <Route path='/presupuesto' element={<PresupuestosPage />} />
      </Route>
      {/* <Route path='/*' element={<Navigate to='/NotFound' />} /> */}
    </Routes>
  )
}
