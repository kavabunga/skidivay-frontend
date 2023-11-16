import { SxProps } from '@mui/material';

export const sliderWindowStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  padding: '0 0.5rem',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflow: 'hidden',
  '& > .slick-slider .slick-list .slick-track .slick-slide': {
    margin: '0 0.5rem',
  },
};
