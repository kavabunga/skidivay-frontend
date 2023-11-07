import { Container, Typography } from '@mui/material';
import { SignInForm } from '~/features';

//NOTE: Being replaced with authorization widget

export const SignInWidget = () => {
  return (
    <Container
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
      }}
    >
      <Typography
        align="center"
        component="h1"
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          paddingY: '30px',
        }}
      >
        Вход
      </Typography>
      <SignInForm />
    </Container>
  );
};
