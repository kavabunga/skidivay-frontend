import { Dispatch, SetStateAction, createContext } from 'react';
import { IShopListContext } from '~/shared';

interface IShopListContextValue {
  shops: IShopListContext | [];
  setShops?: Dispatch<SetStateAction<IShopListContext>>;
}

export const ShopListContext = createContext<IShopListContextValue>({
  shops: [],
});
