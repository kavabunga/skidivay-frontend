import { FC, useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/shared/ui';
import { cardFormErrors } from '~/shared/lib';
import {
  IBasicField,
  ICardContext,
  api,
  validationLengths,
  validationSchemes,
} from '~/shared';
import {
  CardsContext,
  GroupListContext,
  MessagesContext,
  ShopListContext,
} from '~/entities';
import { IApiError } from '~/shared/errors';
import { ApiMessageTypes } from '~/shared/enums';
import { formStyle, buttonStyle, helperTextStyle, listBoxStyle } from './style';
import { handleFormFieldsErrors } from '~/features/errors';
interface IFields extends IBasicField {
  shop_group: string | null;
  card_number: string;
  barcode_number: string;
}

export interface EditCardFormProps {
  isActive: boolean;
  card: ICardContext;
  buttonSave?: React.ComponentProps<typeof Button> & {
    label: string;
  };
  handleSubmited: () => void;
}

const schema = z
  .object({
    shop_group: validationSchemes.shop_group,
    card_number: validationSchemes.card_number,
    barcode_number: validationSchemes.barcode_number,
  })
  .partial()
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

export const EditCardForm: FC<EditCardFormProps> = ({
  buttonSave = {
    label: 'Сохранить',
    onClick: () => {},
  },
  isActive = true,
  handleSubmited,
  card,
}) => {
  const { setMessages } = useContext(MessagesContext);
  const { setCards } = useContext(CardsContext);
  const { groups } = useContext(GroupListContext);
  const { shops } = useContext(ShopListContext);
  const [isUserShop, setIsUserShop] = useState(true);
  useEffect(
    () =>
      shops.find((shop) => shop.name === card.card.shop.name) &&
      setIsUserShop(false),
    [card.card.shop.name, shops]
  );

  const {
    control,
    register,
    trigger,
    handleSubmit,
    setError,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IFields>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      card_number: card.card.card_number,
      barcode_number: card.card.barcode_number,
      shop_group: card.card.shop.group?.[0]?.name ?? null,
    },
  });

  const crossValidationtrigger = () => {
    trigger(['card_number', 'barcode_number']);
  };

  const onCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        setMessages((messages) => [
          {
            message: 'Номер скопирован в буфер обмена',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ])
      )
      .catch(() =>
        setMessages((messages) => [
          {
            message: 'Ошибка копирования. Попробуйте скопировать номер вручную',
            type: ApiMessageTypes.error,
          },
          ...messages,
        ])
      );
  };

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
    if (
      (data.shop_group && !card.card.shop.group?.[0]?.name) ||
      data.shop_group !== card.card.shop.group?.[0]?.name
    ) {
      const newGroupId = groups.find((group) => group.name === data.shop_group)
        ?.id;
      const shopRequest = {
        name: card.card.shop.name,
        ...(newGroupId && { group: [newGroupId] }),
      };
      api.editShop(shopRequest, card.card.shop.id).catch(handleError);
    }
    api
      .editCard(data, card.card.id)
      .then((res) => {
        return (
          setCards &&
          setCards((cards) =>
            cards.map((card) =>
              res.id != card.card.id ? card : { ...card, card: res }
            )
          )
        );
      })
      .then(() => {
        setMessages((messages) => [
          {
            message: 'Данные успешно изменены',
            type: ApiMessageTypes.success,
          },
          ...messages,
        ]);
        handleSubmited();
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
      <Input
        name="card_number"
        label="Номер карты"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register('card_number')}
        triggerOnChange={crossValidationtrigger}
        error={errors.card_number}
        disabled={!isActive}
        hideAsterisk={true}
        maxLength={validationLengths.card_number}
        InputProps={{
          endAdornment: !!watch('card_number') && (
            <InputAdornment position="end">
              <IconButton
                aria-label="Кнопка копирования номера карты"
                onClick={() => onCopy(getValues('card_number'))}
                sx={{
                  color: 'black',
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
        name="barcode_number"
        label="Номер штрихкода"
        type="text"
        autoComplete="no"
        defaultHelperText=" "
        placeholder=""
        register={register('barcode_number')}
        triggerOnChange={crossValidationtrigger}
        error={errors.barcode_number}
        disabled={!isActive}
        hideAsterisk={true}
        maxLength={validationLengths.barcode_number}
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
                helperText={error ? error.message : ' '}
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
            disabled={!(isActive && isUserShop)}
            noOptionsText="Нет подходящих категорий"
          />
        )}
      />
      {isActive && (
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={buttonStyle}
          disabled={isSubmitting}
          {...buttonSave}
        >
          {isSubmitting ? 'Подождите...' : buttonSave.label}
        </Button>
      )}
    </Box>
  );
};
