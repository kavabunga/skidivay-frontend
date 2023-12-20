import { FC } from 'react';
import { AuthForm } from '..';
import {
  authFormErrors,
  FieldType,
  IBasicField,
  IChangePasswordRequest,
  validationLengths,
  validationSchemes,
} from '~/shared';
import * as z from 'zod';

export const ChangePasswordForm: FC<{
  handleSubmit(data: IChangePasswordRequest): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z
    .object({
      current_password: validationSchemes.password_old,
      new_password: validationSchemes.password_new,
      new_password_repeat: validationSchemes.password_repeat,
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

  const defaultValues = {
    current_password: '',
    new_password: '',
    new_password_repeat: '',
  };

  const fields: FieldType[] = [
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
      maxLength: validationLengths.password_new,
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

  const submit = (data: IBasicField) => {
    return handleSubmit({
      new_password:
        typeof data.new_password === 'string' ? data.new_password : '',
      current_password:
        typeof data.current_password === 'string' ? data.current_password : '',
    });
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Сохранить', fullWidth: true }}
      submit={submit}
      defaultValues={defaultValues}
    />
  );
};
