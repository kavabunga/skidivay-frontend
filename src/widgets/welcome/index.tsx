import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import { ShopListContext } from '~/app/contexts';
import coverImage from '~/shared/assets/payment bw 1.svg';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';
import { UserContext } from '~/app';

export const Welcome = () => {
  const { user } = useContext(UserContext);
  const { shops = [] } = useContext(ShopListContext);
  const navigate = useNavigate();

  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="h1"
        variant="h1"
        textAlign="left"
        sx={{ padding: '0 0 1.5rem', width: '100%' }}
      >
        {`Привет, ${user ? user.name : 'Приятель'}!`}
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Персонаж, подбрасывающий монету"
        src={coverImage}
      />

      <Typography
        component="p"
        textAlign="center"
        sx={{
          padding: '2rem 0',
          ...paragraphStyle,
        }}
      >
        Здесь пока нет добавленных карт
      </Typography>

      <AccentButton
        onClick={() => navigate('/card/new', { relative: 'path' })}
        children={'Добавить карту'}
      />

      <Typography
        component="p"
        textAlign="left"
        sx={{
          padding: '1.5rem 0 0.5rem',
          ...paragraphStyle,
        }}
      >
        Можно добавить
      </Typography>

      <PromoSlider items={shops} />
    </Container>
  );
};
