import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  const [userName, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
      setUsername(user.displayName);
    });

    return () => unsubscribe();
  }, [auth]);

  return { isLoggedIn, userName };
};

export default useAuthStatus;
