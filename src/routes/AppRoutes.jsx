import { PonenteRoutes } from "./PonenteRoutes"
import { AdminRoutes } from "./AdminRoutes"
import { PublicRoutes } from "./PublicRoutes"


export const AppRoutes = () => {
  return (
    <>
      {/* {!user && <PublicRoutes />}
      {user && role === 'admin' && <AdminRoutes />}
      {user && role === 'ponente' && <PonenteRoutes />} */}
      <PublicRoutes />
      <AdminRoutes />

    </>

  )
}
