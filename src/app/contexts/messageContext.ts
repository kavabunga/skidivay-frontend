import { Dispatch, SetStateAction, createContext } from 'react';
import { IMessageContext } from '~/shared';
import { Type, Target } from '~/shared/enums';

interface IMessageContextValue {
  message: IMessageContext;
  setMessage?: Dispatch<SetStateAction<IMessageContext>>;
}

const defaultMessage: IMessageContext = {
  message: '',
  type: Type.info,
  target: Target.snack,
};

export const MessageContext = createContext<IMessageContextValue>({
  message: defaultMessage,
});
