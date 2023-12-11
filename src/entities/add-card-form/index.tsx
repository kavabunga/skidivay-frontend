import { FC, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Barcode from 'react-barcode';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Card,
  createFilterOptions,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CardsContext,
  GroupListContext,
  MessagesContext,
  ShopListContext,
} from '~/app';
import {
  ICardContext,
  IGroup,
  IShop,
  Input,
  cardFormErrors,
  validationSchemes,
} from '~/shared';
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

const filter = createFilterOptions<IOption>();
interface IOption extends IShop {
  inputValue?: string;
}

//NOTE: In case of clearing the field with the built in close-button, the value becomes NULL, so react-hook-form fires type error. That's why we use 'required' error text as invalid type eroor text in shopName field
const schema = z
  .object({
    shop_name: validationSchemes.shop_name,
    shop_group: validationSchemes.shop_group,
    card_number: validationSchemes.card_number,
    barcode_number: validationSchemes.barcode_number,
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
  const [isGroupInputBlocked, setIsGroupInputBlocked] = useState(true);
  const { setMessages } = useContext(MessagesContext);
  const { shops } = useContext(ShopListContext);
  const { groups } = useContext(GroupListContext);
  const { cards, setCards } = useContext(CardsContext);
  const options: readonly IOption[] = shops;

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
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
    const shop = shops.find(
      (element: IShop) => element.name === data.shop_name
    );
    const group = groups.find(
      (element: IGroup) => element.name === data.shop_group
    );
    data = {
      ...data,
      shop_id: shop?.id.toString() || '',
      group_id: group?.id.toString() || '',
    };
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
            freeSolo
            fullWidth
            autoSelect
            //NOTE: If undefined, on user input component would switch from uncontrolled to controlled
            value={value || null}
            options={options}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            onChange={(_event, newValue) => {
              if (typeof newValue === 'object') {
                setValue('shop_group', newValue?.group?.[0].name || '');
                setIsGroupInputBlocked(true);
              }
              if (typeof newValue === 'string') {
                onChange(newValue);
              } else if (newValue && newValue.inputValue) {
                setIsGroupInputBlocked(false);
                onChange(newValue.inputValue);
              } else {
                onChange(newValue?.name || '');
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              //NOTE: Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.name
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  id: 0,
                  inputValue,
                  name: `Добавить: ${inputValue}`,
                });
              }
              return filtered;
            }}
            getOptionLabel={(option) => {
              //NOTE: Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              //NOTE: Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              //NOTE: Regular option
              return option.name;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Название магазина"
                error={Boolean(error)}
                helperText={
                  error ? error.message : 'Выберите из списка или введите свой'
                }
                FormHelperTextProps={{ sx: helperTextStyle }}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
            ListboxProps={{ sx: listBoxStyle }}
          />
        )}
      />
      <Controller
        name="shop_group"
        control={control}
        render={({
          field: { value, onChange, onBlur, ref },
          fieldState: { error },
        }) => (
          <Autocomplete
            disablePortal
            onChange={(_event: unknown, item: string | null) => {
              onChange(item || '');
            }}
            fullWidth
            //NOTE: If undefined, on user input component would switch from uncontrolled to controlled
            value={value || null}
            options={groups.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Категория магазина"
                error={Boolean(error)}
                helperText={
                  error
                    ? error.message
                    : isGroupInputBlocked
                    ? ' '
                    : 'Добавьте категорию для удобства поиска карты'
                }
                FormHelperTextProps={{ sx: helperTextStyle }}
                onBlur={onBlur}
                inputRef={ref}
              />
            )}
            ListboxProps={{ sx: listBoxStyle }}
            disabled={isGroupInputBlocked}
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
        defaultHelperText="Цифры, расположенные под черными штрихами"
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
