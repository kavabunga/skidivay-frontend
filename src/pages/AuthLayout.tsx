import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from '~/widgets';
import { AppFooter } from '~/shared/ui';

export const AuthLayout = () => {
  //NOTE: Temporary values while no API added
  const user: { name: string } = { name: '' };
  const isLoggedIn: boolean = false;

  return (
    <Box component="main">
      <Header user={user} isLoggedIn={isLoggedIn} type="minimal" />
      <Outlet />
      <AppFooter />
    </Box>
  );
};
