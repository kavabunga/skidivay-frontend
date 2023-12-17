import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '1rem',
};

export const linkStyle: SxProps = {
  color: 'secondary.main',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5rem',
  textDecoration: 'underline',
  alignSelf: 'flex-start',
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
};

export const formStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingTop: '12px',
};

export const linkGroupStyle: SxProps = {
  paddingBottom: '1.25rem',
};
