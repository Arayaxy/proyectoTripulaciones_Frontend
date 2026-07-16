import { HeaderPonente } from './HeaderPonente'
import { Footer } from './Footer'
import { Outlet } from 'react-router'

export const LayoutPonente = () => {
  return (
    <>
      <HeaderPonente />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
