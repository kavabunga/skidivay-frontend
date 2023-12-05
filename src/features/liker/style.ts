import { SxProps } from '@mui/material';

export const iconButtonStyle: SxProps = {
  padding: '0',
  color: '#FFFBFF',
  // filter: 'invert(0%)',
  zIndex: '2',
  '&:hover': {
    filter: 'invert(100%)',
  },
};
