import { AuthContextProvider } from './contexts/AuthContext';
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
