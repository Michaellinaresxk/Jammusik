import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  const [userName, setUsername] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
      setUsername(user.displayName);
      setUid(user?.uid);
    });
    return () => unsubscribe();
  }, [auth]);

  return { isLoggedIn, userName, uid };
};

export default useAuthStatus;
