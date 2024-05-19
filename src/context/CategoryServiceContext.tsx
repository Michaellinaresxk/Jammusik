// context/CategoryServiceContext.js
import React, { createContext, useContext } from "react";
import { CategoryService } from "../primary/Category/index";

type CategoryServiceContextType = {
  categoryService: CategoryService;
};

export const CategoryServiceContext = createContext<
  CategoryServiceContextType | undefined
>(undefined);

export const CategoryServiceProvider: React.FC<{
  categoryService: CategoryService;
}> = ({ children, categoryService }) => {
  return (
    <CategoryServiceContext.Provider value={{ categoryService }}>
      {children}
    </CategoryServiceContext.Provider>
  );
};

export const useCategoryService = (): CategoryService => {
  const context = useContext(CategoryServiceContext);
  if (!context)
    throw new Error(
      "useCategoryService must be used within a CategoryServiceProvider",
    );
  return context.categoryService;
};
