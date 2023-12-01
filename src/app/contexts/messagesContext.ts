import { Dispatch, SetStateAction, createContext } from 'react';
import { IMessageContext } from '~/shared';

interface IMessageContextValue {
  messages: IMessageContext[];
  setMessages: Dispatch<SetStateAction<IMessageContext[]>>;
}

export const MessagesContext = createContext<IMessageContextValue>({
  messages: [],
  setMessages: () => {},
});
