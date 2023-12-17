import { SxProps } from '@mui/material';

export const cardStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  width: 'calc((100% - 3rem) / 4)',
  minWidth: '8.5rem',
  minHeight: '5.9rem',
  aspectRatio: '1.44',
  borderRadius: '1rem',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingX: '1rem',
  paddingY: '1rem',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  color: '#fff',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '@media (max-width:760px)': {
    width: 'calc((100% - 2rem) / 3)',
    paddingX: '1.125rem',
    paddingY: '1.125rem',
  },
  '@media (max-width:600px)': {
    width: 'calc((100% - 1rem) / 2)',
    borderRadius: '.8rem',
    paddingX: '1rem',
    paddingY: '1rem',
  },
  '@media (max-width:480px)': {
    borderRadius: '.5rem',
    paddingX: '.625rem',
    paddingY: '.625rem',
  },
  '@media (max-width:359px)': {
    width: '100%',
    borderRadius: '1.125rem',
    paddingX: '1.5rem',
    paddingY: '1.5rem',
  },
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
  flexDirection: 'row-reverse',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '.125rem',
  boxSizing: 'border-box',
  fontSize: '3rem',
};
