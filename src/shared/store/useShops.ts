import { create } from 'zustand';
import { IGroupListContext, IShopListContext } from '..';

interface IuseShops {
  shops: IShopListContext;
  groups: IGroupListContext;
  setShops: (shops: IShopListContext) => void;
  setGroups: (shops: IGroupListContext) => void;
  clearShops: () => void;
  clearGroups: () => void;
}

export const useShops = create<IuseShops>()((set) => ({
  shops: [],
  groups: [],
  setShops: (data) => set(() => ({ shops: data })),
  setGroups: (data) => set(() => ({ groups: data })),
  clearShops: () => set(() => ({ shops: [] })),
  clearGroups: () => set(() => ({ groups: [] })),
}));
