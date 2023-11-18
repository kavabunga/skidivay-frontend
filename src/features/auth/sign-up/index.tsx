import { useNavigate } from 'react-router-dom';
import { AuthForm, onSignUp } from '..';
import { authFormErrors } from '~/shared/lib';
import * as z from 'zod';
import { ISignUpRequest } from '~/shared';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const schema = z
    .object({
      name: z
        .string({
          required_error: authFormErrors.required,
        })
        .max(60, { message: authFormErrors.maxSixtySymbols })
        .regex(/^[[a-z\][A-Z\][а-я\][А-Я\]\s\-—_]*$/, {
          message: authFormErrors.wrongName,
        }),
      email: z
        .string({
          required_error: authFormErrors.required,
        })
        .max(30, { message: authFormErrors.maxThirtySymbols })
        .email({ message: authFormErrors.wrongEmail }),
      phone: z
        .string({
          required_error: authFormErrors.required,
        })
        .min(10, { message: authFormErrors.minTenSymbols })
        .max(12, { message: authFormErrors.maxTwelveSymbols })
        .regex(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, {
          message: authFormErrors.wrongPhone,
        }),
      password: z
        .string({
          required_error: authFormErrors.required,
        })
        .min(8, { message: authFormErrors.minEightSymbols })
        .max(20, { message: authFormErrors.maxTwentySymbols })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_+=<>?]{1,}$/,
          {
            message: authFormErrors.wrongPasswordCreated,
          }
        ),
      passwordRepeat: z.string({
        required_error: authFormErrors.required,
      }),
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
      placeholder: '',
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'tel',
      defaultHelperText: ' ',
      autoComplete: 'tel',
      required: true,
      placeholder: '+7 (999) 999-99-99',
    },
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
      autoComplete: 'new-password',
      required: true,
      placeholder: '',
    },
    {
      name: 'passwordRepeat',
      label: 'Пароль еще раз',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
      placeholder: '',
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    const request: ISignUpRequest = {
      username: data.name || '',
      email: data.email || '',
      phone_number: data.phone || '',
      password: data.password || '',
    };
    onSignUp(request)
      .then((res) => {
        console.log(res);
        navigate('/authorizedNoCards', { relative: 'path' });
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthForm
      fields={fields}
      schema={schema}
      button={{ label: 'Далее', fullWidth: true }}
      submit={submit}
    />
  );
};
