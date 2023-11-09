import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';

export const CardLayout = () => {
  //NOTE: Temporary values while no API added
  const user: { name: string } = { name: '' };
  const isLoggedIn: boolean = true;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header user={user} isLoggedIn={isLoggedIn} type="standard" />
      <Box component="main">
        <Outlet />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
      >
        <AppFooter />
      </Box>
    </Box>
  );
};
