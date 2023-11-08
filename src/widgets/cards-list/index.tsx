import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '~/entities';
import { AddCardButton } from '~/features';
import { defaultCards } from '~/shared/mock/default-cards';

type CardProps = {
  _id: string;
  name: string;
  number: string;
  url: string;
  category: string;
  isLiked: boolean;
};

type CardsListProps = {
  items: CardProps[];
};

export const CardsList: FC<CardsListProps> = ({ items = defaultCards }) => {
  function handleClickCard(name: string, number: string, url: string): void {
    console.log(`card ${name}, ${number}, ${url}, is clicked`);
  }

  function handleClickLike(card: CardProps): void {
    console.log(`card ${card} is liked`);
  }

  function handleAddCard(): void {
    console.log('card is added');
  }

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12 }}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid
        key={'add-card-button'}
        justifyContent="center"
        alignItems="center"
        xs={6}
        sm={4}
        md={3}
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AddCardButton
          onClick={handleAddCard}
          text="Добавить новую&nbsp;карту"
        />
      </Grid>

      {items.map((item) => {
        return (
          <Grid
            key={item._id}
            justifyContent="center"
            alignItems="center"
            xs={6}
            sm={4}
            md={3}
            sx={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Card
              card={item}
              onClickCard={handleClickCard}
              onClickLike={handleClickLike}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
