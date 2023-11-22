import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
  width: '9.6875rem',
  aspectRatio: 1.435,
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
  boxSizing: 'border-box',
  cursor: 'pointer',
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

export const likerWrapperStyle: SxProps = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  padding: '.5rem',
};
