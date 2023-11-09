import { Link, List, ListItem } from '@mui/material';
import { AuthForm } from '~/entities';
import * as z from 'zod';
import { authFormErrors } from '~/shared/lib';
import style from './style';

export const SignInForm = () => {
  const schema = z.object({
    email: z
      .string({
        required_error: authFormErrors.required,
        invalid_type_error: authFormErrors.wrongType,
      })
      .email({ message: authFormErrors.wrongEmail }),
    password: z.string({
      required_error: authFormErrors.required,
      invalid_type_error: authFormErrors.wrongType,
    }),
  });

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: ' ',
      autoComplete: 'email',
      required: true,
      placeholder: '',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      placeholder: '',
    },
  ];

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Войти', fullWidth: true }}
    >
      <List sx={style.list} color="secondary" dense disablePadding>
        <ListItem disableGutters disablePadding dense>
          <Link>Забыли пароль?</Link>
        </ListItem>
      </List>
    </AuthForm>
  );
};
