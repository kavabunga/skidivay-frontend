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
  '& > .slick-slider .slick-list': {
    overflow: 'visible',
  },
  '@media (min-width:600px)': {
    '& > .slick-slider .slick-list': {
      margin: '0 -0.75rem',
    },
  },
  '@media (max-width:599px)': {
    '& > .slick-slider .slick-list': {
      margin: '0 -0.5rem',
    },
  },
};

export const slideStyle: SxProps = {
  '@media (min-width:600px)': {
    padding: '0 0.75rem',
  },
  '@media (max-width:599px)': {
    padding: '0 0.5rem',
  },
};
