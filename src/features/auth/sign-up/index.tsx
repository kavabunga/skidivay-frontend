import { FC, useContext } from 'react';
import * as z from 'zod';
import { AuthForm, signIn, signUp } from '..';
import {
  ISignUpRequest,
  api,
  authFormErrors,
  validationSchemes,
} from '~/shared';
import { CardsContext, UserContext } from '~/app';

export const SignUpForm: FC<{
  defaultValues?: object;
  handleShowRegistrationSuccess: () => void;
}> = ({ defaultValues, handleShowRegistrationSuccess }) => {
  const { setCards } = useContext(CardsContext);
  const { setUser } = useContext(UserContext);

  const schema = z
    .object({
      name: validationSchemes.name,
      email: validationSchemes.email,
      phone_number: validationSchemes.phone_number,
      password: validationSchemes.password_new,
      passwordRepeat: validationSchemes.password_repeat,
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
      name: 'name',
      label: 'Имя',
      type: 'text',
      defaultHelperText: 'Как к вам обращаться?',
      autoComplete: 'name',
      required: true,
      hideAsterisk: true,
    },
    {
      name: 'phone_number',
      label: 'Телефон',
      type: 'text',
      defaultHelperText: ' ',
      autoComplete: 'tel',
      required: true,
      placeholder: '+7 (999) 999-99-99',
      maskOptions: {
        mask: '+7 (000) 000-00-00',
      },
      hideAsterisk: true,
    },
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
    const request: ISignUpRequest = {
      name: data.name || '',
      email: data.email || '',
      phone_number:
        data.phone_number.replace(/\D/g, '').replace(/^7/, '') || '',
      password: data.password || '',
    };
    return signUp(request)
      .then((res) =>
        signIn({ email: request.email, password: request.password }).then(
          () => res
        )
      )
      .then((res) => {
        const userPromise = setUser && setUser(res);
        const cardsPromise = api
          .getCards()
          .then((res) => setCards && setCards(res));
        return Promise.all([userPromise, cardsPromise]);
      })
      .then(() => handleShowRegistrationSuccess());
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Далее', fullWidth: true }}
      submit={submit}
      defaultValues={defaultValues}
    />
  );
};
