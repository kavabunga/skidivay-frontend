import { FC, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Barcode from 'react-barcode';
import { Box, TextField, Button, Autocomplete, Card } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardsContext, MessagesContext, ShopListContext } from '~/app';
import { ICardContext, IShop, Input, cardFormErrors } from '~/shared';
import {
  formStyle,
  helperTextStyle,
  listBoxStyle,
  buttonStyle,
  barcodeStyle,
} from './style';
import { AddCardFormModel } from './model';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { handleFormFieldsErrors } from '~/features/errors';

//NOTE: In case of clearing the field with the built in close-button, the value becomes NULL, so react-hook-form fires type error. That's why we use 'required' error text as invalid type eroor text in shopName field
const schema = z
  .object({
    shop_name: z
      .string({
        required_error: cardFormErrors.requiredShopName,
        invalid_type_error: cardFormErrors.requiredShopName,
      })
      .min(1, { message: cardFormErrors.requiredShopName })
      .max(30)
      .regex(/^[A-Za-zА-Яа-яЁё\s\d!@#$%^&*()_+-=[\]{};:'",.<>?/\\|]+$/, {
        message: cardFormErrors.wrongShopName,
      }),
    card_number: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^[A-Za-zА-Яа-яЁё\d\s_-]*$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcode_number: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^[A-Za-zА-Яа-яЁё\d\s_-]*$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .partial()
  .required({
    shop_name: true,
  })
  .superRefine(({ barcode_number, card_number }, ctx) => {
    if (!barcode_number && !card_number) {
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['card_number'],
      });
    }
  });

export const AddCardForm: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setMessages } = useContext(MessagesContext);
  const { shops } = useContext(ShopListContext);
  const { cards, setCards } = useContext(CardsContext);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      shop_name: location.state?.shop?.name || null,
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
    const shop = shops.find(
      (element: IShop) => element.name === data.shop_name
    );
    data = { ...data, shop_id: shop?.id.toString() || '' };
    new AddCardFormModel(data)
      .createNewCard()
      .then((res) => {
        const newCard: ICardContext = {
          card: res,
          owner: true,
          favourite: false,
        };
        return setCards && setCards([...cards, newCard]);
      })
      .then(() => {
        setMessages((messages) => [
          {
            message: 'Карта успешно добавлена',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        navigate('/');
      })
      .catch(handleError);
  };

  // useEffect(() => {
  //   setValue('shop_name', location.state?.shop?.name ?? '');
  // }, [location.state, setValue]);

  return (
    <Box
      component="form"
      sx={formStyle}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="shop_name"
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
            fullWidth
            autoSelect
            //NOTE: If undefined, on user input component would switch from uncontrolled to controlled
            value={value || null}
            options={shops.map((option) => option.name)}
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
      <Input
        name="card_number"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
        hideAsterisk={true}
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
        hideAsterisk={true}
      />
      {watch('barcode_number') && (
        <Box sx={{ paddingBottom: '1.25rem' }}>
          <Card sx={{ ...barcodeStyle }} variant="outlined">
            {/* //NOTE: Can also use "format" attribute to pass barcode format to the library */}
            <Barcode
              displayValue={false}
              margin={0}
              value={watch('barcode_number')}
            />
          </Card>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
        sx={buttonStyle}
      >
        Сохранить
      </Button>
    </Box>
  );
};
