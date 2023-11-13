import { Stack, Typography } from '@mui/material';
import { BackButton } from '~/features';

export const NotFound = () => (
  <Stack direction="column">
    <Typography>Эта страница не найдена</Typography>
    <BackButton />
  </Stack>
);
