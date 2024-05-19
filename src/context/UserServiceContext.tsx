import React, { createContext, useContext } from "react";
import { UserService } from "../primary/user/useCases/index";

type UserServiceContextType = {
  userService: UserService;
};

export const UserServiceContext = createContext<
  UserServiceContextType | undefined
>(undefined);

// Context Provider Component
export const UserServiceProvider: React.FC<{ userService: UserService }> = ({
  children,
  userService,
}) => {
  return (
    <UserServiceContext.Provider value={{ userService }}>
      {children}
    </UserServiceContext.Provider>
  );
};

// Custom hook to use the user service context
export const useUserService = (): UserService => {
  const context = useContext(UserServiceContext);
  if (!context)
    throw new Error("useUserService must be used within a UserServiceProvider");
  return context.userService;
};
