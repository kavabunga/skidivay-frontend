import { create } from 'zustand';

interface IuseLoading {
  isLoading: boolean;
  loading: () => void;
  loaded: () => void;
}

export const useLoading = create<IuseLoading>()((set) => ({
  isLoading: true,
  loading: () => set(() => ({ isLoading: true })),
  loaded: () => set(() => ({ isLoading: false })),
}));
