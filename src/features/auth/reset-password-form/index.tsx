import { FC } from 'react';
import * as z from 'zod';
import {
  FieldType,
  IBasicField,
  validationLengths,
  validationSchemes,
} from '~/shared';
import { AuthForm, requestResetPassword } from '..';

interface IResetPasswordForm {
  handleSetEmail: (data: string) => void;
}

export const ResetPasswordForm: FC<IResetPasswordForm> = ({
  handleSetEmail,
}) => {
  const schema = z.object({
    email: validationSchemes.email,
    phone_last_digits: validationSchemes.phone_last_digits,
  });

  const defaultValues = {
    email: '',
    phone_last_digits: '',
  };

  const fields: FieldType[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: ' ',
      autoComplete: 'email',
      required: true,
      hideAsterisk: true,
      maxLength: validationLengths.email,
    },
    {
      name: 'phone_last_digits',
      label: 'Телефон',
      type: 'text',
      defaultHelperText: ' ',
      required: true,
      placeholder: '+7 (XXX) XXX-99-99',
      maskOptions: {
        mask: '+7 (XXX) XXX-00-00',
        unmask: false,
        overwrite: true,
      },
      hideAsterisk: true,
    },
  ];

  const submit = (data: IBasicField) => {
    const request = {
      phone_last_digits:
        typeof data.phone_last_digits === 'string'
          ? data.phone_last_digits.replace(/\D/g, '').replace(/^7/, '')
          : '',
      email: typeof data.email === 'string' ? data.email : '',
    };
    return requestResetPassword(request).then(() =>
      handleSetEmail(request.email)
    );
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Далее', fullWidth: true }}
      submit={submit}
      defaultValues={defaultValues}
    />
  );
};
