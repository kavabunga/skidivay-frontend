import { FC } from 'react';
import { AuthForm } from '..';
import { IChangeEmailRequest, authFormErrors } from '~/shared';
import * as z from 'zod';

export const ChangeEmailForm: FC<{
  oldEmail: string;
  handleSubmit: (arg0: IChangeEmailRequest) => void;
}> = ({ oldEmail, handleSubmit }) => {
  const schema = z.object({
    email: z
      .string({
        required_error: authFormErrors.required,
      })
      .max(30)
      .email({ message: authFormErrors.wrongEmail }),
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
  ];

  const submit = (data: { [key: string]: string }) => {
    const request: IChangeEmailRequest = {
      email: data.email || '',
    };
    return Promise.resolve(request).then(handleSubmit);
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Теперь верно', fullWidth: true }}
      submit={submit}
      defaultValues={{ email: oldEmail }}
    />
  );
};
