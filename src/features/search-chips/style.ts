import { SxProps } from '@mui/material';

export const sliderWindowStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  padding: '0 1rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflow: 'hidden',
  '& > .slick-slider .slick-list': {
    margin: '0 -1rem',
  },
  '& > .slick-slider .slick-list .slick-track .slick-slide': {
    margin: '0 0.375rem',
  },
  '& > .slick-slider .slick-list .slick-track .slick-slide:nth-of-type(1)': {
    paddingLeft: '1rem',
  },
};
