import { FC } from 'react';
import { Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { AddCardButton } from '~/features';
import { defaultCards } from '~/shared/mock/default-cards';
import { CardProps } from '~/shared/types';
import { cardCellStyle } from './style';

type CardsListProps = {
  items: CardProps[];
};

export const CardsList: FC<CardsListProps> = ({ items = defaultCards }) => {
  const handleAddCard = () => {};

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Box key={'add-new-card'} sx={cardCellStyle}>
        <AddCardButton
          onClick={handleAddCard}
          text="Добавить новую&nbsp;карту"
        />
      </Box>
      {items.map((item) => {
        return (
          <Box key={item._id} sx={cardCellStyle}>
            <CardSmall {...item} />
          </Box>
        );
      })}
    </Stack>
  );
};
