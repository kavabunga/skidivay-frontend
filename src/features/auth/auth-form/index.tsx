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
  submit: (data: { [key: string]: string }) => void;
}

export const AuthForm: FC<AuthFormType> = ({
  fields,
  children,
  schema,
  button,
  submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) => {
    submit(data);
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
            register={register}
            errors={errors}
            key={field.name}
          />
        ))}

      {children}
      <Button
        type="submit"
        variant="contained"
        disabled={!isDirty || !isValid}
        sx={{ ...buttonStyle, width: `${button.width}px` }}
        {...button}
      >
        {button.label}
      </Button>
    </Box>
  );
};
