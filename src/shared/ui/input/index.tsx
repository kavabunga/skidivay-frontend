import { FC, forwardRef } from 'react';
import { TextField, InputProps } from '@mui/material';
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
  maxLength?: number;
  maskOptions?: IMask;
}

export interface InputType extends FieldType {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ [key: string]: string }>;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  InputProps?: InputProps;
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
  const { onChange, onBlur, ref } = register(name);
  return (
    <TextField
      key={name}
      helperText={errors[name] ? errors[name]?.message : defaultHelperText}
      FormHelperTextProps={{ sx: helperTextStyle }}
      error={!!errors[name]}
      InputLabelProps={{ required: !hideAsterisk }}
      inputRef={ref}
      inputProps={{
        onChange: onChange,
        onBlur: onBlur,
        name: name,
        ...maskOptions,
        ...(props.maxLength && { maxLength: props.maxLength }),
      }}
      InputProps={{
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
