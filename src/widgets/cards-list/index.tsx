import { FC } from 'react';
import { Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { ICardsContext } from '~/shared';
import { AddCardButton } from '~/features';
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
        items.map((item) => {
          return (
            // <Button
            //   key={item.card.id}
            //   sx={cardCellStyle}
            //   onClick={() => navigate('/card/123', { relative: 'path' })}
            // >
            //   <CardSmall {...item} />
            // </Button>
            <CardSmall key={item.card.id} item={item} sx={cardCellStyle} />
          );
        })}
    </Stack>
  );
};
