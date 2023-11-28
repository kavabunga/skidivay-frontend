import { Dispatch, SetStateAction, createContext } from 'react';
import { IMessageContext } from '~/shared';
import { ApiMessageTypes, ApiMessageTargets } from '~/shared/enums';

interface IMessageContextValue {
  message: IMessageContext;
  setMessage?: Dispatch<SetStateAction<IMessageContext>>;
}

const defaultMessage: IMessageContext = {
  message: '',
  type: ApiMessageTypes.info,
  target: ApiMessageTargets.snack,
};

export const MessageContext = createContext<IMessageContextValue>({
  message: defaultMessage,
});
