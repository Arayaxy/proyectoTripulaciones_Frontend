
import { Route, Routes } from 'react-router';
import { RequireAdmin } from './components/RequireAdmin';
import { AuthContextProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import './App.css';

export const App = () => {
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
};
