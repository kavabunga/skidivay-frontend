import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Logo from '~/shared/assets/logo.svg';
import { style } from './style';

export const AppFooter = () => {
  return (
    <Box
      component={'footer'}
      height="7.5rem"
      bgcolor={'#313033'}
      sx={{ ...style }}
    >
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
        >
          <Box
            component={'img'}
            src={Logo}
            alt="Логотип проекта"
            sx={{ width: 55 }}
          />
          <Typography variant="body1" fontWeight={600} color={'#F4EFF4'}>
            Скидывай
          </Typography>
        </Stack>
        <Typography variant="body1" color={'#F4EFF4'}>
          {new Date().getUTCFullYear()}
        </Typography>
      </Stack>
    </Box>
  );
};
