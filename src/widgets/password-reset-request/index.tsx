import { Stack, Typography } from '@mui/material';
import { BackButton, ResetPasswordForm } from '~/features';
import {
  widgetStyle,
  topButtonsStyle,
  titleStyle,
  paragraphStyle,
} from './style';
import { FC } from 'react';

interface IPasswordResetRequestWidget {
  handleSetEmail: (data: string) => void;
}

export const PasswordResetRequestWidget: FC<IPasswordResetRequestWidget> = ({
  handleSetEmail,
}) => {
  return (
    <Stack component="section" sx={widgetStyle} spacing={2.5} useFlexGap>
      <Stack direction="row" sx={topButtonsStyle}>
        <BackButton />
      </Stack>
      <Typography component="h1" sx={titleStyle}>
        Восстановление пароля
      </Typography>
      <Typography sx={paragraphStyle}>
        Введите Email и последние четыре цифры телефона, который был указан при
        регистрации.
      </Typography>
      <ResetPasswordForm handleSetEmail={handleSetEmail} />
    </Stack>
  );
};
