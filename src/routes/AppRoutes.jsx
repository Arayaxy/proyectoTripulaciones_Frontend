import { Route, Routes } from "react-router"
import { Login } from "../pages/auth/Login"
import { RequireAdmin } from "../admin/components/RequireAdmin"
import { Home } from "../admin/pages/Home"
import { LoginPage } from "../pages/LoginPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/home' element={<RequireAdmin> <Home /> </RequireAdmin>} />
    </Routes>
  )
}
