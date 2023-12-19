import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  height: '100%',
  paddingTop: '3.5rem',
  paddingBottom: '5rem',
  paddingX: '1rem',
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
  width: '90%',
  margin: '0 auto',
  color: 'surface.dark',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
};

export const linkStyle: SxProps = {
  color: 'surface.dark',
  padding: '0 0 0.25rem',
  fontSize: '.75rem',
  fontWeight: 400,
  lineHeight: 1.33,
  textDecoration: 'underline',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
};
