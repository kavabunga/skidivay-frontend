import { createContext } from 'react';
import { IUserContext } from '~/shared';

const defaultUser: IUserContext = {
  id: 0,
  email: 'Загрузка...',
  name: 'Загрузка...',
  cards: [],
};

export const UserContext = createContext<IUserContext>(defaultUser);
