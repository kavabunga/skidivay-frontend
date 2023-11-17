import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { defaultPromoCards } from '~/shared/mock';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="p"
        textAlign="center"
        sx={{ paddingBottom: '1rem', ...paragraphStyle }}
      >
        Удобный и быстрый доступ к вашим картам лояльности в любом месте
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Персонаж, несущий свинью-копилку"
        src={coverImage}
      />

      <Typography
        component="p"
        textAlign="left"
        sx={{ paddingTop: '1rem', ...paragraphStyle }}
      >
        Добавьте в свой кошелёк
      </Typography>

      <PromoSlider items={defaultPromoCards} isLoggedIn={false} />

      <AccentButton
        onClick={() => navigate('/auth', { relative: 'path' })}
        children={'Попробовать'}
      />
    </Container>
  );
};
