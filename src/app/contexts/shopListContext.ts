import { Dispatch, SetStateAction, createContext } from 'react';
import { IShopListContext } from '~/shared';

interface IShopListContextValue {
  shops: IShopListContext | undefined;
  setShops?: Dispatch<SetStateAction<IShopListContext | undefined>>;
}

export const ShopListContext = createContext<IShopListContextValue>({
  shops: [],
});
