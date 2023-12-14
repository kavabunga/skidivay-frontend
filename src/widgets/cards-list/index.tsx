import { FC } from 'react';
import { Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { ICardsContext } from '~/shared';
import { AddCardButton, sortCards } from '~/features';

interface CardsListProps {
  items: ICardsContext | [];
}

export const CardsList: FC<CardsListProps> = ({ items = [] }) => {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <AddCardButton text="Добавить новую карту" />
      {items &&
        sortCards(items).map((item) => {
          return <CardSmall key={item.card.id} item={item} />;
        })}
    </Stack>
  );
};
