import { FC, ReactNode, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { FieldType } from '~/shared/ui';
import { InputSelector } from '~/features';
import { formStyle, buttonStyle } from './style';
import { MessagesContext } from '~/app';
import { ApiMessageTargets, ApiMessageTypes } from '~/shared/enums';
import { IApiError } from '~/shared/errors';

export interface AuthFormType {
  fields: FieldType[];
  schema: ZodType;
  children?: ReactNode | ReactNode[];
  button: React.ComponentProps<typeof Button> & {
    label: string;
    width?: number;
  };
  defaultValues?: object;
  submit: (data: { [key: string]: string }) => Promise<void>;
}

export const AuthForm: FC<AuthFormType> = ({
  fields,
  children,
  schema,
  button,
  defaultValues,
  submit,
}) => {
  const { messages, setMessages } = useContext(MessagesContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    submit(data).catch((err: IApiError) => {
      if (err.status === 400 && err.detail) {
        Object.entries(err.detail).forEach((entry) => {
          const [key, value] = entry;
          if (fields.some((field) => field.name === key)) {
            setError(key, {
              type: 'server',
              message: value.join('; '),
            });
          } else {
            setMessages([
              {
                message:
                  key === 'non_field_errors' ? value.join('; ') : err.message,
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
            register={register}
            errors={errors}
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
        {button.label}
      </Button>
    </Box>
  );
};
