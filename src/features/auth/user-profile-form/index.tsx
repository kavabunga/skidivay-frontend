import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Stack, Link } from '@mui/material';
import { AccentButton, OutlineButton } from '~/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  api,
  FieldType,
  IPatchUser,
  validationLengths,
  validationSchemes,
  IBasicField,
} from '~/shared';
import { InputSelector, checkEmail } from '~/features';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { formStyle, linkStyle, linkGroupStyle } from './style';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

interface IFields extends IBasicField {
  name: string;
  phone_number: string;
  email: string;
}

interface IUserProfileForm {
  isActive: boolean;
  onChangePassword: () => void;
  onActivateEmail: () => void;
  onEditDisable: () => void;
}

export const UserProfileForm: FC<IUserProfileForm> = ({
  isActive,
  onEditDisable,
  onChangePassword,
  onActivateEmail,
}) => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);

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
        unmask: true,
      },
      hideAsterisk: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      defaultHelperText: user?.is_active ? ' ' : 'Ваш Email не подтвержден',
      placeholder: '',
      autoComplete: 'email',
      required: true,
      hideAsterisk: true,
      maxLength: validationLengths.email,
      preValidate: true,
    },
  ];

  const preValidateEmail = () => {
    const email = getValues('email');
    const { error, isDirty, invalid } = getFieldState('email');
    typeof email === 'string' &&
      (!invalid ||
        error?.message === 'Пользователь с таким email уже существует.') &&
      isDirty &&
      checkEmail(email).catch(
        (err) =>
          err?.detail?.email?.[0] ===
            'Пользователь с таким email уже существует.' &&
          setError('email', { type: 'exists', message: err.detail.email[0] })
      );
  };

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    reset,
    getFieldState,
    formState: { isSubmitting },
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone_number: user?.phone_number,
    },
  });

  const handleCancelChanges = () => {
    onEditDisable();
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });
    }
  };

  const handleError = (err: IApiError) => {
    const fields = Object.keys(getValues());
    if (err.status === 400 && err.detail && !err.detail.non_field_errors) {
      handleFormFieldsErrors(err, fields, setError);
    } else {
      addErrorMessage(
        err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера'
      );
    }
  };

  const onSubmit: SubmitHandler<IFields> = (data) => {
    const request: IPatchUser = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.phone_number && {
        phone_number: data.phone_number,
      }),
    };
    if (
      request.name === user?.name &&
      request.email === user?.email &&
      request.phone_number === user?.phone_number
    ) {
      addSuccessMessage('Данные не поменялись, но мы все сохранили');
      onEditDisable();
      return;
    }

    api
      .editUser(request)
      .then((res) => {
        return setUser(res);
      })
      .then(() => {
        addSuccessMessage('Данные успешно изменены');
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
            control={control}
            disabled={!isActive || isSubmitting}
            key={field.name}
            preValidator={preValidateEmail}
          />
        ))}
      <Stack sx={linkGroupStyle} useFlexGap spacing={2}>
        {!user?.is_active && (
          <Link onClick={onActivateEmail} sx={{ ...linkStyle }}>
            Подтвердить Email
          </Link>
        )}
        <Link onClick={onChangePassword} sx={{ ...linkStyle }}>
          Изменить пароль
        </Link>
      </Stack>

      {isActive && (
        <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap>
          <AccentButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Подождите...' : 'Сохранить'}
          </AccentButton>
          <OutlineButton
            type="button"
            disabled={isSubmitting}
            onClick={handleCancelChanges}
          >
            Отменить изменения
          </OutlineButton>
        </Stack>
      )}
    </Box>
  );
};
