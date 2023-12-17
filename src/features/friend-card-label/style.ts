import { SxProps } from '@mui/material';

export const labelWrapperStyle: SxProps = {
  display: 'inline-flex',
  width: '6rem',
  minWidth: '4.5rem',
  minHheight: '1.25rem',
  aspectRatio: '3.6',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  boxSizing: 'border-box',
  '@media (max-width:480px)': {
    width: '4.5rem',
  },
  '@media (max-width:359px)': {
    width: '6rem',
  },
};
