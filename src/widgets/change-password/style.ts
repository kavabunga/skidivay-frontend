import { SxProps } from '@mui/material';

export const containerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  paddingX: { xs: '1rem', sm: '1.5rem' },
  paddingTop: '.5rem',
  paddingBottom: '2rem',
};

export const titleStyle: SxProps = {
  paddingTop: '2.5rem',
  paddingBottom: '1.25rem',
};

export const titlePopupStyle: SxProps = {
  padding: 0,
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: 1.33,
};

export const itemPopupStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '.5rem',
  padding: 0,
};

export const textPopupStyle: SxProps = {
  padding: 0,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
};
