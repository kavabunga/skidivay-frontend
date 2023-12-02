import { SxProps } from '@mui/material';

export const wrapperStyle: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  minWidth: '100vw',
  minHeight: '100vh',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  zIndex: 2,
};

export const wrapperInnerStyle: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  minWidth: '100%',
  minHeight: '100%',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  zIndex: 2,
};
