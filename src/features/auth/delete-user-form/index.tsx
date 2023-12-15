import { FC } from 'react';
import { AuthForm } from '~/features';
import {
  FieldType,
  IBasicField,
  IDeleteUserRequest,
  validationSchemes,
} from '~/shared';
import * as z from 'zod';

export const DeleteUserForm: FC<{
  handleSubmit(data: IDeleteUserRequest): Promise<void>;
}> = ({ handleSubmit }) => {
  const schema = z.object({
    current_password: validationSchemes.password_old_not_required,
  });

  const fields: FieldType[] = [
    {
      name: 'current_password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: '',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: IBasicField) => {
    return handleSubmit({
      current_password:
        typeof data.current_password === 'string' ? data.current_password : '',
    });
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Подтвердить', fullWidth: true }}
      submit={submit}
    />
  );
};
