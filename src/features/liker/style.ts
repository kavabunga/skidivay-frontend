import { SxProps } from '@mui/material';

export const iconButtonLightStyle: SxProps = {
  color: '#FFFBFF',
  padding: '0',
  '&:hover': {
    filter: 'invert(100%)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
  '@media (max-width:480px)': {
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
  },
  '@media (max-width:359px)': {
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
    },
  },
};

export const iconButtonDarkStyle: SxProps = {
  color: 'surface.dark',
  padding: '0',
  '&:hover': {
    filter: 'invert(100%)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
};
