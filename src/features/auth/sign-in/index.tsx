import { Link, List, ListItem } from '@mui/material';
import { AuthForm } from '~/entities';
import style from './style';

export const SignInForm = () => {
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
    <AuthForm fields={fields} button={{ label: 'Войти', isFullWidth: true }}>
      <List sx={style.list} color="secondary" dense disablePadding>
        <ListItem disableGutters disablePadding dense>
          <Link>Забыли пароль?</Link>
        </ListItem>
      </List>
    </AuthForm>
  );
};
