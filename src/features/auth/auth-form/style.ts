import { SxProps } from '@mui/material';

export const formStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '.75rem',
  paddingTop: '.75rem',
  paddingBottom: '.5rem',
  '@media (min-width:600px)': {
    paddingBottom: '1rem',
  },
};
