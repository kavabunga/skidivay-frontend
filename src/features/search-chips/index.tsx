import Slider from 'react-slick';
import { Box } from '@mui/material';
import { ChipButton } from '~/shared/ui';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderWindowStyle } from './style';
import { useContext, useEffect, useState } from 'react';
import { CardsContext, SortedCardsContext } from '~/app';
import { ICardsContext } from '~/shared';

export const SearchChips = () => {
  const [chipsLabels, setChipsLabels] = useState<string[]>(['Избранное']);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

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

  useEffect(() => {
    onSort(selectedLabels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabels]);

  function onSort(labels: string[]) {
    const arr: ICardsContext = [];
    if (labels.length) {
      labels.forEach((label) => {
        const matchedCards = cards.filter((card) => {
          let isReturn = false;
          card.card.shop.group?.forEach((el) => {
            if (el.name === label) {
              isReturn = true;
            }
          });
          if (labels.includes('Избранное')) {
            if (!card.favourite) isReturn = false;
          }
          if (isReturn) return card;
        });
        matchedCards.forEach((card) => {
          arr.push(card);
        });
      });
      if (!arr.length && labels.includes('Избранное') && labels.length === 1) {
        const arr1 = cards.filter((card) => card.favourite);
        return setSortedCards && setSortedCards(arr1);
      }
      return setSortedCards && setSortedCards(arr);
    } else {
      return setSortedCards && setSortedCards(cards);
    }
  }

  return (
    <Box sx={{ ...sliderWindowStyle }}>
      <Slider {...settings}>
        {chipsLabels.map((item) => {
          return (
            <ChipButton
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
