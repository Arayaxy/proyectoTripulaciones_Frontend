import { Navbar } from './admin/components/Navbar';
import { AuthContextProvider } from './admin/contexts/AuthContext';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </>
  )
};
