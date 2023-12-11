import { FC, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ICard,
  IShareCardRequest,
  Input,
  api,
  validationSchemes,
} from '~/shared';
import * as z from 'zod';
import { Button, Stack } from '@mui/material';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '../errors';
import { MessagesContext } from '~/app';
import { buttonStyle } from './style';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiMessageTypes } from '~/shared/enums';

interface ICardShareFormProps {
  card: ICard;
  afterSubmit: () => void;
}

export const CardShareForm: FC<ICardShareFormProps> = ({
  card,
  afterSubmit,
}) => {
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
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
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

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const request: IShareCardRequest = {
      email: data.email || '',
    };
    api
      .shareCard(request, card.id)
      .then(() => {
        setMessages((messages) => [
          {
            message: `Карта ${card.shop.name} отправлена на адрес ${request.email}`,
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        afterSubmit();
      })
      .catch(handleError);
  };

  return (
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
        register={register}
        errors={errors}
        hideAsterisk={true}
        label="Email"
        type="email"
        autoComplete="no"
        required={true}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={buttonStyle}
      >
        {isSubmitting ? 'Подождите...' : 'Поделиться картой'}
      </Button>
    </Stack>
  );
};
