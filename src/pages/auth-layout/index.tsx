import { useContext } from 'react';
import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter, Preloader } from '~/shared/ui';
import { InfoBar } from '~/features';
import { LoadingContext } from '~/app';

export const AuthLayout = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <Stack
      sx={{ minHeight: '100vh', position: 'relative', width: '100%' }}
      direction="column"
    >
      <Header type="minimal" />
      <Box component="main">
        <Outlet />
      </Box>
      {isLoading && <Preloader />}
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
