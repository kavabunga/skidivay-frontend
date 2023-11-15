import { createContext } from 'react';
import { IshopListContext } from './types';

const defaultShopList: IshopListContext = {
  name: 'Загрузка...',
  id: 0,
  logo: null,
};

export const ShopListContext = createContext<IshopListContext>(defaultShopList);
