import { Autocomplete, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CardsContext, SortedCardsContext } from '~/app';

export const SearchLine = () => {
  const [options, setOptions] = useState<string[]>([]);

  const { cards } = useContext(CardsContext);
  const { setSortedCards } = useContext(SortedCardsContext);
  function onChange(e: React.SyntheticEvent) {
    const newCards = cards.filter((card) => {
      return card.card.shop?.name === e.currentTarget.textContent;
    });
    if (newCards.length) {
      return setSortedCards && setSortedCards(newCards);
    } else {
      return setSortedCards && setSortedCards(cards);
    }
  }

  function onInput(e: React.BaseSyntheticEvent) {
    const newCards = cards.filter((card) => {
      return card.card.shop?.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase().trim());
    });

    if (newCards.length) {
      return setSortedCards && setSortedCards(newCards);
    } else {
      return setSortedCards && setSortedCards(cards);
    }
  }

  useEffect(() => {
    const optionsArray: string[] = [];
    cards.forEach((card) => {
      if (card.card.shop) {
        if (!optionsArray.includes(card.card.shop.name)) {
          optionsArray.push(card.card.shop.name);
        }
      }
    });

    setOptions(optionsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      fullWidth
      onChange={(e) => onChange(e)}
      options={options ? options.map((option) => option) : ['']}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Поиск"
          onChange={(e) => onInput(e)}
        />
      )}
    />
  );
};
