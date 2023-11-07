import { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import style from './style';

type Field = {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  defaultHelperText?: string;
  placeholder?: string;
  required: boolean;
};

export const AuthForm: FC<{
  fields: Field[];
  schema: ZodType;
  children?: ReactNode | ReactNode[];
  button: React.ComponentProps<typeof Button> & {
    label: string;
    width?: number;
  };
}> = ({ fields, children, schema, button }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<{ [key: string]: string }> = (data) =>
    console.log(data);

  return (
    <Box
      component="form"
      sx={style.form}
      autoComplete="on"
      name="signUp"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields[0] &&
        fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field.defaultHelperText
            }
            FormHelperTextProps={{ sx: style.textForm.helperText }}
            error={!!errors[field.name]}
            autoComplete={field.autoComplete}
            inputProps={{
              ...register(field.name),
            }}
            variant="outlined"
            size="small"
            fullWidth
          />
        ))}
      {children}
      <Button
        type="submit"
        variant="contained"
        disabled={!isDirty || !isValid}
        sx={{ width: `${button.width}px` }}
        {...button}
      >
        {button.label}
      </Button>
    </Box>
  );
};
