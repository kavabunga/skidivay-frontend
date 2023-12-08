import { FC } from 'react';
import { AuthForm } from '..';
import { authFormErrors, IChangePasswordRequest } from '~/shared';
import * as z from 'zod';

export const ChangePasswordForm: FC<{
  handleSubmit(data: IChangePasswordRequest): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z
    .object({
      currentPassword: z
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
      newPassword: z
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
      newPasswordRepeat: z
        .string({
          required_error: authFormErrors.requiredPassword,
        })
        .min(1, { message: authFormErrors.requiredPassword }),
    })
    .superRefine(({ newPasswordRepeat, newPassword }, ctx) => {
      if (newPasswordRepeat !== newPassword) {
        ctx.addIssue({
          code: 'custom',
          message: authFormErrors.wrongPasswordRepeat,
          path: ['newPasswordRepeat'],
        });
      }
    });

  const fields = [
    {
      name: 'currentPassword',
      label: 'Старый пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'newPasswordRepeat',
      label: 'Подтверждение пароля',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    return handleSubmit({
      new_password: data.newPassword,
      current_password: data.currentPassword,
    });
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
