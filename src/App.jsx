import { AuthContextProvider } from './contexts/AuthContext';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/navbar/Navbar';

export const App = () => {

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <AppRoutes />
      </AuthContextProvider>
    </>
  )
};
