import { Paper, Typography, Button } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SaveMoneyBw1 from '~/shared/assets/save-money-bw-1.svg';
export const Home = () => {
  return (
    <>
      {/* TODO: refactor: replace headline compoment  */}
      <Typography
        variant="h2"
        fontSize={'1rem'}
        fontWeight={500}
        lineHeight={'1.5rem'}
      >
        Удобный и быстрый доступ к вашим картам лояльности в любом месте
      </Typography>
      <Box sx={{ display: 'flex', margin: '1rem 0' }}>
        <Box
          component={'img'}
          src={SaveMoneyBw1}
          alt="Изображение сохрани свои деньги"
          sx={{ margin: '0 auto' }}
        />
      </Box>
      <div>
        <Typography
          variant="h3"
          fontSize={'1rem'}
          fontWeight={500}
          lineHeight={'1.5rem'}
        >
          Вам может понравиться
        </Typography>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          margin={'1rem 0'}
        >
          {/* TOOD: refactor replace card component */}
          <Paper elevation={1} sx={{ width: 156, height: 108 }}></Paper>
          <Paper elevation={1} sx={{ width: 156, height: 108 }}></Paper>
        </Stack>
        <Box>
          <Button sx={{ width: '100%' }}>Попробовать</Button>
        </Box>
      </div>
    </>
  );
};
