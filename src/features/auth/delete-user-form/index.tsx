import { FC } from 'react';
import { AuthForm } from '~/features';
import { IDeleteUserRequest, validationSchemes } from '~/shared';
import * as z from 'zod';

export const DeleteUserForm: FC<{
  handleSubmit(data: IDeleteUserRequest): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z.object({
    password: validationSchemes.password_old,
  });

  const fields = [
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    return handleSubmit({
      current_password: data.password,
    });
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Удалить', fullWidth: true }}
      submit={submit}
    />
  );
};
