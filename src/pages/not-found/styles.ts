import { SxProps } from '@mui/material';

export const mainImgStyle: SxProps = {
  display: 'block',
  width: '100%',
  minWidth: '20rem',
  minHeight: '15rem',
  aspectRatio: '1 / 0.75',
  objectFit: 'contain',
  objectPosition: 'center',
  flexShrink: '0',
};

export const containerStyle: SxProps = {
  height: '100%',
  paddingX: { xs: '1rem', sm: '1.5rem' },
  paddingTop: '2rem',
  paddingBottom: '4rem',
};
