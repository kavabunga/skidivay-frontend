import Slider from 'react-slick';
import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';
import { chipsLabels } from '~/shared/mock/chips-labels';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderWindowStyle } from './style';
import './style.css';

export const SearchChips = ({ items = chipsLabels }) => {
  interface SliderSettings {
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    speed: number;
    cssEase: string;
    className: string;
    variableWidth: boolean;
  }

  const settings: SliderSettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    speed: 1000,
    cssEase: 'ease',
    className: 'slider variable-width',
    variableWidth: true,
  };

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>
        {items.map((item) => {
          return <ChipButton key={item.label} label={item.label} />;
        })}
      </Slider>
    </Box>
  );
};
