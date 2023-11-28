import { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { FieldType } from '~/shared/ui';
import { InputSelector } from '~/features';
import { formStyle, buttonStyle } from './style';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ [key: string]: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    submit(data).catch((err) => console.log(err));
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
