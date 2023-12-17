import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter, Preloader } from '~/shared/ui';
import { InfoBar } from '~/features';
import { useLoading } from '~/shared/store';

export const AuthLayout = () => {
  const isLoading = useLoading((state) => state.isLoading);

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
