import { createContext } from 'react';
import { ICardContext } from './types';

const defaultCard: ICardContext = {
  name: 'Загрузка...',
  imageCard:
    'Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки',
};

export const CardContext = createContext<ICardContext>(defaultCard);
