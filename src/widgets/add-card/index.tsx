import { Container, Typography } from '@mui/material';
import { AddCardForm } from '~/entities';
import { containerStyle, titleStyle } from './style';
import { BackButton } from '~/features';

export const AddCardWidget = () => {
  return (
    <Container component="section" sx={containerStyle}>
      <BackButton />
      <Typography component="h1" sx={titleStyle}>
        Добавить карту
      </Typography>
      <AddCardForm />
    </Container>
  );
};
