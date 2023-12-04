import { useContext } from 'react';
import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter, Preloader } from '~/shared/ui';
import { InfoBar } from '~/features';
import { PreloaderContext } from '~/app';

export const AuthLayout = () => {
  const { preloader } = useContext(PreloaderContext);

  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column">
      <Header type="minimal" />
      <Box component="main">
        <Outlet />
      </Box>
      {preloader.isOpen && <Preloader />}
      <Stack
        sx={{
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
        direction="column"
      >
        <AppFooter />
      </Stack>
      <InfoBar />
    </Stack>
  );
};
