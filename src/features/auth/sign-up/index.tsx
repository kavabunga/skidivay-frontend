import { FC, useContext } from 'react';
import * as z from 'zod';
import { AuthForm, signIn, signUp } from '..';
import { ISignUpRequest, api, authFormErrors } from '~/shared';
import { CardsContext, UserContext } from '~/app';

export const SignUpForm: FC<{
  defaultValues?: object;
  handleShowRegistrationSuccess: () => void;
}> = ({ defaultValues, handleShowRegistrationSuccess }) => {
  const { setCards } = useContext(CardsContext);
  const { setUser } = useContext(UserContext);

  const schema = z
    .object({
      name: z
        .string({
          required_error: authFormErrors.requiredName,
        })
        .min(1, { message: authFormErrors.requiredName })
        .max(60, {
          message: authFormErrors.wrongName,
        })
        .regex(/^[A-Za-zА-Яа-яЁё\s!@#$%^&*()_+-=[\]{};:'",.<>?/\\|]*$/, {
          message: authFormErrors.wrongName,
        }),
      email: z
        .string({
          required_error: authFormErrors.requiredEmail,
        })
        .min(1, { message: authFormErrors.requiredEmail })
        .min(6, { message: authFormErrors.wrongEmail })
        .max(256, { message: authFormErrors.wrongEmail })
        .email({ message: authFormErrors.wrongEmail }),
      phone_number: z
        .string({
          required_error: authFormErrors.requiredPhone,
        })
        .min(1, { message: authFormErrors.requiredPhone })
        .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
          message: authFormErrors.wrongPhone,
        }),
      password: z
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
      passwordRepeat: z
        .string({
          required_error: authFormErrors.requiredPassword,
        })
        .min(1, { message: authFormErrors.requiredPassword }),
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
