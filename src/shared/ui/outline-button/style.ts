import { SxProps } from '@mui/material';

export const buttonStyle: SxProps = {
  width: '100%',
  fontSize: '1.125rem',
  lineHeight: '1.43',
  padding: '1.125rem',
  borderRadius: '.5rem',
  textTransform: 'none',
  boxShadow: 'none',
  '@media (max-width:600px)': {
    fontSize: '1rem',
  },
};
