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
  onClose: () => void;
}> = ({ email, onClose }) => {
  useEffect(() => {
    setTimeout(() => onClose(), 5000);
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
      <Link sx={linkStyle} onClick={() => console.log('Экран изменения почты')}>
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
