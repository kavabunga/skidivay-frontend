import { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { FieldType } from '~/shared/ui';
import { InputSelector, checkEmail } from '~/features';
import { formStyle } from './style';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { IBasicField } from '~/shared';
import { useMessages } from '~/shared/store';

export interface AuthFormType {
  fields: FieldType[];
  schema: ZodType;
  children?: ReactNode | ReactNode[];
  button: React.ComponentProps<typeof Button> & {
    label: string;
    width?: number;
  };
  defaultValues?: { [key: string]: string };
  submit: (data: IBasicField) => Promise<void>;
}

export const AuthForm: FC<AuthFormType> = ({
  fields,
  children,
  schema,
  button,
  defaultValues,
  submit,
}) => {
  const addErrorMessage = useMessages((state) => state.addErrorMessage);
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    getFieldState,
    formState: { isSubmitting },
  } = useForm<IBasicField>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    ...(defaultValues && { defaultValues: defaultValues }),
  });

  const preValidateEmail = () => {
    const email = getValues('email');
    const { error, isDirty, invalid } = getFieldState('email');
    typeof email === 'string' &&
      (!invalid || error?.type === 'exists') &&
      isDirty &&
      checkEmail(email).catch(
        (err) =>
          err?.detail?.email?.[0] ===
            'Пользователь с таким email уже существует.' &&
          setError('email', { type: 'exists', message: err.detail.email[0] })
      );
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

  const onSubmit: SubmitHandler<IBasicField> = (data) => {
    submit(data).catch(handleError);
  };

  return (
    <Box
      component="form"
      sx={formStyle}
      autoComplete="on"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields[0] &&
        fields.map((field) => (
          <InputSelector
            {...field}
            disabled={isSubmitting}
            key={field.name}
            control={control}
            {...(field.name === 'email' && { preValidator: preValidateEmail })}
          />
        ))}

      {children}
      <AccentButton
        type="submit"
        disabled={isSubmitting}
        sx={{ width: `${button.width}px` }}
        {...button}
      >
        {isSubmitting ? 'Подождите...' : button.label}
      </AccentButton>
    </Box>
  );
};
