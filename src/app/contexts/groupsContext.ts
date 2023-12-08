import { Dispatch, SetStateAction, createContext } from 'react';
import { IGroupListContext } from '~/shared';

interface IGroupListContextValue {
  groups: IGroupListContext;
  setGroups?: Dispatch<SetStateAction<IGroupListContext>>;
}

export const GroupListContext = createContext<IGroupListContextValue>({
  groups: [],
  setGroups: () => {},
});
