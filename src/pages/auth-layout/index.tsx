import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';

export const AuthLayout = () => {
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column">
      <Header type="minimal" />
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
    </Stack>
  );
};
