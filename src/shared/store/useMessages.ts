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
    set((state) => ({ messages: [message, ...state.messages] })),
  addErrorMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.error };
      return { messages: [newMessage, ...state.messages] };
    }),
  addInfoMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.info };
      return { messages: [newMessage, ...state.messages] };
    }),
  addSuccessMessage: (text) =>
    set((state) => {
      const newMessage = { message: text, type: ApiMessageTypes.success };
      return { messages: [newMessage, ...state.messages] };
    }),
  setLastShown: () =>
    set((state) => {
      const newMessages = state.messages;
      newMessages[0].isShown = true;
      return { messages: newMessages };
    }),
  clearMessages: () => set(() => ({ messages: [] })),
}));
