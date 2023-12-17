import { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { FieldType } from '~/shared/ui';
import { InputSelector, checkEmail } from '~/features';
import { formStyle, buttonStyle } from './style';
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
  defaultValues?: object;
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
    register,
    handleSubmit,
    setError,
    getValues,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<IBasicField>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const preValidateEmail = () => {
    const email = getValues('email');
    const { error, isDirty, invalid } = getFieldState('email');
    typeof email === 'string' &&
      (!invalid ||
        error?.message === 'Пользователь с таким email уже существует.') &&
      isDirty &&
      checkEmail(email).catch(handleError);
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
            register={register(field.name)}
            error={errors[field.name]}
            {...(field.name === 'email' && { preValidator: preValidateEmail })}
          />
        ))}

      {children}
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ ...buttonStyle, width: `${button.width}px` }}
        {...button}
      >
        {isSubmitting ? 'Подождите...' : button.label}
      </Button>
    </Box>
  );
};
