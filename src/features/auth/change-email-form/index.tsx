import { FC } from 'react';
import { AuthForm } from '..';
import {
  FieldType,
  IBasicField,
  IChangeEmailRequest,
  validationLengths,
  validationSchemes,
} from '~/shared';
import * as z from 'zod';

export const ChangeEmailForm: FC<{
  oldEmail: string;
  handleSubmit: (arg0: IChangeEmailRequest) => Promise<void>;
}> = ({ oldEmail, handleSubmit }) => {
  const schema = z.object({
    email: validationSchemes.email,
  });

  const fields: FieldType[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: ' ',
      autoComplete: 'email',
      required: true,
      hideAsterisk: true,
      maxLength: validationLengths.email,
      preValidate: true,
    },
  ];

  const submit = (data: IBasicField) => {
    const request: IChangeEmailRequest = {
      email: typeof data.email === 'string' ? data.email : '',
    };
    return handleSubmit(request);
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Подтвердить', fullWidth: true }}
      submit={submit}
      defaultValues={{ email: oldEmail }}
    />
  );
};
