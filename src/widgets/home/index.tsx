import { Box, Container, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { Carousel } from '~/features';
import { imgPromoCards } from '~/shared/mock/img-promo-cards';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';

export const Home = () => {
  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography component="p" textAlign="center" sx={{ ...paragraphStyle }}>
        Удобный и быстрый доступ к вашим картам лояльности
        в&nbsp;любом&nbsp;месте
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt={`персонаж, несущий свинью-копилку`}
        src={coverImage}
      />

      <Typography
        component="p"
        textAlign="left"
        sx={{ marginBottom: '-0.5rem', ...paragraphStyle }}
      >
        Добавьте в свой кошелек
      </Typography>

      <Carousel items={imgPromoCards} />

      <AccentButton children={'Попробовать'} />
    </Container>
  );
};
