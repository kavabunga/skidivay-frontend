import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { defaultPromoCards } from '~/shared/mock';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';

export const Home = () => {
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
    function handleResize() {
      setWidth(document.documentElement.clientWidth);
    }
    function wait() {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 1000);
      };
    }
    window.addEventListener('resize', wait());
    return () => window.removeEventListener('resize', wait());
  }, [width]);

  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="p"
        textAlign="center"
        sx={{ paddingBottom: '1rem', ...paragraphStyle }}
      >
        Удобный и быстрый доступ к вашим картам лояльности
        в&nbsp;любом&nbsp;месте
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt={`Персонаж, несущий свинью-копилку.`}
        src={coverImage}
      />

      <Typography
        component="p"
        textAlign="left"
        sx={{ paddingTop: '1rem', ...paragraphStyle }}
      >
        Добавьте в свой кошелек
      </Typography>

      <PromoSlider items={defaultPromoCards} isLoggedIn={false} />

      <AccentButton children={'Попробовать'} />
    </Container>
  );
};
