import { SxProps } from '@mui/material';

export const style: SxProps = {
  display: 'block',
  width: '100%',
  aspectRatio: '1 / 0.63',
  backgroundColor: '#f6f6f6',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  filter: 'brightness(100%)',
  transition: 'filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  '&:hover': {
    filter: 'brightness(90%)',
  },
};
