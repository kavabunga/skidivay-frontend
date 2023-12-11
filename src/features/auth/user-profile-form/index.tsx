import { FC, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IMask } from 'react-imask';
import { Box, Button, Stack, Link } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  api,
  FieldType,
  IPatchUser,
  validationLengths,
  validationSchemes,
} from '~/shared';
import { UserContext, MessagesContext } from '~/app';
import { InputSelector } from '~/features';
import { ApiMessageTypes } from '~/shared/enums';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { formStyle, buttonStyle, linkStyle } from './style';

const schema = z.object({
  name: validationSchemes.name,
  email: validationSchemes.email,
  phone_number: validationSchemes.phone_number,
});

const fields: FieldType[] = [
  {
    name: 'name',
    label: 'Имя',
    type: 'text',
    defaultHelperText: ' ',
    placeholder: '',
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
    maxLength: validationLengths.email,
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
  const masked = IMask.createMask({
    mask: '+7 (000) 000-00-00',
  });
  masked.resolve(user?.phone_number || '');

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone_number: masked.value,
    },
  });

  const handleCancelChanges = () => {
    reset();
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

    if (
      request.name === user?.name &&
      request.email === user?.email &&
      request.phone_number === user?.phone_number
    ) {
      setMessages((messages) => [
        {
          message: 'Данные не поменялись, но мы все сохранили',
          type: ApiMessageTypes.error,
        },
        ...messages,
      ]);
      onEditDisable();
      return;
    }

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
            disabled={isSubmitting}
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
