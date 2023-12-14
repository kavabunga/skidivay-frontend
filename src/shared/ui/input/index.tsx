import { FC, forwardRef } from 'react';
import { TextField, InputProps } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
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
  register: UseFormRegisterReturn;
  error?: FieldError;
  onFocus?: () => void;
  onBlur?: () => void;
  triggerOnChange?: () => void;
  triggerOnBlur?: () => void;
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
  error,
  hideAsterisk,
  maskOptions,
  triggerOnChange,
  triggerOnBlur,
  ...props
}) => {
  const { onChange, onBlur, ref } = register;
  return (
    <TextField
      key={name}
      helperText={error ? error?.message : defaultHelperText}
      FormHelperTextProps={{ sx: helperTextStyle }}
      error={Boolean(error)}
      InputLabelProps={{ required: !hideAsterisk }}
      inputRef={ref}
      inputProps={{
        onChange: (e) => {
          triggerOnChange && triggerOnChange();
          onChange(e);
        },
        onBlur: (e) => {
          triggerOnBlur && triggerOnBlur();
          onBlur(e);
        },
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
