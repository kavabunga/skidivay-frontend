import { Dispatch, SetStateAction, createContext } from 'react';
import { IShopListContext } from '~/shared';

interface IShopListContextValue {
  shops: IShopListContext | undefined;
  setShops?: Dispatch<SetStateAction<IShopListContext | undefined>>;
}

const defaultShopList: IShopListContext = [
  {
    name: 'Загрузка...',
    id: 0,
    logo: null,
  },
];

export const ShopListContext = createContext<IShopListContextValue>({
  shops: defaultShopList,
});
