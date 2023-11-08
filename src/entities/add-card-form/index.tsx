import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockShopList, ShopListType } from '~/shared/mock';
import { authFormErrors } from '~/shared/lib';
import {
  formStyle,
  textInputStyle,
  helperTextStyle,
  listBoxStyle,
  buttonStyle,
} from './style';

const schema = z
  .object({
    cardName: z
      .string({
        required_error: authFormErrors.required,
        invalid_type_error: authFormErrors.required,
      })
      .min(1, { message: authFormErrors.minOneSymbol }),
    cardNumber: z
      .string({
        required_error: authFormErrors.required,
        invalid_type_error: authFormErrors.wrongType,
      })
      .min(1, { message: authFormErrors.minOneSymbol }),
    barcode: z.string({
      required_error: authFormErrors.required,
      invalid_type_error: authFormErrors.wrongType,
    }),
  })
  .partial()
  .required({
    cardName: true,
    cardNumber: true,
  });

type FormFields = z.infer<typeof schema>;

export const AddCardForm: FC<{
  shopList?: ShopListType[];
  buttonAddBarcode?: React.ComponentProps<typeof Button> & {
    label: string;
  };
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
}> = ({
  buttonAddBarcode = {
    label: 'Добавить штрихкод',
    onClick: () => console.log('barcode scan'),
  },
  buttonSave = {
    label: 'Сохранить',
    onClick: () => console.log('card saved'),
  },
  shopList = mockShopList,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const shop = shopList.find((element) => element.name === data.cardName);
    if (shop !== undefined) {
      data = { ...data, shopId: shop.id.toString() };
    } else {
      data = { ...data, shopId: '' };
    }
    console.log(data);
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      name="addCard"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="cardName"
        control={control}
        render={({
          field: { value, onChange, onBlur, ref },
          fieldState: { error },
        }) => (
          <Autocomplete
            onChange={(_event: unknown, item: string | null) => {
              onChange(item);
            }}
            freeSolo
            size="small"
            fullWidth
            autoSelect
            value={value ?? null}
            options={shopList.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Название магазина"
                sx={textInputStyle}
                error={Boolean(error)}
                helperText={error ? error.message : ' '}
                FormHelperTextProps={{ sx: helperTextStyle }}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
            ListboxProps={{ sx: listBoxStyle }}
          />
        )}
      />
      <TextField
        label="Номер карты"
        placeholder="0000 0000 0000 0000"
        helperText={errors['cardNumber'] ? errors['cardNumber']?.message : ' '}
        FormHelperTextProps={{ sx: helperTextStyle }}
        error={!!errors['cardNumber']}
        inputProps={{
          ...register('cardNumber'),
        }}
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button
        variant="outlined"
        fullWidth
        sx={buttonStyle}
        {...buttonAddBarcode}
        endIcon={<CameraAltOutlinedIcon />}
      >
        {buttonAddBarcode.label}
      </Button>
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
    </Box>
  );
};
