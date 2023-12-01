import { AuthForm, signUp } from '..';
import { ISignUpRequest, authFormErrors } from '~/shared';
import * as z from 'zod';
import { Dispatch, FC, SetStateAction } from 'react';

export const SignUpForm: FC<{
  defaultValues?: object;
  setRegistredEmail: Dispatch<SetStateAction<string>>;
}> = ({ defaultValues, setRegistredEmail }) => {
  const schema = z
    .object({
      name: z
        .string({
          required_error: authFormErrors.required,
        })
        .max(60)
        .regex(/^[[a-z\][A-Z\][а-я\][А-Я\][Ёё\]\s\-—_]*$/, {
          message: authFormErrors.wrongName,
        }),
      email: z
        .string({
          required_error: authFormErrors.required,
        })
        .max(30)
        .email({ message: authFormErrors.wrongEmail }),
      phone: z
        .string({
          required_error: authFormErrors.required,
        })
        .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
          message: authFormErrors.wrongPhone,
        }),
      password: z
        .string({
          required_error: authFormErrors.required,
        })
        .min(8, { message: authFormErrors.wrongPasswordCreated })
        .max(20, { message: authFormErrors.wrongPasswordCreated })
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
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
      defaultHelperText: ' ',
      autoComplete: 'tel',
      required: true,
      placeholder: '+7 (999) 999-99-99',
      maskOptions: {
        mask: '+7 (000) 000-00-00',
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: ' ',
      autoComplete: 'email',
      required: true,
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
    },
    {
      name: 'passwordRepeat',
      label: 'Повторный пароль',
      type: 'password',
      defaultHelperText: ' ',
      autoComplete: 'new-password',
      required: true,
    },
  ];

  const submit = (data: { [key: string]: string }) => {
    const request: ISignUpRequest = {
      name: data.name || '',
      email: data.email || '',
      phone_number: data.phone || '',
      password: data.password || '',
    };
    return signUp(request).then((res) => {
      return setRegistredEmail(res.email);
    });
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
