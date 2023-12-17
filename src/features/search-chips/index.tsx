import Slider from 'react-slick';
import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderWindowStyle } from './style';
import { FC, useEffect, useState } from 'react';
import { useUser } from '~/shared/store/useUser';
import { useShallow } from 'zustand/react/shallow';

interface ISearchChips {
  onFilter: (value: 'search' | 'chips' | 'none') => void;
  filterBy: 'search' | 'chips' | 'none';
}

export const SearchChips: FC<ISearchChips> = ({ onFilter, filterBy }) => {
  const [chipsLabels, setChipsLabels] = useState<string[]>(['Избранное']);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const cards = useUser(useShallow((state) => state.cards));
  const filterCards = useUser((state) => state.filterCards);

  useEffect(() => {
    cards.forEach((card) => {
      card.card.shop.group?.forEach((group) => {
        if (!chipsLabels.includes(group.name)) {
          setChipsLabels([...chipsLabels, group.name]);
        }
      });
    });
  }, [cards, chipsLabels]);

  useEffect(() => {
    filterBy != 'chips' && setSelectedLabels([]);
  }, [filterBy]);

  interface SliderSettings {
    arrows: boolean;
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    speed: number;
    cssEase: string;
    className: string;
    variableWidth: boolean;
  }

  const settings: SliderSettings = {
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    speed: 1000,
    cssEase: 'ease',
    className: 'slider variable-width',
    variableWidth: true,
  };

  useEffect(() => {
    filterCards(selectedLabels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabels, cards]);

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>
        {chipsLabels.map((item) => {
          return (
            <ChipButton
              onFilter={onFilter}
              filterBy={filterBy}
              key={item}
              label={item}
              setSelectedLabels={setSelectedLabels}
              selectedLabels={selectedLabels}
            />
          );
        })}
      </Slider>
    </Box>
  );
};
