import { createContext } from 'react';
import { IShopListContext } from '~/shared';

const defaultShopList: IShopListContext = [
  {
    name: 'Загрузка...',
    id: 0,
    logo: null,
  },
];

export const ShopListContext = createContext<IShopListContext>(defaultShopList);
