import { SxProps } from '@mui/material';

export const style: SxProps = {
  fontSize: '0.875rem',
  fontWeight: '500',
  lineHeight: '2rem',
  cursor: 'pointer',
  color: 'surface.dark',
  borderRadius: '0.5rem',
  borderColor: 'surface.main',
  '&:hover': {
    borderColor: 'surface.main',
    backgroundColor: '#6750A414',
  },
  '&:active': {
    borderColor: 'surface.main',
    backgroundColor: '#6750A41F',
  },
};
