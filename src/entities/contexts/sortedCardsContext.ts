import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardsContext } from '~/shared';

interface ICardsContextValue {
  cards: ICardsContext | [];
  setSortedCards?: Dispatch<SetStateAction<ICardsContext>>;
}

export const SortedCardsContext = createContext<ICardsContextValue>({
  cards: [],
});
