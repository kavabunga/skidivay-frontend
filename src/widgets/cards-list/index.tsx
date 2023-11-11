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
  // function handleClickCard(name: string, number: string, url: string): void {
  //   console.log(`card ${name}, ${number}, ${url}, is clicked`);
  // }
  // function handleClickLike(card: CardProps): void {
  //   console.log(`card ${card} is liked`);
  // }

  function handleAddCard(): void {
    console.log('card is added');
  }

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
            <CardSmall
              name={item.name}
              isLiked={item.isLiked ? item.isLiked : false}
              shopLogo={item.shopLogo}
              barcodeNumber={item.barcodeNumber}
              cardNumber={item.cardNumber}
            />
          </Box>
        );
      })}
    </Stack>
  );
};
