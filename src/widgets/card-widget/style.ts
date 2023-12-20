import { SxProps } from '@mui/material';

export const containerStyle: SxProps = {
  paddingX: { xs: '1rem', sm: '1.5rem' },
  paddingBottom: '2rem',
};

export const topButtonsStyle: SxProps = {
  minHeight: '3.56rem',
  paddingTop: 2.5,
  paddingBottom: 1.5,
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

export const wrapperStyle: SxProps = {
  maxWidth: '100%',
  paddingY: 1.25,
  overflow: 'hidden',
};

export const paragraphStyle: SxProps = {
  fontSize: '.875rem',
  fontWeight: 400,
  lineHeight: '1.125rem',
  textAlign: 'left',
  color: 'surface.darker',
};
