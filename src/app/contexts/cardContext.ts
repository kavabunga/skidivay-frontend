import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardContext } from '~/shared';

interface ICardContextValue {
  card: ICardContext | undefined;
  setCard?: Dispatch<SetStateAction<ICardContext | undefined>>;
}

const defaultCard: ICardContext = {
  id: 0,
  name: 'Загрузка...',
  // Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки
  imageCard: '',
};

export const CardContext = createContext<ICardContextValue>({
  card: defaultCard,
});
