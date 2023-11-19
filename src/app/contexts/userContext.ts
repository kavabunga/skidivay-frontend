import { Dispatch, SetStateAction, createContext } from 'react';
import { IUserContext } from '~/shared';

interface IUserContextValue {
  user: IUserContext | undefined;
  setUser?: Dispatch<SetStateAction<IUserContext | undefined>>;
}

const defaultUser: IUserContext = {
  id: 0,
  email: 'Загрузка...',
  name: 'Загрузка...',
  username: 'Загрузка...',
  cards: [],
};

export const UserContext = createContext<IUserContextValue>({
  user: defaultUser,
});
