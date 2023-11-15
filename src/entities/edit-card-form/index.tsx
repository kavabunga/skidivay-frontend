import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Input } from '~/shared/ui';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cardFormErrors } from '~/shared/lib';
import { formStyle, buttonStyle } from './style';

const schema = z
  .object({
    cardNumber: z
      .string({
        required_error: cardFormErrors.required,
      })
      .max(40, { message: cardFormErrors.maxFortySymbols })
      .regex(/^\d+$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcodeNumber: z
      .string({
        required_error: cardFormErrors.required,
      })
      .max(40, { message: cardFormErrors.maxFortySymbols })
      .regex(/^\d+$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .partial()
  .refine((data) => !(!data.barcodeNumber && !data.cardNumber), {
    message: cardFormErrors.requiredBarcodeOrNumber,
    path: ['cardNumber'],
  });

export interface EditCardFormProps {
  isActive: boolean;
  cardNumberValue: string;
  barcodeNumberValue: string;
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
}

export const EditCardForm: FC<EditCardFormProps> = ({
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
  },
  isActive = true,
  cardNumberValue = '1111 1383 0039 3838 49994',
  barcodeNumberValue = '113839895849854',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: cardNumberValue,
      barcodeNumber: barcodeNumberValue,
    },
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = () => {};

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
          variant="outlined"
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
