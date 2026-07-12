import React from 'react'
import { FichaPonente } from '../pages/ponente/FichaPonente'

export const PonenteRoutes = () => {
  return (
    <Routes>
      <Route path='/ponencia' element={<FichaPonente />} />
    </Routes>
  )
}
