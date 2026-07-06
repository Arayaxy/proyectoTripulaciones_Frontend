
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { RequireAdmin } from './components/RequireAdmin'
import { AuthContextProvider } from './context/AuthContext'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

function App() {


  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<RequireAdmin> <Home /> </RequireAdmin>} />
        </Routes>
      </AuthContextProvider>
    </>

  )
}

export default App
