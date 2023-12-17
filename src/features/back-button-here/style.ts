import { SxProps } from '@mui/material';

export const backButtonStyle: SxProps = {
  color: '#737981',
  justifyContent: 'flex-start',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: 1.43,
  padding: 0,
  margin: 0,
  border: 'none',
  '&:hover': {
    color: 'surface.dark',
    backgroundColor: 'transparent',
  },
};

export const iconStyle: SxProps = {
  height: '0.75rem',
  width: '0.75rem',
  marginLeft: 0,
  color: 'inherit',
};
