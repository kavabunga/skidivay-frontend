import { Box, CircularProgress } from '@mui/material';
import { wrapperStyle } from './style';

export const Preloader = () => {
  return (
    <Box sx={{ ...wrapperStyle }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  );
};
