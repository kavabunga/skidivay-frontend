import { SxProps } from '@mui/material';

export const iconButtonLightStyle: SxProps = {
  color: '#FFFBFF',
  padding: '0',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
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
    '&:hover': {
      color: 'primary.main',
    },
  },
  '@media(any-hover: hover) and (any-pointer: fine)': {
    '&:hover': {
      color: 'primary.main',
    },
  },
  '@media(hover: none) and (any-hover: none)': {
    '&:active': {
      color: '#FFFBFF',
    },
  },
  '@media(pointer: coarse) and (any-pointer: coarse) and (any-pointer: none)': {
    '&:active': {
      color: '#FFFBFF',
    },
  },
};

export const iconButtonDarkStyle: SxProps = {
  color: 'surface.dark',
  padding: '0',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
  '@media(hover: hover) and (pointer: fine)': {
    '&:hover': {
      color: 'primary.main',
    },
  },
  '@media(any-hover: hover) and (any-pointer: fine)': {
    '&:hover': {
      color: 'primary.main',
    },
  },
  '@media(hover: none) and (any-hover: none)': {
    '&:active': {
      color: 'surface.dark',
    },
  },
  '@media(pointer: coarse) and (any-pointer: coarse) and (any-pointer: none)': {
    '&:active': {
      color: 'surface.dark',
    },
  },
};
