import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material/';
import { CardSmall } from '~/entities';
import { AddCardButton } from '~/features';
import { defaultCards } from '~/shared/mock/default-cards';
import { CardProps } from '~/shared/types';
import { cardCellStyle } from './style';

type CardsListProps = {
  items: CardProps[];
};

export const CardsList: FC<CardsListProps> = ({ items = defaultCards }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Box key={'add-new-card'} sx={cardCellStyle}>
        <AddCardButton text="Добавить новую&nbsp;карту" />
      </Box>
      {items.map((item) => {
        return (
          <Button
            key={item._id}
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
