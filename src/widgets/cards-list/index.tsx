import { useContext } from 'react';
import { Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { CardsContext } from '~/app';
import { AddCardButton } from '~/features';
import { cardCellStyle } from './style';

export const CardsList = () => {
  const { cards } = useContext(CardsContext);

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Box key={'add-new-card'} sx={cardCellStyle}>
        <AddCardButton text="Добавить новую карту" />
      </Box>
      {cards &&
        cards.map((item) => (
          // <Button
          //   key={item.card.id}
          //   sx={cardCellStyle}
          //   onClick={() => navigate('/card/123', { relative: 'path' })}
          // >
          //   <CardSmall {...item} />
          // </Button>
          <CardSmall item={item} key={item.card.id} />
        ))}
    </Stack>
  );
};
