import { createContext, useContext, useState, useEffect } from "react";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { useFetch } from "../hooks/useFetch";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const verifyUrl = `${API_URL}/auth/verify`;

  const {
    data: verifyData,
    loading: fetchLoading,
    error: fetchError,
    setError,
    setLoading
  } = useFetch(verifyUrl, "GET");

  useEffect(() => {
    if (verifyData) {
      setUser(verifyData.user);
    }
    if (verifyData || fetchError) {
      setIsVerifying(false);
    }
  }, [verifyData, fetchError]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    setLoading(true);

    try {

      await signOut(auth);

      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const finalLoading = fetchLoading || isVerifying;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading: finalLoading,
        setLoading,
        error: fetchError,
        setError,
        googleSignIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
