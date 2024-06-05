import React, { createContext, useContext } from "react";
import { SongDetailsService } from "../primary/songDetails/index";

type SongDetailsServiceContextType = {
  songDetailsService: SongDetailsService;
};

export const SongDetailsServiceContext = createContext<
  SongDetailsServiceContextType | undefined
>(undefined);

export const SongDetailsServiceProvider: React.FC<{
  songDetailsService: SongDetailsService;
}> = ({ children, songDetailsService }) => {
  return (
    <SongDetailsServiceContext.Provider value={{ songDetailsService }}>
      {children}
    </SongDetailsServiceContext.Provider>
  );
};

export const useSongDetailsService = (): SongDetailsService => {
  const context = useContext(SongDetailsServiceContext);
  if (!context)
    throw new Error(
      "useCategoryService must be used within a SongServiceProvider",
    );
  return context.songDetailsService;
};
