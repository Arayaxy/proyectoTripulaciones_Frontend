import { createContext, useContext, useState, useEffect } from "react";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { useFetch } from "../hooks/useFetch";
import { checkCookieExists } from "../utils/utils";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const hasCookie = checkCookieExists("is_logged_in");
  const verifyUrl = hasCookie ? `${API_URL}/api/v1/auth/verify` : null;

  const {
    data: verifyData,
    loading: fetchLoading,
    error: fetchError,
    setError,
    setLoading
  } = useFetch(verifyUrl, "GET");

  useEffect(() => {
    if (verifyData && verifyData.user) {
      setUser(verifyData.user);
    }
  }, [verifyData]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    setLoading(true);

    try {

      await signOut(auth);

      await fetch(`${API_URL}/api/v1/auth/logout`, {
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

  const finalLoading = hasCookie ? fetchLoading : false;

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
