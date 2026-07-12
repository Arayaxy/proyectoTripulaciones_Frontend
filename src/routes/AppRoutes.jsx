import { Routes, Route, Navigate } from "react-router"
import { Login } from "../pages/auth/Login"
import { EventosPage } from "../pages/admin/EventosPage"
import { ClientePage } from "../pages/admin/clientePage"
import { EspaciosPage } from "../pages/admin/EspaciosPage"
import { PonentesPage } from "../pages/admin/PonentesPage"
import { AgentePage } from "../pages/admin/agentePage"
import { ConcursosPage } from "../pages/admin/ConcursosPage"
import { RequireAdmin } from "../components/RequireAdmin"
import { FichaPonente } from "../pages/ponente/FichaPonente"
import { DatosEventoPage } from "../pages/admin/DatosEventoPage"
import { PonenciasPage } from "../pages/admin/PonenciasPage"
import { LugarPage } from "../pages/admin/LugarPage"
import { EventoDetailPage } from "../pages/admin/EventoDetailPage"

export const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/detalle' element={<RequireAdmin><EventoDetailPage /></RequireAdmin>} />
      <Route path='/datos' element={<RequireAdmin><DatosEventoPage /></RequireAdmin>} />
      <Route path='/ponencias' element={<RequireAdmin><PonenciasPage /></RequireAdmin>} />
      <Route path='/lugar' element={<RequireAdmin><LugarPage /></RequireAdmin>} />
      {/* <Route path='/servicios' element={<RequireAdmin><ServiciosPage /></RequireAdmin>} />
      <Route path='/presupuestos' element={<RequireAdmin><PrespuestosPage /></RequireAdmin>} /> */}

      <Route path='/eventos' element={<RequireAdmin><EventosPage /></RequireAdmin>} />
      <Route path='/clientes' element={<RequireAdmin><ClientePage /></RequireAdmin>} />
      <Route path='/espacios' element={<RequireAdmin><EspaciosPage /></RequireAdmin>} />
      <Route path='/ponentes' element={<RequireAdmin><PonentesPage /></RequireAdmin>} />
      <Route path='/consultas' element={<RequireAdmin><AgentePage /></RequireAdmin>} />
      <Route path='/concursos' element={<RequireAdmin><ConcursosPage /></RequireAdmin>} />
      <Route path='/ponencia' element={<FichaPonente />} />
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<Navigate to='/eventos' />} />
    </Routes>


  )
}
