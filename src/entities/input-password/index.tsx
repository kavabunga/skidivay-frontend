import { FC, useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Input, InputType } from '~/shared/ui';

export const InputPassword: FC<InputType> = (input) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Input
      {...input}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
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
        ),
      }}
    />
  );
};
