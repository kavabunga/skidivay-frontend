import { FC, forwardRef } from 'react';
import { TextField, InputProps } from '@mui/material';
import { IMaskInput, ReactMaskOpts } from 'react-imask';
import { Control, Controller } from 'react-hook-form';
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
  maskOptions?: ReactMaskOpts;
  preValidate?: boolean;
}

export interface InputType extends FieldType {
  triggerOnChange?: () => void;
  triggerOnBlur?: () => void;
  disabled?: boolean;
  InputProps?: InputProps;
  preValidator?: () => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
}

const Mask = forwardRef<HTMLInputElement, ReactMaskOpts>(
  function Mask(props, ref) {
    return <IMaskInput {...props} inputRef={ref} />;
  }
);

export const Input: FC<InputType> = ({
  name,
  defaultHelperText,
  control,
  hideAsterisk,
  maskOptions,
  triggerOnChange,
  triggerOnBlur,
  preValidator,
  preValidate,
  ...props
}) => {
  return (
    <Controller
      control={control}
      key={name}
      name={name}
      render={({
        field: { onBlur, onChange, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          value={value}
          inputRef={ref}
          helperText={error ? error?.message : defaultHelperText}
          FormHelperTextProps={{ sx: helperTextStyle }}
          error={Boolean(error)}
          InputLabelProps={{ required: !hideAsterisk, shrink: Boolean(value) }}
          inputProps={{
            ...(maskOptions
              ? {
                  onAccept: (value: string) => {
                    onChange({ target: { name: name, value } });
                    triggerOnChange && triggerOnChange();
                  },
                }
              : {
                  onChange: (e) => {
                    onChange(e);
                    triggerOnChange && triggerOnChange();
                  },
                }),
            onBlur: () => {
              onBlur();
              triggerOnBlur && triggerOnBlur();
              preValidator && preValidate && preValidator();
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
      )}
    />
  );
};
