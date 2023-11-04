import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/system';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';

export const RootLayout = () => (
  <>
    <Stack
      direction={'column'}
      height={'100vh'}
      justifyContent={'space-between'}
    >
      <Header isLoggedIn={false} type="standard" user={{ name: 'test' }} />
      <Container sx={{ margin: '2rem auto' }}>
        <Outlet />
      </Container>
      <AppFooter />
    </Stack>
  </>
);
