import { SxProps } from '@mui/material';

export const buttonStyle: SxProps = {
  display: 'flex',
  width: 'calc((100% - 3rem) / 4)',
  minWidth: '8.5rem',
  minHeight: '5.9rem',
  aspectRatio: '1.44',
  borderRadius: '1rem',
  flexDirection: 'column',
  borderColor: 'surface.main',
  color: 'primary',
  '@media (max-width:760px)': {
    width: 'calc((100% - 2rem) / 3)',
  },
  '@media (max-width:600px)': {
    width: 'calc((100% - 1rem) / 2)',
    borderRadius: '.8rem',
  },
  '@media (max-width:480px)': {
    width: 'calc((100% - 1rem) / 2)',
    borderRadius: '.5rem',
  },
  '@media (max-width:359px)': {
    width: '100%',
    borderRadius: '1.125rem',
  },
};

export const titleStyle: SxProps = {
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.25,
};
