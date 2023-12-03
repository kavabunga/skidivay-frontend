import { FC } from 'react';
import * as z from 'zod';
import { authFormErrors } from '~/shared';
import { AuthForm, requestResetPassword } from '..';

interface IResetPasswordForm {
  handleSetEmail: (data: string) => void;
}

export const ResetPasswordForm: FC<IResetPasswordForm> = ({
  handleSetEmail,
}) => {
  const schema = z.object({
    email: z
      .string({
        required_error: authFormErrors.requiredEmail,
      })
      .min(1, { message: authFormErrors.requiredEmail })
      .email({ message: authFormErrors.wrongEmail }),
    phone_number: z
      .string({
        required_error: authFormErrors.requiredPhone,
      })
      .min(1, { message: authFormErrors.requiredPhone })
      .regex(/^\+7 \(XXX\) XXX-\d{2}-\d{2}$/, {
        message: authFormErrors.wrongPhone,
      }),
  });

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: ' ',
      autoComplete: 'email',
      required: true,
    },
    {
      name: 'phone_number',
      label: 'Номер телефона',
      type: 'text',
      defaultHelperText: ' ',
      required: true,
      placeholder: '+7 (XXX) XXX-99-99',
      maskOptions: {
        mask: '+7 (XXX) XXX-00-00',
      },
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    const request = {
      phone_last_digits:
        data.phone_number.replace(/\D/g, '').replace(/^7/, '') || '',
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
