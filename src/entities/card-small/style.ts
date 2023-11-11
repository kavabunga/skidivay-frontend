import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
  width: '9.875rem',
  height: '6.75rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '.5rem',
  color: '#fff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingTop: '3.25rem',
  paddingX: '.5rem',
  paddingBottom: '.5rem',
};

export const iconButtonStyle: SxProps = {
  position: 'absolute',
  right: '.5rem',
  bottom: '.5rem',
  padding: '.125rem',
  color: 'primary.light',
  filter: 'invert(0%)',
  zIndex: '2',
  '&:hover': {
    filter: 'invert(100%)',
  },
};

export const titleStyle: SxProps = {
  alignSelf: 'center',
  maxWidth: '98%',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  flexGrow: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
