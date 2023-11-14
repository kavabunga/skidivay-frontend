import { FC } from 'react';
import { Input, InputType } from '~/shared/ui';
import { InputPassword } from '~/entities';

export const InputSelector: FC<InputType> = (input) => {
  let inputComponent;
  switch (input.type) {
    case 'password':
      {
        inputComponent = <InputPassword {...input} />;
      }
      break;
    default:
      inputComponent = <Input {...input} />;
  }

  return inputComponent;
};
