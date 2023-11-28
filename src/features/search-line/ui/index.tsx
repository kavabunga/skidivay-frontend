import { Autocomplete, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { CardsContext, ShopListContext, SortedCardsContext } from '~/app';

export const SearchLine = () => {
  const { shops } = useContext(ShopListContext);
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

  return (
    <Autocomplete
      fullWidth
      onChange={(e) => onChange(e)}
      options={shops ? shops.map((option) => option.name) : ['']}
      renderInput={(params) => <TextField {...params} placeholder="Поиск" />}
    />
  );
};
