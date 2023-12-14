import { Dispatch, SetStateAction, createContext } from 'react';
import { IUserContext } from '~/shared';

interface IUserContextValue {
  user: IUserContext | null;
  setUser?: Dispatch<SetStateAction<IUserContext | null>>;
}

const defaultUser = null;

export const UserContext = createContext<IUserContextValue>({
  user: defaultUser,
});
