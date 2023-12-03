import Slider from 'react-slick';
import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderWindowStyle } from './style';
import { useContext, useEffect, useState } from 'react';
import { CardsContext, SortedCardsContext } from '~/app';

export const SearchChips = () => {
  const [chipsLabels, setChipsLabels] = useState<string[]>([
    'Все',
    'Избранное',
  ]);
  const [currentLabel, setCurrentLabel] = useState('Все');

  const { cards } = useContext(CardsContext);
  const { setSortedCards } = useContext(SortedCardsContext);

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
    onSort(currentLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

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

  function onSort(item: string) {
    if (item === 'Избранное') {
      setCurrentLabel(item);
      const favouriteCards = cards.filter((card) => card.favourite);
      return setSortedCards && setSortedCards(favouriteCards);
    }

    if (item === 'Все') {
      setCurrentLabel(item);
      return setSortedCards && setSortedCards(cards);
    }

    setCurrentLabel(item);
    const sortedCards = cards.filter((card) => {
      const sort = card.card.shop.group?.filter((group) => {
        return group.name === item;
      });
      if (sort?.length) return card;
    });
    return setSortedCards && setSortedCards(sortedCards);
  }

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>
        {chipsLabels.map((item) => {
          return (
            <ChipButton key={item} label={item} onClick={() => onSort(item)} />
          );
        })}
      </Slider>
    </Box>
  );
};
