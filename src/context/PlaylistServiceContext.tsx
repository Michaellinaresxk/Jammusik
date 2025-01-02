import React, {createContext, useContext} from 'react';
import {PlaylistService} from '../primary/Playlist/useCases/index';

type PlaylistServiceContextType = {
  playlistService: PlaylistService;
};

export const PlaylistServiceContext = createContext<
  PlaylistServiceContextType | undefined
>(undefined);

export const PlaylistServiceProvider: React.FC<{
  playlistService: PlaylistService;
}> = ({children, playlistService}) => {
  return (
    <PlaylistServiceContext.Provider value={{playlistService}}>
      {children}
    </PlaylistServiceContext.Provider>
  );
};

export const usePlaylistService = (): PlaylistService => {
  const context = useContext(PlaylistServiceContext);
  if (!context)
    throw new Error(
      'useCategoryService must be used within a CategoryServiceProvider',
    );
  return context.playlistService;
};
