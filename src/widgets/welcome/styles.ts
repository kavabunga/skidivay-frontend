import { SxProps } from '@mui/material';

export const coverImgStyle: SxProps = {
  display: 'block',
  width: '55.5%',
  minWidth: '200px',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'center',
  flexShrink: '0',
};

export const mainContainerStyle: SxProps = {
  display: 'flex',
  height: 'calc(100vh - 10rem)',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const paragraphStyle: SxProps = {
  width: '100%',
  fontSize: '1.5rem',
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: 0,
  '@media (max-width:600px)': {
    fontSize: '1.125rem',
  },
  '@media (max-width:480px)': {
    fontSize: '1rem',
  },
};
