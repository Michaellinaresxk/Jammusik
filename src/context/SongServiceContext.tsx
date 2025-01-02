import React, {createContext, useContext} from 'react';
import {SongService} from '../primary/song/useCases/index';

type SongServiceContextType = {
  songService: SongService;
};

export const SongServiceContext = createContext<
  SongServiceContextType | undefined
>(undefined);

export const SongServiceProvider: React.FC<{
  songService: SongService;
}> = ({children, songService}) => {
  return (
    <SongServiceContext.Provider value={{songService}}>
      {children}
    </SongServiceContext.Provider>
  );
};

export const useSongService = (): SongService => {
  const context = useContext(SongServiceContext);
  if (!context)
    throw new Error(
      'useCategoryService must be used within a SongServiceProvider',
    );
  return context.songService;
};
