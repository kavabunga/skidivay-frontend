import { SxProps } from '@mui/material';

export const iconButtonLightStyle: SxProps = {
  color: '#FFFBFF',
  padding: '0',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    transform: 'scale(1)',
    transition: 'scale 300ms cubic-bezier(.53,.01,1,.54) 0ms',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '@media (max-width:600px)': {
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
    },
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
  '@media(hover: hover) and (pointer: fine)': {
    '& .MuiSvgIcon-root:hover': {
      transform: 'scale(1.1)',
    },
  },
  '@media(any-hover: hover) and (any-pointer: fine)': {
    '& .MuiSvgIcon-root:hover': {
      transform: 'scale(1.1)',
    },
  },
};

export const iconButtonDarkStyle: SxProps = {
  color: 'surface.dark',
  padding: '0',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '@media(hover: hover) and (pointer: fine)': {
    '& .MuiSvgIcon-root:hover': {
      transform: 'scale(1.1)',
    },
  },
  '@media(any-hover: hover) and (any-pointer: fine)': {
    '& .MuiSvgIcon-root:hover': {
      transform: 'scale(1.1)',
    },
  },
};
