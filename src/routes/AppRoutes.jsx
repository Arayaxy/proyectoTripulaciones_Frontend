import { Route, Routes } from "react-router"
import { Login } from "../pages/auth/Login"
import { Home } from "../pages/admin/Home"
import { RequireAdmin } from "../components/RequireAdmin"
import { Navbar } from "../components/Navbar"


export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<RequireAdmin> <Home /> </RequireAdmin>} />
      </Routes>
    </>
  )
}
