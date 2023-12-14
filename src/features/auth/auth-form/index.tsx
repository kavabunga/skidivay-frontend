import { FC, ReactNode, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { FieldType } from '~/shared/ui';
import { InputSelector } from '~/features';
import { formStyle, buttonStyle } from './style';
import { MessagesContext } from '~/entities';
import { ApiMessageTypes } from '~/shared/enums';
import { IApiError } from '~/shared/errors';
import { handleFormFieldsErrors } from '~/features/errors';
import { IBasicField } from '~/shared';

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
  const { setMessages } = useContext(MessagesContext);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IBasicField>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
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
