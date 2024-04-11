import React, { createContext } from "react";
import { UserService } from "../primary/user/useCases";
// import { UserResource } from "../services/userService";

export const UserServiceContext = createContext(null);

export const UserServiceProvider = ({ children }: any) => {
  // const userService = new UserService(userResource);
  return (
    // <UserServiceContext.Provider value={userSerService}>
    //   {children}
    // </UserServiceContext.Provider>
  );
};
