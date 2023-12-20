import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';
import { useShops } from '~/shared/store';

export const Home = () => {
  const shops = useShops((state) => state.shops);
  const navigate = useNavigate();

  return (
    <Stack
      component="main"
      direction="column"
      justifyContent="stretch"
      useFlexGap
      spacing={2}
      sx={{ ...mainContainerStyle }}
    >
      <Typography
        component="p"
        textAlign="center"
        sx={{ margin: '0 auto', ...paragraphStyle }}
      >
        Удобный и быстрый доступ к вашим картам лояльности в любом месте
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Персонаж, несущий свинью-копилку"
        src={coverImage}
      />
      <AccentButton
        onClick={() =>
          navigate('/auth', { relative: 'path', state: { tab: 1 } })
        }
      >
        Попробовать
      </AccentButton>

      <Typography
        component="p"
        textAlign="left"
        sx={{ ...paragraphStyle, lineHeight: 1 }}
      >
        Добавьте в свой кошелёк
      </Typography>

      <PromoSlider items={shops} />
    </Stack>
  );
};
