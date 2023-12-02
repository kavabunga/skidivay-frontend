import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';
import { InfoBar } from '~/features';

export const RootLayout = () => {
  return (
    <Stack sx={{ minHeight: '100vh', position: 'relative' }} direction="column">
      <Header type="standard" />
      <Box component="main">
        <Outlet />
      </Box>
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
