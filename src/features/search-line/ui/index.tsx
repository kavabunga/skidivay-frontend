import { Autocomplete, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { CardsContext, ShopListContext } from '~/app';
import { api } from '~/shared';

export const SearchLine = () => {
  const { shops } = useContext(ShopListContext);
  const { cards, setCards } = useContext(CardsContext);

  function onChange(e: React.SyntheticEvent) {
    const newCards = cards.filter((card) => {
      return card.card.shop?.name === e.currentTarget.textContent;
    });
    if (newCards.length) {
      return setCards && setCards(newCards);
    } else {
      api
        .getCards()
        .then((res) => {
          return setCards && setCards(res);
        })
        .catch((err) => console.log(err.message));
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
