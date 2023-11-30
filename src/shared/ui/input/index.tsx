import { FC, forwardRef } from 'react';
import { TextField, InputAdornment, InputProps } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { IMaskInput } from 'react-imask';
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
  maskOptions?: IMask;
}

interface IMask {
  mask?: string;
  radix?: string;
  unmask?: boolean | 'typed';
}

const Mask = forwardRef<HTMLInputElement, IMask>(function Mask(props, ref) {
  return <IMaskInput {...props} inputRef={ref} overwrite />;
});

export const Input: FC<InputType> = ({
  name,
  defaultHelperText,
  register,
  errors,
  hideAsterisk,
  maskOptions,
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
        ...maskOptions,
      }}
      InputProps={{
        endAdornment: !!errors[name] && (
          <InputAdornment position="end">
            <ErrorIcon color="error" fontSize="small" />
          </InputAdornment>
        ),
        ...(maskOptions?.mask && {
          inputComponent: Mask as never,
        }),
      }}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};
