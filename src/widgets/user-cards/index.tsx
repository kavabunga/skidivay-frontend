import { FC } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { SearchChips } from '~/features';
import { CardsList } from '~/widgets';
import { defaultCards } from '~/shared/mock/default-cards';
import { CardProps } from '~/shared/types';
import { mainContainerStyle, linkStyle } from './styles';

type UserCardsProps = {
  cards: CardProps[];
  tags: {
    label: string;
  }[];
  logOut(): void;
};

export const UserCards: FC<UserCardsProps> = ({
  cards = defaultCards,
  tags,
  logOut,
}) => {
  function handleClick() {
    logOut();
  }

  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="h1"
        variant="h1"
        textAlign="left"
        sx={{
          width: '100%',
        }}
      >
        {`Мои карты`}
      </Typography>
      <SearchChips items={tags} />
      <CardsList items={cards} />
      <Button
        variant="text"
        onClick={handleClick}
        children={'Выйти из аккаунта'}
        sx={{ ...linkStyle }}
      />
    </Container>
  );
};
