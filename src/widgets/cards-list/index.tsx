import { FC } from 'react';
import { Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { ICardsContext } from '~/shared';
import { AddCardButton, sortCards } from '~/features';
import { cardCellStyle } from './style';

interface CardsListProps {
  items: ICardsContext | [];
}

export const CardsList: FC<CardsListProps> = ({ items = [] }) => {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Box key={'add-new-card'} sx={cardCellStyle}>
        <AddCardButton text="Добавить новую карту" />
      </Box>
      {items &&
        sortCards(items).map((item) => {
          return <CardSmall key={item.card.id} item={item} />;
        })}
    </Stack>
  );
};
