import { Container, Typography, Button } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { AddCardForm } from '~/entities';
import { containerStyle, titleStyle, backButtonStyle } from './style';

export const AddCardWidget = () => {
  return (
    <Container component="section" sx={containerStyle}>
      <Button
        variant="text"
        color="surface"
        startIcon={<ArrowBackIosOutlinedIcon />}
        sx={backButtonStyle}
      >
        Назад
      </Button>
      <Typography component="h1" sx={titleStyle}>
        Добавить карту
      </Typography>
      <AddCardForm />
    </Container>
  );
};
