import { FC, useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { MessagesContext, UserContext } from '~/app';
import {
  IBasicField,
  IPopupProps,
  Input,
  api,
  validationLengths,
  validationSchemes,
} from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { buttonStyle } from './style';
import { ActivateEmailPopup } from '~/entities';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '../errors';

interface IReactivateEmail extends IPopupProps {
  afterSubmit: () => void;
}

interface IFields extends IBasicField {
  email: string;
}

export const ReactivateEmail: FC<IReactivateEmail> = ({
  open,
  onClose,
  afterSubmit,
}) => {
  const { user, setUser } = useContext(UserContext);
  const { setMessages } = useContext(MessagesContext);

  const schema = z.object({
    email: validationSchemes.email,
  });

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email,
    },
  });

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

  const onSubmit: SubmitHandler<IFields> = (data) => {
    const request = {
      email: typeof data.email === 'string' ? data.email : '',
    };
    const promise =
      request.email === user?.email
        ? api.reactivateEmail()
        : api.editUser(request).then((res) => setUser && setUser(res));
    promise
      .then(() => {
        afterSubmit();
      })
      .catch(handleError);
  };

  return (
    <ActivateEmailPopup open={open} onClose={onClose}>
      <Stack
        useFlexGap
        spacing={2}
        component="form"
        autoComplete="on"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="email"
          defaultHelperText=""
          register={register('email')}
          error={errors.email}
          hideAsterisk={true}
          label="Email"
          type="email"
          autoComplete="no"
          required={true}
          maxLength={validationLengths.email}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={buttonStyle}
        >
          {isSubmitting ? 'Подождите...' : 'Далее'}
        </Button>
      </Stack>
    </ActivateEmailPopup>
  );
};
