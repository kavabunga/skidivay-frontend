import { SxProps } from '@mui/material';

export const containerStyle: SxProps = {
  paddingX: '1rem',
  paddingBottom: '2rem',
};

export const buttonStyle: SxProps = {
  borderRadius: '.5rem',
  fontSize: '0.875rem',
  padding: '1.125rem 0',
  textTransform: 'none',
};

export const topButtonsStyle: SxProps = {
  minHeight: '3.56rem',
  paddingTop: 2.5,
  paddingBottom: 1.5,
};

export const likerWrapperStyle: SxProps = {
  '& > .css-prsw32-MuiButtonBase-root-MuiIconButton-root': {
    color: 'surface.dark',
  },
};

export const deleteTitleStyle: SxProps = {
  padding: 0,
  fontSize: '1.5rem',
  fontWeight: 400,
  lineHeight: 1.33,
};

export const deleteItemStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '.5rem',
  padding: 0,
};

export const deleteTextStyle: SxProps = {
  padding: 0,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
};
