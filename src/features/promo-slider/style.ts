import { SxProps } from '@mui/material';

export const sliderWindowStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  padding: '0',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: 0,
  overflow: 'hidden',
  '& > .slick-slider .slick-list': {
    margin: '0 -0.5rem',
  },
};

export const slideStyle: SxProps = {
  padding: '0 0.5rem',
};
