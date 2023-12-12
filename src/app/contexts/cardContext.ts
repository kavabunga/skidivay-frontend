import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardContext } from '~/shared';

interface ICardContextValue {
  card: ICardContext | object;
  setCard?: Dispatch<SetStateAction<ICardContext>>;
}

export const CardContext = createContext<ICardContextValue>({
  card: {},
});
