import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  width: '9.6875rem',
  aspectRatio: 1.435,
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingX: '.625rem',
  paddingY: '.625rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '.5rem',
  color: '#fff',
  boxSizing: 'border-box',
  cursor: 'pointer',
};

export const titleStyle: SxProps = {
  alignSelf: 'center',
  maxWidth: '98%',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  flexGrow: 1,
};

export const labelsWrapper: SxProps = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: 'auto',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '.125rem',
  boxSizing: 'border-box',
};
