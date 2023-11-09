import { FC } from 'react';
import { Box } from '@mui/material';
import { PromoCard } from '~/shared/ui/promo-card';
import { imgPromoCards } from '~/shared/mock/img-promo-cards';
import { ulStyle, liStyle, wrapCardstyle } from './style';

type CarouselProps = {
  items: string[][];
};

export const Carousel: FC<CarouselProps> = ({ items = imgPromoCards }) => {
  return (
    <Box component="ul" sx={{ ...ulStyle }}>
      {items.map((item, index, arr) => {
        return (
          <Box component="li" sx={{ ...liStyle }}>
            <Box sx={{ ...wrapCardstyle }}>
              <PromoCard cardUrl={arr[index][0]} />
            </Box>
            <Box sx={{ ...wrapCardstyle }}>
              <PromoCard cardUrl={arr[index][1]} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
