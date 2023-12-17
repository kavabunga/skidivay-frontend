import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  IBasicField,
  ICard,
  IShareCardRequest,
  Input,
  api,
  validationLengths,
  validationSchemes,
} from '~/shared';
import * as z from 'zod';
import { Button, Stack } from '@mui/material';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '../errors';
import { buttonStyle } from './style';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMessages } from '~/shared/store';

interface IFields extends IBasicField {
  email: string;
}

interface ICardShareFormProps {
  card: ICard;
  afterSubmit: () => void;
}

export const CardShareForm: FC<ICardShareFormProps> = ({
  card,
  afterSubmit,
}) => {
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);

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
  });

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
    const request: IShareCardRequest = {
      email: data.email || '',
    };
    api
      .shareCard(request, card.id)
      .then((res) => {
        addSuccessMessage(
          res.message ||
            `Карта ${card.shop.name} отправлена на адрес ${request.email}`
        );
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
        {isSubmitting ? 'Подождите...' : 'Поделиться картой'}
      </Button>
    </Stack>
  );
};
