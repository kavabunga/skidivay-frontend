import { FC, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Barcode from 'react-barcode';
import { Box, TextField, Button, Autocomplete, Card } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardsContext, MessagesContext, ShopListContext } from '~/app';
import { ICardContext, IShop, cardFormErrors, Input } from '~/shared';
import {
  formStyle,
  helperTextStyle,
  listBoxStyle,
  buttonStyle,
  barcodeStyle,
} from './style';
import { AddCardFormModel, AddCardWithShopFormModel } from './model';
import { IApiError } from '~/shared/errors';
import { ApiMessageTargets, ApiMessageTypes } from '~/shared/enums';

//NOTE: In case of clearing the field with the built in close-button, the value becomes NULL, so react-hook-form fires type error. That's why we use 'required' error text as invalid type eroor text in shopName field
const schema = z
  .object({
    shopName: z
      .string({
        required_error: cardFormErrors.required,
        invalid_type_error: cardFormErrors.required,
      })
      .max(30)
      .regex(/^[A-Za-zА-Яа-яЁё0-9+.\-_,!@=\s]*$/, {
        message: cardFormErrors.wrongShopName,
      }),
    cardNumber: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
    barcodeNumber: z
      .string({})
      .max(40, { message: cardFormErrors.wrongNumber })
      .regex(/^\d*$/, {
        message: cardFormErrors.wrongNumber,
      }),
  })
  .partial()
  .required({
    shopName: true,
  })
  .superRefine(({ barcodeNumber, cardNumber }, ctx) => {
    if (!barcodeNumber && !cardNumber) {
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['cardNumber'],
      });
    }
  });

export interface AddCardFormType {
  buttonAddBarcode?: React.ComponentProps<typeof Button> & {
    label: string;
  };
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
}

export const AddCardForm: FC<AddCardFormType> = ({
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
  },
}) => {
  const { messages, setMessages } = useContext(MessagesContext);
  const { shops } = useContext(ShopListContext);
  const { cards, setCards } = useContext(CardsContext);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    const shop = shops.find((element: IShop) => element.name === data.shopName);
    if (shop !== undefined) {
      data = { ...data, shopId: shop.id.toString() };
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
          setMessages([
            {
              message: 'Карта успешно добавлена',
              type: ApiMessageTypes.success,
              target: ApiMessageTargets.snack,
            },
            ...messages,
          ]);
          navigate('/');
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
                      key === 'non_field_errors'
                        ? value.join('; ')
                        : err.message,
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
    } else {
      new AddCardWithShopFormModel(data)
        .createNewCard()
        .then((res) => {
          const newCard: ICardContext = {
            card: res,
            owner: true,
            favourite: false,
          };
          return setCards && setCards([newCard, ...cards]);
        })
        .then(() => navigate('/'))
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
                      key === 'non_field_errors'
                        ? value.join('; ')
                        : err.message,
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
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state.shop.name) {
      setValue('shopName', location.state.shop.name);
    }
  }, [location.state.shop.name, setValue]);

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
        name="cardNumber"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register}
        errors={errors}
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
      />
      {watch('barcodeNumber') && (
        <Box sx={{ paddingBottom: '1.25rem' }}>
          <Card sx={{ ...barcodeStyle }} variant="outlined">
            {/* //NOTE: Can also use "format" attribute to pass barcode format to the library */}
            <Barcode
              displayValue={false}
              margin={0}
              value={watch('barcodeNumber')}
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
        {...buttonSave}
      >
        {buttonSave.label}
      </Button>
    </Box>
  );
};
