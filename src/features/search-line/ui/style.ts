import { SxProps } from '@mui/material';

export const searchLineStyle: SxProps = {
  height: '2.5rem',
  backgroundColor: 'surface.light',
  borderRadius: '.5rem',
  '& .css-raw2ne-MuiInputBase-root-MuiFilledInput-root': {
    backgroundColor: 'transparent',
  },
  '& .css-raw2ne-MuiInputBase-root-MuiFilledInput-root:before': {
    borderBottom: 'none',
  },
  '& Mui-focused': {
    backgroundColor: 'transparent',
  },
  '& .css-raw2ne-MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error)::before':
    {
      borderBottom: 'none',
    },
  '& .MuiFilledInput-root': {
    paddingTop: '0',
    height: '100%',
    borderRadius: '.5rem',
  },
  '& .css-raw2ne-MuiInputBase-root-MuiFilledInput-root:after  ': {
    borderBottom: 'none',
  },
  '&:hover': {
    backgroundColor: '#e7e1eb',
  },
};
