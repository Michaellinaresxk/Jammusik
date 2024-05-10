import React, { createContext, useContext } from "react";
import { UserInfoService } from "../primary/userInfo/index";

type UserInfoServiceContextType = {
  userInfoService: UserInfoService;
};

export const UserInfoServiceContext = createContext<
  UserInfoServiceContextType | undefined
>(undefined);

// Context Provider Component
export const UserInfoServiceProvider: React.FC<{
  userInfoService: UserInfoService;
}> = ({ children, userInfoService }) => {
  return (
    <UserInfoServiceContext.Provider
      value={{ userInfoService: userInfoService }}>
      {children}
    </UserInfoServiceContext.Provider>
  );
};

// Custom hook to use the user service context
export const useUserInfoService = (): UserInfoService => {
  const context = useContext(UserInfoServiceContext);
  if (!context)
    throw new Error("useUserService must be used within a UserServiceProvider");
  return context.userInfoService;
};
