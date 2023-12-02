import { FC, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, InputAdornment, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/shared/ui';
import { cardFormErrors } from '~/shared/lib';
import { ICardContext, api } from '~/shared';
import { CardsContext, MessagesContext } from '~/app';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { formStyle, buttonStyle } from './style';
import { handleFormFieldsErrors } from '~/features/errors';

const schema = z
  .object({
    card_number: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^[A-Za-zА-Яа-яЁё\d_-]*$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcode_number: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^[A-Za-zА-Яа-яЁё\d_-]*$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .superRefine(({ barcode_number, card_number }, ctx) => {
    if (!barcode_number && !card_number) {
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['card_number'],
      });
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['barcode_number'],
      });
    }
  });

export interface EditCardFormProps {
  isActive: boolean;
  card: ICardContext;
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
  handleSubmited: () => void;
}

export const EditCardForm: FC<EditCardFormProps> = ({
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
  },
  isActive = true,
  handleSubmited,
  card,
}) => {
  const { setMessages } = useContext(MessagesContext);
  const { cards, setCards } = useContext(CardsContext);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      card_number: card.card.card_number,
      barcode_number: card.card.barcode_number,
    },
  });

  const onCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        setMessages((messages) => [
          {
            message: 'Номер скопирован в буфер обмена',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ])
      )
      .catch(() =>
        setMessages((messages) => [
          {
            message: 'Ошибка копирования. Попробуйте скопировать номер вручную',
            type: ApiMessageTypes.error,
          },
          ...messages,
        ])
      );
  };

  const handleError = (err: IApiError) => {
    const fields = Object.keys(getValues());
    if (err.status === 400 && err.detail && !err.detail.non_field_errors) {
      handleFormFieldsErrors(err, fields, setError);
    } else {
      setMessages((messages) => [
        {
          message:
            err.detail?.non_field_errors.join(' ') ||
            err.message ||
            'Ошибка сервера',
          type: ApiMessageTypes.error,
        },
        ...messages,
      ]);
    }
  };

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    api
      .editCard(data, card.card.id)
      .then((res) => {
        const newCards = cards.map((card) =>
          res.id != card.card.id ? card : { ...card, card: res }
        );
        return setCards && setCards(newCards);
      })
      .then(() => {
        setMessages((messages) => [
          {
            message: 'Данные успешно изменены',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        handleSubmited();
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
      <Input
        name="card_number"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
        disabled={!isActive}
        hideAsterisk={true}
        InputProps={{
          endAdornment: errors['card_number'] ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" fontSize="small" />
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton
                aria-label="Кнопка копирования номера карты"
                onClick={() => onCopy(watch('card_number'))}
                sx={{
                  padding: 0.2,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'unset',
                  },
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Input
        name="barcode_number"
        label="Номер штрихкода"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
        disabled={!isActive}
        hideAsterisk={true}
      />
      {isActive && (
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid}
          fullWidth
          sx={buttonStyle}
          {...buttonSave}
        >
          {buttonSave.label}
        </Button>
      )}
    </Box>
  );
};
