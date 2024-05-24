import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('')
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {

      setUserName(user?.displayName)
      console.log(userName)
      setIsLoggedIn(!!user); // convert user in boolean
    });

    return () => unsubscribe();
  }, [auth]);

  return { isLoggedIn, userName };
};

export default useAuthStatus;
