import { FC } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { PromoCard } from '~/entities/promo-card';
import { IShopListContext } from '~/shared';
import { slideStyle, sliderWindowStyle } from './style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

interface PromoSliderProps {
  items: IShopListContext | [];
}

export const PromoSlider: FC<PromoSliderProps> = ({ items = [] }) => {
  interface SliderSettings {
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    speed: number;
    autoplaySpeed: number;
    pauseOnHover: boolean;
    cssEase: string;
  }

  const settings: SliderSettings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: 'ease',
  };

  const children: JSX.Element[] = items.map((item) => {
    return (
      <Box key={item.id} sx={{ ...slideStyle }}>
        <PromoCard item={item} />
      </Box>
    );
  });

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};
