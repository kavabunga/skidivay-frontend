import { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Barcode from 'react-barcode';
import {
  Box,
  TextField,
  Autocomplete,
  Card,
  createFilterOptions,
} from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  IBasicField,
  ICardContext,
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
  barcodeStyle,
} from './style';
import { AddCardFormModel } from './model';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { useUser } from '~/shared/store/useUser';
import { useMessages, useShops } from '~/shared/store';

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
      ctx.addIssue({
        code: 'custom',
        message: cardFormErrors.requiredBarcodeOrNumber,
        path: ['barcode_number'],
      });
    }
  });

export const AddCardForm: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGroupInputBlocked, setIsGroupInputBlocked] = useState(true);
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const shops = useShops((state) => state.shops);
  const groups = useShops((state) => state.groups);
  const addCard = useUser((state) => state.addCard);
  const options: readonly IOption[] = shops;

  const {
    control,
    trigger,
    handleSubmit,
    watch,
    setValue,
    setError,
    getValues,
    formState: { isSubmitting },
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      shop_name: location.state?.shop?.name ?? null,
      shop_group: location.state?.shop?.group?.[0]?.name ?? null,
      card_number: location.state?.card_number ?? '',
      barcode_number: location.state?.barcode_number ?? '',
    },
  });

  useEffect(
    () => location.state?.shop && setIsGroupInputBlocked(true),
    [location.state?.shop]
  );

  const crossValidationtrigger = () => {
    trigger(['card_number', 'barcode_number']);
  };

  const handleError = (err: IApiError) => {
    const fields = Object.keys(getValues());
    if (err.status === 400 && err.detail && !err.detail.non_field_errors) {
      handleFormFieldsErrors(err, fields, setError);
    } else {
      addErrorMessage(
        err.detail?.non_field_errors?.join(' ') ||
          err.message ||
          'Ошибка сервера'
      );
    }
  };

  const onSubmit: SubmitHandler<IFields> = (data) => {
    const shop = shops.find((element) => element.name === data.shop_name);
    const group = groups.find((element) => element.name === data.shop_group);
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
        };
        return addCard(newCard);
      })
      .then(() => {
        addSuccessMessage('Карта успешно добавлена');
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
            //NOTE: To prevent form send on unfinished input
            onKeyDown={(_event) => {
              if (_event.key === 'Enter') {
                onBlur();
              }
            }}
            //NOTE: Input change and value change are fired separately.
            // Here we track input change for validation and shop_group toggle.
            onInputChange={(_event, newInputValue) => {
              onChange(newInputValue);
              setValue('shop_group', null);
              setIsGroupInputBlocked(false);
            }}
            onChange={(_event, newValue) => {
              if (typeof newValue === 'string') {
                onChange(newValue);
                setValue('shop_group', null);
                setIsGroupInputBlocked(false);
              } else if (newValue?.inputValue) {
                setValue('shop_group', null);
                setIsGroupInputBlocked(false);
                onChange(newValue.inputValue);
              } else {
                setValue('shop_group', newValue?.group?.[0].name || null);
                setIsGroupInputBlocked(true);
                onChange(newValue?.name || null);
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
            autoHighlight
            onChange={(_event, item) => {
              onChange(item);
            }}
            fullWidth
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
            noOptionsText="Нет подходящих категорий"
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
        control={control}
        triggerOnChange={crossValidationtrigger}
        triggerOnBlur={crossValidationtrigger}
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
        control={control}
        triggerOnChange={crossValidationtrigger}
        triggerOnBlur={crossValidationtrigger}
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
      <AccentButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Подождите...' : 'Сохранить'}
      </AccentButton>
    </Box>
  );
};
