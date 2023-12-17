import { create } from 'zustand';
import { IMessageContext } from '~/shared';
import { ApiMessageTypes } from '../enums';

interface IuseMessages {
  messages: IMessageContext[];
  addMessage: (message: IMessageContext) => void;
  addErrorMessage: (message: string) => void;
  addInfoMessage: (message: string) => void;
  addSuccessMessage: (message: string) => void;
  setLastShown: () => void;
  clearMessages: () => void;
}

export const useMessages = create<IuseMessages>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  addErrorMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.error };
      return { messages: [...state.messages, newMessage] };
    }),
  addInfoMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.info };
      return { messages: [...state.messages, newMessage] };
    }),
  addSuccessMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.success };
      return { messages: [...state.messages, newMessage] };
    }),
  setLastShown: () =>
    set((state) => {
      const newMessages = state.messages;
      newMessages[0].isShown = true;
      return { messages: newMessages };
    }),
  clearMessages: () => set(() => ({ messages: [] })),
}));
