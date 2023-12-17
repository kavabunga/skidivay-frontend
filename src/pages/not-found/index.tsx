import { Box, Stack, Typography } from '@mui/material';
import mainImage from '~/shared/assets/not-found-robot.svg';
import { mainImgStyle, buttonStyle, containerStyle } from './styles.ts';
import { AccentButton } from '~/shared/index.ts';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" sx={containerStyle}>
      <Typography sx={{ paddingY: '2rem' }} textAlign="center">
        Cтраница не найдена
      </Typography>
      <Box
        component="img"
        sx={{ ...mainImgStyle }}
        alt="Робот, с ошибкой 404 на дисплее"
        src={mainImage}
      />
      <AccentButton sx={buttonStyle} onClick={() => navigate('/')}>
        Вернуться назад
      </AccentButton>
    </Stack>
  );
};
