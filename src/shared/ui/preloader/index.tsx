import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { wrapperStyle, wrapperInnerStyle } from './style';

export const Preloader: FC<{ isInner: boolean }> = ({ isInner }) => {
  return isInner ? (
    <Box sx={{ ...wrapperInnerStyle }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  ) : (
    <Box sx={{ ...wrapperStyle }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  );
};
