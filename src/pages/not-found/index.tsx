import { Box, Stack, Typography } from '@mui/material';
import mainImage from '~/shared/assets/not-found-robot.svg';
import { mainImgStyle, containerStyle } from './styles.ts';
import { AccentButton } from '~/shared/index.ts';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      component="main"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      useFlexGap
      spacing={4}
      sx={containerStyle}
    >
      <Typography textAlign="center" sx={{ color: 'surface.darker' }}>
        Cтраница не найдена
      </Typography>
      <Box
        component="img"
        sx={{ ...mainImgStyle }}
        alt="Робот, с ошибкой 404 на дисплее"
        src={mainImage}
      />
      <AccentButton onClick={() => navigate('/', { replace: true })}>
        Вернуться назад
      </AccentButton>
    </Stack>
  );
};
