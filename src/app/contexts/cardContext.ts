import { createContext } from 'react';
import { ICardContext } from '~/shared';

const defaultCard: ICardContext = {
  id: 0,
  name: 'Загрузка...',
  // Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки
  imageCard: '',
};

export const CardContext = createContext<ICardContext>(defaultCard);
