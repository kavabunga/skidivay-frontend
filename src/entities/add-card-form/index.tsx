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
  IBasicField,
  ICardContext,
  IGroup,
  IShop,
  Input,
  cardFormErrors,
  validationLengths,
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

interface IFields extends IBasicField {
  shop_name: string | null;
  shop_group: string | null;
  card_number: string;
  barcode_number: string;
}

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
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      shop_name: location.state?.shop.name ?? null,
      shop_group: location.state?.shop.group?.[0].name ?? null,
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

  const onSubmit: SubmitHandler<IFields> = (data) => {
    const shop = shops.find(
      (element: IShop) => element.name === data.shop_name
    );
    const group = groups.find(
      (element: IGroup) => element.name === data.shop_group
    );
    const request: { [key: string]: string } = {
      shop_name: data.shop_name || '',
      shop_group: data.shop_group || '',
      card_number: data.card_number,
      barcode_number: data.barcode_number,
      shop_id: shop?.id.toString() || '',
      group_id: group?.id.toString() || '',
    };
    new AddCardFormModel(request)
      .createNewCard()
      .then((res) => {
        const newCard: ICardContext = {
          card: res,
          owner: true,
          favourite: false,
          pub_date: '',
          shared_by: null,
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
            value={value}
            options={options}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            onInputChange={(_event, newInputValue) => onChange(newInputValue)}
            onChange={(_event, newValue) => {
              if (typeof newValue === 'string') {
                onChange(newValue);
                setValue('shop_group', null);
                setIsGroupInputBlocked(false);
              } else if (newValue && newValue.inputValue) {
                setValue('shop_group', null);
                setIsGroupInputBlocked(false);
                onChange(newValue.inputValue);
              } else {
                onChange(newValue?.name || '');
                setValue('shop_group', newValue?.group?.[0].name || null);
                setIsGroupInputBlocked(true);
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
                inputProps={{
                  ...params.inputProps,
                  maxLength: validationLengths.shop_name,
                }}
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
            onChange={(_event, item) => {
              onChange(item);
            }}
            fullWidth
            //NOTE: null is used when we empty this input via react-hook-form setValue()
            value={value}
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
                inputProps={{
                  ...params.inputProps,
                  maxLength: validationLengths.shop_group,
                }}
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
        register={register('card_number')}
        error={errors.card_number}
        hideAsterisk={true}
        maxLength={validationLengths.card_number}
      />
      <Input
        name="barcode_number"
        label="Номер штрихкода"
        type="text"
        autoComplete="no"
        defaultHelperText="Цифры, расположенные под черными штрихами"
        placeholder=""
        register={register('barcode_number')}
        error={errors.barcode_number}
        hideAsterisk={true}
        maxLength={validationLengths.barcode_number}
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
        {isSubmitting ? 'Подождите...' : 'Сохранить'}
      </Button>
    </Box>
  );
};
