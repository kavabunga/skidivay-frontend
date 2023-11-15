import { createContext } from 'react';
import { IUserContext } from './types';

const defaultUser: IUserContext = {
  id: 0,
  email: 'Загрузка...',
  username: 'Загрузка...',
  cards: [],
};

export const UserContext = createContext<IUserContext>(defaultUser);
