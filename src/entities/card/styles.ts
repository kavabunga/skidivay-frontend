import { SxProps } from '@mui/material';

export const boxStyle: SxProps = {
  width: '20.5rem',
  minHeight: '13.75rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '.5rem',
  color: '#fff',
  position: 'relative',
  boxSizing: 'border-box',
  paddingTop: '1rem',
};

export const iconButtonStyle: SxProps = {
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  color: 'primary.light',
  filter: 'invert(0%)',
  zIndex: '2',
  transition: 'filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  '&:hover': {
    filter: 'invert(100%)',
  },
};

export const barcodeStyle: SxProps = {
  position: 'absolute',
  bottom: '1rem',
  left: '1.3rem',
  width: '18rem',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
};

export const titleStyle: SxProps = {
  left: '50%',
  marginX: 'auto',
  maxWidth: '12.5rem',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
