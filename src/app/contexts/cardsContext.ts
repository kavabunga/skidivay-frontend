import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardsContext } from '~/shared';

interface ICardsContextValue {
  cards: ICardsContext | [];
  setCards?: Dispatch<SetStateAction<ICardsContext | undefined>>;
}

export const CardsContext = createContext<ICardsContextValue>({
  cards: [],
});
