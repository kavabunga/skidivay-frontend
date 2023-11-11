import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
  position: 'relative',
  marginX: 'auto',
  height: '13.75rem',
  minWidth: '15.375rem',
  maxWidth: '25rem',
  paddingTop: '1.56rem',
  paddingX: '1rem',
  paddingBottom: '1rem',
  color: '#fff',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

export const barcodeStyle: SxProps = {
  height: '7.5rem',
  padding: 2.5,
  borderRadius: '1.25rem',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const titleStyle: SxProps = {
  alignSelf: 'center',
  maxWidth: '98%',
  fontSize: 28,
  fontWeight: 400,
  lineHeight: 1.3,
  flexGrow: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
