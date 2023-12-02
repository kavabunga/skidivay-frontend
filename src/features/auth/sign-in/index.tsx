import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, List, ListItem } from '@mui/material';
import * as z from 'zod';
import { CardsContext, UserContext } from '~/app';
import { getUser } from '~/features';
import { ISignInRequest, api, authFormErrors } from '~/shared';
import { AuthForm, signIn } from '..';
import { listStyle, linkStyle } from './style';

//NOTE: Sign In form types affect on submit behavior
// "activation" doesn't redirect after signin
// "signIn" and default do redirect to homepage

interface ISignInForm {
  type?: 'activation' | 'signIn';
  onResetPassword?: () => void;
}

export const SignInForm: FC<ISignInForm> = ({
  type = 'signIn',
  onResetPassword,
}) => {
  const { setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string({
        required_error: authFormErrors.requiredEmail,
      })
      .min(6, { message: authFormErrors.wrongEmail })
      .max(256, { message: authFormErrors.wrongEmail })
      .email({ message: authFormErrors.wrongEmail }),
    password: z.string({
      required_error: authFormErrors.requiredPassword,
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
    return signIn(request)
      .then(() => {
        const userPromise = getUser().then((res) => setUser && setUser(res));
        const cardsPromise = api
          .getCards()
          .then((res) => setCards && setCards(res));
        return Promise.all([userPromise, cardsPromise]);
      })
      .then(() => {
        type !== 'activation' && navigate('/');
        return;
      });
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
          <Link onClick={onResetPassword} sx={{ ...linkStyle }}>
            Забыли пароль?
          </Link>
        </ListItem>
      </List>
    </AuthForm>
  );
};
