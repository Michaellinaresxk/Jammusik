import { createContext, useContext } from "react";
import { UserResource } from "../infra/user/UserResource";
import { UserService } from "../primary/user/useCases/index";
import { UserCaller } from "../infra/user/UserCaller";
import { db } from "../infra/api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const userCaller = new UserCaller(collection, getDocs, db);
const userResource = new UserResource(userCaller);
const userService = new UserService(userResource);

// Create the Context
const UserServiceContext = createContext<UserService>(userService);

// Context Provider Component
export const UserServiceProvider = ({ children }: any) => {
  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
};

export const useUserService = () => useContext(UserServiceContext);
