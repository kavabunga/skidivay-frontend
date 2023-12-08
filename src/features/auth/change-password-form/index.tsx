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
        .min(1, { message: authFormErrors.requiredPassword }),
      new_password: z
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
      new_password_repeat: z
        .string({
          required_error: authFormErrors.requiredPassword,
        })
        .min(1, { message: authFormErrors.requiredPassword }),
    })
    .superRefine(({ new_password_repeat, new_password }, ctx) => {
      if (new_password_repeat !== new_password) {
        ctx.addIssue({
          code: 'custom',
          message: authFormErrors.wrongPasswordRepeat,
          path: ['new_password_repeat'],
        });
      }
    });

  const fields = [
    {
      name: 'current_password',
      label: 'Старый пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'new_password',
      label: 'Новый пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'new_password_repeat',
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
      new_password: data.new_password,
      current_password: data.current_password,
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
