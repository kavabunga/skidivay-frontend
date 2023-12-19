import { SxProps } from '@mui/material';

export const mainContainerStyle: SxProps = {
  height: '100%',
  paddingX: { xs: '1rem', sm: '1.5rem' },
  paddingBottom: { xs: '1.5rem', sm: '2rem' },
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexGrow: 1,
};

export const paragraphStyle: SxProps = {
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
};

export const noResultsStackStyle: SxProps = {
  width: '100%',
  height: '100%',
  paddingX: '2.5rem',
  justifyContent: 'center',
  flexGrow: 1,
};
