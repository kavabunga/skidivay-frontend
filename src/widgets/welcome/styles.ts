import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  display: 'flex',
  height: '100%',
  paddingBottom: '1rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const coverImgStyle: SxProps = {
  display: 'block',
  width: '100%',
  minWidth: '320px',
  minHeight: '240px',
  aspectRatio: '1 / 0.75',
  objectFit: 'contain',
  objectPosition: 'center',
  flexShrink: '0',
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
