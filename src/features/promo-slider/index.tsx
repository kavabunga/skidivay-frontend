import Slider from 'react-slick';
import { FC } from 'react';
import { Box } from '@mui/material';
import { PromoCard } from '~/entities/promo-card';
import { defaultPromoCards } from '~/shared/mock/default-promo-cards';
import { slideStyle, sliderWindowStyle } from './style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

interface PromoSliderProps {
  items: {
    _id: string;
    category: string;
    shopName: string;
    shopLogo: string;
  }[];
  isLoggedIn: boolean;
}

export const PromoSlider: FC<PromoSliderProps> = ({
  items = defaultPromoCards,
  isLoggedIn,
}) => {
  interface SliderSettings {
    dots: boolean;
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
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'ease',
  };

  const children: JSX.Element[] = items.map((item) => {
    return (
      <Box key={item._id} sx={{ ...slideStyle }}>
        <PromoCard
          item={item}
          onCardClick={handleCardClick}
          isLoggedIn={isLoggedIn}
        />
      </Box>
    );
  });

  function handleCardClick(item: {
    _id: string;
    category: string;
    shopName: string | null;
    shopLogo: string | null;
  }) {
    console.log(item);
  }

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};
