import { FC } from 'react';
import { AuthForm } from '~/features';
import { authFormErrors, IDeleteUserRequest } from '~/shared';
import * as z from 'zod';

export const DeleteUserForm: FC<{
  handleSubmit(data: IDeleteUserRequest): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z.object({
    password: z
      .string({
        required_error: authFormErrors.requiredPassword,
      })
      .min(1, { message: authFormErrors.requiredPassword })
      .min(8, { message: authFormErrors.wrongPasswordCreated })
      .regex(
        /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d\s!@#$%^&*()[\]\-_+=<>?]{1,}$/,
        {
          message: authFormErrors.wrongPasswordCreated,
        }
      ),
  });

  const fields = [
    {
      name: 'currentPassword',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    console.log('здесь');
    return handleSubmit({
      current_password: data.currentPassword,
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
