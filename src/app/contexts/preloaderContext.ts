import { Dispatch, SetStateAction, createContext } from 'react';
import { IPreloaderContext } from '~/shared';

interface ICardsContextValue {
  preloader: IPreloaderContext;
  setPreloader?: Dispatch<SetStateAction<IPreloaderContext>>;
}

export const PreloaderContext = createContext<ICardsContextValue>({
  preloader: {
    isOpen: false,
  },
  setPreloader: () => {},
});
