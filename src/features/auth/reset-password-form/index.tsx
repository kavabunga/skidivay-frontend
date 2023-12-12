import { FC } from 'react';
import * as z from 'zod';
import { FieldType, validationLengths, validationSchemes } from '~/shared';
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
      label: 'Номер телефона',
      type: 'text',
      defaultHelperText: ' ',
      required: true,
      placeholder: '+7 (XXX) XXX-99-99',
      maskOptions: {
        mask: '+7 (XXX) XXX-00-00',
      },
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    const request = {
      phone_last_digits:
        data.phone_last_digits.replace(/\D/g, '').replace(/^7/, '') || '',
      email: data.email,
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
    />
  );
};
