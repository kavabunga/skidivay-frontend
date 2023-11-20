import { Dispatch, SetStateAction, createContext } from 'react';
import { ICardContext } from '~/shared';

interface ICardContextValue {
  card: ICardContext;
  setCard?: Dispatch<SetStateAction<ICardContext>>;
}

const defaultCard: ICardContext = {
  card: {
    id: 0,
    shop: {
      id: 0,
      name: 'Некий магазин',
      logo: null,
      color: '#625B71',
      validation: true,
      group: [
        {
          id: 0,
          name: 'другое',
        },
      ],
    },
    name: 'Загрузка...',
    pub_date: '01-01-2030',
    // Или ссылка на картинку заглушку (уточнить у дизайнеров), или просто фоновая заливка на время загрузки
    image: null,
    card_number: '1234567890',
    barcode_number: '123456789012',
    encoding_type: 'code128',
    usage_counter: 5,
  },
  owner: true,
  favourite: true,
};

export const CardContext = createContext<ICardContextValue>({
  card: defaultCard,
});
