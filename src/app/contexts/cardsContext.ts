import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardsContext } from '~/shared';

interface ICardsContextValue {
  cards: ICardsContext | undefined;
  setCards?: Dispatch<SetStateAction<ICardsContext | undefined>>;
}

const defaultCards: ICardsContext = [
  {
    id: 0,
    name: 'Загрузка...',
    // Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки
    imageCard: '',
  },
];
export const CardsContext = createContext<ICardsContextValue>({
  cards: defaultCards,
});
