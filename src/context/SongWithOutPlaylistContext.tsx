// context/CategoryServiceContext.js
import React, { createContext, useContext } from "react";
import { SongWithOutPlaylistService } from "../primary/songWithOutPlaylist/index";

type SongWithOutPlaylistContextType = {
  songWithOutPlaylistService: SongWithOutPlaylistService;
};

export const SongWithOutPlaylistServiceContext = createContext<
  SongWithOutPlaylistContextType | undefined
>(undefined);

export const SongWithOutPlaylistServiceProvider: React.FC<{
  songWithOutPlaylistService: SongWithOutPlaylistService;
}> = ({ children, songWithOutPlaylistService }) => {
  return (
    <SongWithOutPlaylistServiceContext.Provider
      value={{ songWithOutPlaylistService }}>
      {children}
    </SongWithOutPlaylistServiceContext.Provider>
  );
};

export const useSongWithOutPlaylistService = (): SongWithOutPlaylistService => {
  const context = useContext(SongWithOutPlaylistServiceContext);
  if (!context)
    throw new Error(
      "useCategoryService must be used within a SongServiceProvider",
    );
  return context.songWithOutPlaylistService;
};
