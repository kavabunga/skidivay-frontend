import { FC, ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorIcon from '@mui/icons-material/Error';
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<{ [key: string]: string }>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<{ [key: string]: string }> = () => {};

  return (
    <Box
      component="form"
      sx={style.form}
      autoComplete="on"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields[0] &&
        fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={
              field.type === 'password' || field.name === 'password'
                ? showPassword
                  ? 'text'
                  : 'password'
                : field.type
            }
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
            InputProps={{
              endAdornment:
                field.type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Переключатель видимости пароля"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{
                        padding: 0.2,
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'unset',
                        },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon fontSize="small" />
                      ) : (
                        <VisibilityOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  !!errors[field.name] && (
                    <InputAdornment position="end">
                      <ErrorIcon color="error" fontSize="small" />
                    </InputAdornment>
                  )
                ),
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
