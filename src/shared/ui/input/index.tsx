import { FC } from 'react';
import { TextField, InputAdornment, InputProps } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { helperTextStyle } from './style';

export interface FieldType {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  defaultHelperText?: string;
  placeholder?: string;
  hideAsterisk?: boolean;
  required?: boolean;
}

export interface InputType extends FieldType {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ [key: string]: string }>;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  InputProps?: InputProps;
}

export const Input: FC<InputType> = ({
  name,
  defaultHelperText,
  register,
  errors,
  hideAsterisk,
  ...props
}) => {
  return (
    <TextField
      key={name}
      helperText={errors[name] ? errors[name]?.message : defaultHelperText}
      FormHelperTextProps={{ sx: helperTextStyle }}
      error={!!errors[name]}
      InputLabelProps={{ required: !hideAsterisk }}
      inputProps={{
        ...register(name),
      }}
      InputProps={{
        endAdornment: !!errors[name] && (
          <InputAdornment position="end">
            <ErrorIcon color="error" fontSize="small" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};
