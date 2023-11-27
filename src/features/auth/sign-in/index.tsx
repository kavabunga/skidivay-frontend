import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, List, ListItem } from '@mui/material';
import * as z from 'zod';
import { CardsContext, UserContext } from '~/app';
import { getUser } from '~/features';
import { ISignInRequest, api, authFormErrors } from '~/shared';
import { AuthForm, signIn } from '..';
import { listStyle, linkStyle } from './style';

export const SignInForm = () => {
  const { setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string({
        required_error: authFormErrors.required,
      })
      .email({ message: authFormErrors.wrongEmail }),
    password: z.string({
      required_error: authFormErrors.required,
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
      hideAsterisk: true,
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'current-password',
      required: true,
      hideAsterisk: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    const request: ISignInRequest = {
      email: data.email || '',
      password: data.password || '',
    };
    signIn(request)
      .then(() => {
        const userPromise = getUser().then((res) => setUser && setUser(res));
        const cardsPromise = api
          .getCards()
          .then((res) => setCards && setCards(res));
        return Promise.all([userPromise, cardsPromise]);
      })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Войти', fullWidth: true }}
      submit={submit}
    >
      <List sx={{ ...listStyle }} color="secondary" dense disablePadding>
        <ListItem disableGutters disablePadding dense>
          <Link sx={{ ...linkStyle }}>Забыли пароль?</Link>
        </ListItem>
      </List>
    </AuthForm>
  );
};
