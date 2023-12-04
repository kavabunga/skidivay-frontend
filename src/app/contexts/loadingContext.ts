import { Dispatch, SetStateAction, createContext } from 'react';

interface ILoadingContextValue {
  isLoading: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<ILoadingContextValue>({
  isLoading: false,
  setIsLoading: () => {},
});
