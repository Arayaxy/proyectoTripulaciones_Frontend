import { createContext, useContext, useState, useEffect } from "react";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/v1/auth/verify`, {
          method: "GET",
          credentials: "include"
        });

        if (resp.ok) {
          const data = await resp.json();
          setUser(data.user);
        }
      } catch (err) {
        console.log('No Session Encontrada');
        setError(err)

      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      await fetch(`${API_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
