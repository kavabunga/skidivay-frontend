import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  height: '100%',
  paddingX: { xs: '1rem', sm: '1.5rem' },
  paddingBottom: { xs: '1.5rem', sm: '2rem' },
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const coverImgStyle: SxProps = {
  display: 'block',
  width: '100%',
  minWidth: '20rem',
  minHeight: '15rem',
  aspectRatio: '1 / 0.75',
  objectFit: 'contain',
  objectPosition: 'center',
  flexShrink: '0',
};

export const paragraphStyle: SxProps = {
  width: '100%',
  fontSize: '1.25rem',
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
  '@media (max-width:600px)': {
    fontSize: '1.125rem',
  },
  '@media (max-width:480px)': {
    fontSize: '1rem',
  },
};
