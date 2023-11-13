import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockShopList, ShopListType } from '~/shared/mock';
import { addCardFormErrors } from '~/shared/lib';
import { formStyle, helperTextStyle, listBoxStyle, buttonStyle } from './style';

//NOTE: In case of clearing the field with the built in close-button, the value becomes NULL, so react-hook-form fires type error. That's why we use 'required' error text as invalid type eroor text in shopName field
const schema = z
  .object({
    shopName: z.string({
      required_error: addCardFormErrors.required,
      invalid_type_error: addCardFormErrors.required,
    }),
    cardNumber: z.string({
      required_error: addCardFormErrors.required,
      invalid_type_error: addCardFormErrors.wrongType,
    }),
    barcode: z.string({
      required_error: addCardFormErrors.required,
      invalid_type_error: addCardFormErrors.wrongType,
    }),
  })
  .partial()
  .required({
    shopName: true,
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
    onClick: () => {},
  },
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
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
    const shop = shopList.find((element) => element.name === data.shopName);
    if (shop !== undefined) {
      data = { ...data, shopId: shop.id.toString() };
    } else {
      data = { ...data, shopId: '' };
    }
    return;
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="shopName"
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
