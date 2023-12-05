import { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import coverImage from '~/shared/assets/chatbot-bw-1.svg';
import { mainContainerStyle, coverImgStyle, paragraphStyle } from './styles';

export const ResetPasswordRequestSuccessWidget: FC<{
  email: string;
}> = ({ email }) => {
  return (
    <Stack
      direction="column"
      useFlexGap={true}
      spacing={2}
      sx={mainContainerStyle}
    >
      <Typography textAlign="center" sx={paragraphStyle}>
        {`Мы отправили письмо на адрес ${email} Перейдите по ссылке в письме, чтобы изменить пароль`}
      </Typography>
      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Робот"
        src={coverImage}
      />
    </Stack>
  );
};
