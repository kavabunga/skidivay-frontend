import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  display: 'flex',
  height: '100%',
  paddingBottom: '1rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const paragraphStyle: SxProps = {
  width: '100%',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.375,
  letterSpacing: 0,
  '@media (max-width:600px)': {
    fontSize: '1.125rem',
  },
};

export const coverImgStyle: SxProps = {
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  objectPosition: 'center',
  flexShrink: '0',
};
