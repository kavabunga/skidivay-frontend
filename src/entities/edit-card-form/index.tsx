import { FC, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, InputAdornment, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import copy from 'copy-to-clipboard';
import { Input } from '~/shared/ui';
import { cardFormErrors } from '~/shared/lib';
import { ICardContext, IPatchCard, api } from '~/shared';
import { CardsContext, MessagesContext } from '~/app';
import { IApiError } from '~/shared/errors';
import { ApiMessageTargets, ApiMessageTypes } from '~/shared/enums';
import { formStyle, buttonStyle } from './style';

const schema = z
  .object({
    cardNumber: z
      .string({
        required_error: cardFormErrors.required,
      })
      .max(40, { message: cardFormErrors.maxFortySymbols })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcodeNumber: z
      .string({
        required_error: cardFormErrors.required,
      })
      .max(40, { message: cardFormErrors.maxFortySymbols })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .partial()
  .superRefine(({ barcodeNumber, cardNumber }, ctx) => {
    if (!barcodeNumber && !cardNumber) {
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['cardNumber'],
      });
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['barcodeNumber'],
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
  const { messages, setMessages } = useContext(MessagesContext);
  const { cards, setCards } = useContext(CardsContext);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: card.card.card_number,
      barcodeNumber: card.card.barcode_number,
    },
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const request: IPatchCard = {
      shop: card.card.shop?.id || 0,
      name: card.card.shop?.name || '',
      barcode_number: data.barcodeNumber,
      card_number: data.cardNumber,
    };
    api
      .editCard(request, card.card.id)
      .then((res) => {
        const newCards = cards.map((card) =>
          res.id != card.card.id ? card : { ...card, card: res }
        );
        return setCards && setCards(newCards);
      })
      .then(() => {
        setMessages([
          {
            message: 'Данные успешно изменены',
            type: ApiMessageTypes.success,
            target: ApiMessageTargets.snack,
          },
          ...messages,
        ]);
        handleSubmited();
      })
      .catch((err: IApiError) => {
        if (err.status === 400 && err.detail) {
          Object.entries(err.detail).forEach((entry) => {
            const [key, value] = entry;
            if (key in data) {
              setError(key, {
                type: 'server',
                message: value.join('; '),
              });
            } else {
              setMessages([
                {
                  message:
                    key === 'non_field_errors' ? value.join('; ') : err.message,
                  type: ApiMessageTypes.error,
                  target: ApiMessageTargets.snack,
                },
                ...messages,
              ]);
            }
          });
        } else {
          setMessages([
            {
              message: err.message,
              type: ApiMessageTypes.error,
              target: ApiMessageTargets.snack,
            },
            ...messages,
          ]);
        }
      });
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        name="cardNumber"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
        disabled={!isActive}
        InputProps={{
          endAdornment: errors['cardNumber'] ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" fontSize="small" />
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton
                aria-label="Кнопка копирования номера карты"
                onClick={() => {
                  copy(watch('cardNumber'));
                  console.log('Скопировано');
                }}
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
        name="barcodeNumber"
        label="Номер штрихкода"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
        disabled={!isActive}
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
