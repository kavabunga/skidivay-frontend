import { createContext } from 'react';
import { ICardsContext } from '~/shared';

const defaultCards: ICardsContext = [
  {
    id: 0,
    name: 'Загрузка...',
    // Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки
    imageCard: '',
  },
];
export const CardsContext = createContext<ICardsContext>(defaultCards);
