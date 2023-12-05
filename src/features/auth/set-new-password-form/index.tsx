import { FC } from 'react';
import { AuthForm } from '..';
import { authFormErrors } from '~/shared';
import * as z from 'zod';

export const SetNewPasswordForm: FC<{
  handleSubmit(newPassword: string): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z
    .object({
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
      passwordRepeat: z
        .string({
          required_error: authFormErrors.requiredPassword,
        })
        .min(1, { message: authFormErrors.requiredPassword }),
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
