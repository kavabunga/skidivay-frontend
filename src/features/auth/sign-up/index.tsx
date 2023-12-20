import { FC } from 'react';
import * as z from 'zod';
import { AuthForm, signIn, signUp } from '..';
import {
  FieldType,
  IBasicField,
  ISignUpRequest,
  api,
  authFormErrors,
  validationLengths,
  validationSchemes,
} from '~/shared';
import { useUser } from '~/shared/store/useUser';

export const SignUpForm: FC<{
  defaultValues?: { [key: string]: string };
  handleShowRegistrationSuccess: () => void;
}> = ({ defaultValues, handleShowRegistrationSuccess }) => {
  const setUser = useUser((state) => state.setUser);
  const setCards = useUser((state) => state.setCards);

  const defaults = {
    name: defaultValues?.name || '',
    email: defaultValues?.email || '',
    phone_number: defaultValues?.phone || '',
    password: defaultValues?.password || '',
    passwordRepeat: defaultValues?.passwordRepeat || '',
  };

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

  const fields: FieldType[] = [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
      defaultHelperText: 'Как к вам обращаться?',
      autoComplete: 'name',
      required: true,
      hideAsterisk: true,
      maxLength: validationLengths.name,
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
        unmask: true,
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
      maxLength: validationLengths.email,
      preValidate: true,
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      hideAsterisk: true,
      maxLength: validationLengths.password_new,
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

  const submit = (data: IBasicField) => {
    const request: ISignUpRequest = {
      name: typeof data.name === 'string' ? data.name : '',
      email: typeof data.email === 'string' ? data.email : '',
      phone_number:
        typeof data.phone_number === 'string' ? data.phone_number : '',
      password: typeof data.password === 'string' ? data.password : '',
    };
    return signUp(request)
      .then((res) =>
        signIn({ email: request.email, password: request.password }).then(
          () => res
        )
      )
      .then((res) => {
        const userPromise = setUser(res);
        const cardsPromise = api.getCards().then((res) => setCards(res));
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
      defaultValues={defaults}
    />
  );
};
