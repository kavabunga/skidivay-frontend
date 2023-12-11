import { FC } from 'react';
import { AuthForm } from '..';
import { authFormErrors, validationSchemes } from '~/shared';
import * as z from 'zod';

export const SetNewPasswordForm: FC<{
  handleSubmit(newPassword: string): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z
    .object({
      password: validationSchemes.password_new,
      passwordRepeat: validationSchemes.password_repeat,
    })
    .superRefine(({ passwordRepeat, password }, ctx) => {
      if (passwordRepeat !== password) {
        ctx.addIssue({
          code: 'custom',
          message: authFormErrors.wrongPasswordRepeat,
          path: ['passwordRepeat'],
        });
      }
    });

  const fields = [
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'passwordRepeat',
      label: 'Повторный пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    return handleSubmit(data.password);
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Сохранить', fullWidth: true }}
      submit={submit}
    />
  );
};
