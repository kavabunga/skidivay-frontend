import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Logo } from '..';

export const AppFooter = () => {
  return (
    <Stack
      component={'footer'}
      height="7.5rem"
      bgcolor={'surface.inverse'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        useFlexGap
      >
        <Logo type="full" color="light" />
        <Typography variant="body1" color={'#F4EFF4'} textAlign="center">
          {new Date().getUTCFullYear()}
        </Typography>
      </Stack>
    </Stack>
  );
};
