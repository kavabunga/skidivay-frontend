import { FC, useContext } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from '@mui/material';
import { api, authFormErrors, IPatchUser } from '~/shared';
import { UserContext } from '~/app';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { InputSelector } from '~/features';
import { MessagesContext } from '~/app';
import { ApiMessageTypes } from '~/shared/enums';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { formStyle, buttonStyle, linkStyle } from './style';

const schema = z.object({
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
});

const fields = [
  {
    name: 'name',
    label: 'Имя',
    type: 'text',
    defaultHelperText: ' ',
    placeholder: '',
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
    placeholder: '',
    autoComplete: 'email',
    required: true,
    hideAsterisk: true,
  },
];

interface IUserProfileForm {
  isActive: boolean;
  onChangePassword: () => void;
  onEditDisable: () => void;
}

export const UserProfileForm: FC<IUserProfileForm> = ({
  isActive = true,
  onEditDisable,
  onChangePassword,
}) => {
  const { user, setUser } = useContext(UserContext);
  const { setMessages } = useContext(MessagesContext);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
    },
  });

  const handleCancelChanges = () => {
    onEditDisable();
  };

  const handleError = (err: IApiError) => {
    const fields = Object.keys(getValues());
    if (err.status === 400 && err.detail && !err.detail.non_field_errors) {
      handleFormFieldsErrors(err, fields, setError);
    } else {
      setMessages((messages) => [
        {
          message:
            err.detail?.non_field_errors?.join(' ') ||
            err.message ||
            'Ошибка сервера',
          type: ApiMessageTypes.error,
        },
        ...messages,
      ]);
    }
  };

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const request: IPatchUser = {
      name: data.name || '',
      email: data.email || '',
      phone_number:
        data.phone_number.replace(/\D/g, '').replace(/^7/, '') || '',
    };

    api
      .editUser(request)
      .then((res) => {
        return setUser && setUser(res);
      })
      .then(() => {
        setMessages((messages) => [
          {
            message: 'Данные успешно изменены',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        onEditDisable();
      })
      .catch(handleError);
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields[0] &&
        fields.map((field) => (
          <InputSelector
            {...field}
            disabled={!isActive || isSubmitting}
            key={field.name}
            register={register}
            errors={errors}
          />
        ))}

      <Link onClick={onChangePassword} sx={{ ...linkStyle }}>
        Изменить пароль
      </Link>

      {isActive && (
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
            fullWidth
            sx={buttonStyle}
          >
            {isSubmitting ? 'Подождите...' : 'Сохранить'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            disabled={isSubmitting}
            fullWidth
            sx={buttonStyle}
            onClick={handleCancelChanges}
          >
            Отменить изменения
          </Button>
        </Stack>
      )}
    </Box>
  );
};
