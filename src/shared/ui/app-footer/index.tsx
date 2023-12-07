import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Logo } from '..';

export const AppFooter = () => {
  const navigate = useNavigate();

  return (
    <Box component={'footer'} height="7.5rem" bgcolor={'surface.inverse'}>
      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          padding={'1rem 0'}
          spacing={1}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <Logo type="full" color="light" />
        </Stack>
        <Typography variant="body1" color={'#F4EFF4'}>
          {new Date().getUTCFullYear()}
        </Typography>
      </Stack>
    </Box>
  );
};
