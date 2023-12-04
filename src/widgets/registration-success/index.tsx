import { FC, useEffect } from 'react';
import { Typography, Box, Link, Stack } from '@mui/material';
import coverImage from '~/shared/assets/chatbot-bw-1.svg';
import { AccentButton } from '~/shared/ui';
import {
  mainContainerStyle,
  coverImgStyle,
  paragraphStyle,
  linkStyle,
} from './styles';

export const RegistrationSuccessWidget: FC<{
  email: string;
  handleShowChangeEmail: () => void;
  onClose: () => void;
}> = ({ email, handleShowChangeEmail, onClose }) => {
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => onClose(),
      6000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <Stack
      direction="column"
      useFlexGap={true}
      spacing={2}
      sx={mainContainerStyle}
    >
      <Typography textAlign="center" sx={paragraphStyle}>
        {`Мы отправили письмо на адрес ${email} Перейдите по ссылке в письме, чтобы подтвердить почту`}
      </Typography>
      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Робот"
        src={coverImage}
      />
      <Link sx={linkStyle} onClick={handleShowChangeEmail}>
        Изменить почту
      </Link>
      <AccentButton
        onClick={() => {
          onClose();
        }}
        children={'Войти'}
      />
    </Stack>
  );
};
