import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { CardsContext } from '~/app';
import { AddCardButton } from '~/features';
import { cardCellStyle } from './style';

export const CardsList = () => {
  const navigate = useNavigate();
  const items = useContext(CardsContext);

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Box key={'add-new-card'} sx={cardCellStyle}>
        <AddCardButton text="Добавить новую карту" />
      </Box>
      {items.map((item) => {
        return (
          <Button
            key={item.id}
            sx={cardCellStyle}
            onClick={() => navigate('/card/123', { relative: 'path' })}
          >
            <CardSmall {...item} />
          </Button>
        );
      })}
    </Stack>
  );
};
