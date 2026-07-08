import { Route, Routes } from "react-router"
import { Login } from "../pages/auth/Login"
import { RequireAdmin } from "../admin/components/RequireAdmin"
import { Home } from "../admin/pages/Home"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<RequireAdmin> <Home /> </RequireAdmin>} />
    </Routes>
  )
}
