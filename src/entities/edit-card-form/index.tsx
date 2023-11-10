import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addCardFormErrors } from '~/shared/lib';
import { formStyle, helperTextStyle, buttonStyle } from './style';

const schema = z.object({
  cardNumber: z
    .string({
      required_error: addCardFormErrors.required,
      invalid_type_error: addCardFormErrors.wrongType,
    })
    .min(1, { message: addCardFormErrors.minOneSymbol }),
  barcode: z
    .string({
      required_error: addCardFormErrors.required,
      invalid_type_error: addCardFormErrors.wrongType,
    })
    .min(1, { message: addCardFormErrors.minOneSymbol }),
});

type FormFields = z.infer<typeof schema>;

type EditCardFormProps = {
  isActive: boolean;
  cardNumberValue: string;
  barcodeValue: string;
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
};

export const EditCardForm: FC<EditCardFormProps> = ({
  buttonSave = {
    label: 'Сохранить',
    onClick: () => console.log('card saved'),
  },
  isActive = true,
  cardNumberValue = '1111 1383 0039 3838 49994',
  barcodeValue = '113839895849854',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: cardNumberValue,
      barcode: barcodeValue,
    },
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      name="editCard"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Номер карты"
        helperText={errors['cardNumber'] ? errors['cardNumber']?.message : ' '}
        FormHelperTextProps={{ sx: helperTextStyle }}
        error={!!errors['cardNumber']}
        inputProps={{
          ...register('cardNumber'),
        }}
        variant="outlined"
        fullWidth
        disabled={!isActive}
        InputProps={{
          endAdornment: errors['cardNumber'] ? (
            <InputAdornment position="end">
              <ErrorIcon color="error" fontSize="small" />
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
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
      <TextField
        label="Номер штрихкода"
        helperText={errors['barcode'] ? errors['barcode']?.message : ' '}
        FormHelperTextProps={{ sx: helperTextStyle }}
        error={!!errors['barcode']}
        inputProps={{
          ...register('barcode'),
        }}
        variant="outlined"
        fullWidth
        disabled={!isActive}
      />
      {isActive && (
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || !isValid}
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
