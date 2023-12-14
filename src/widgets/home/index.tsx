import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopListContext } from '~/entities';
import { Box, Stack, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';

export const Home = () => {
  const { shops = [] } = useContext(ShopListContext);
  const navigate = useNavigate();

  return (
    <Stack
      component="main"
      useFlexGap
      spacing={2}
      sx={{ ...mainContainerStyle }}
    >
      <Typography component="p" textAlign="center" sx={{ ...paragraphStyle }}>
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
