import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';

export const RootLayout = () => {
  //NOTE: Temporary values while no API added
  const user: { name: string } = { name: '' };
  const isLoggedIn: boolean = false;
  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column">
      <Header user={user} isLoggedIn={isLoggedIn} type="standard" />
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
