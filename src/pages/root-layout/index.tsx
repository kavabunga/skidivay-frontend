import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter, Preloader } from '~/shared/ui';
import { InfoBar } from '~/features';
import { useLoading } from '~/shared/store';

export const RootLayout = () => {
  const isLoading = useLoading((state) => state.isLoading);

  return (
    <Stack
      sx={{ minHeight: '100vh', position: 'relative', width: '100%' }}
      direction="column"
    >
      <Header type="standard" />
      <Stack component="main" flexGrow={1}>
        <Outlet />
      </Stack>
      {isLoading && <Preloader />}
      <Stack
        sx={{
          justifyContent: 'flex-end',
        }}
        direction="column"
      >
        <AppFooter />
      </Stack>
      <InfoBar />
    </Stack>
  );
};
