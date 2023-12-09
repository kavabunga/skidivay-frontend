import { SxProps } from '@mui/material';

export const containerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  paddingX: '16px',
  paddingTop: '8px',
  paddingBottom: '30px',
};

export const titleStyle: SxProps = {
  paddingTop: '2.5rem',
  paddingBottom: '1.25rem',
};

export const buttonStyle: SxProps = {
  borderRadius: '.5rem',
  fontSize: '.875rem',
  fontWeight: 500,
  lineHeight: 1.4,
  paddingY: 2.25,
  marginTop: '.5rem',
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
