import { SxProps } from '@mui/material';

export const listStyle: SxProps = {
  list: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    paddingBottom: '1.25rem',
  },
};

export const linkStyle: SxProps = {
  color: 'secondary.main',
  padding: '0 0 1rem',
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
