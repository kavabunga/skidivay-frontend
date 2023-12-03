import { FC, useContext } from 'react';
import { SortedCardsContext } from '~/app/contexts';
import { Container, Typography, Button } from '@mui/material';
import { SearchChips, SignOut } from '~/features';
import { CardsList } from '~/widgets';
import { mainContainerStyle, linkStyle } from './styles';
import { SearchLine } from '~/features/search-line/ui';
import notFoundImg from '~/shared/assets/not-found.jpg';

export const UserCards: FC = () => {
  const { cards } = useContext(SortedCardsContext);
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
        Мои карты
      </Typography>
      <SearchLine />
      <SearchChips />
      {cards.length ? (
        <CardsList items={cards || []} />
      ) : (
        <>
          <p>Ничего не найдено</p>
          <img src={notFoundImg} alt="Ничего не найдено" />
        </>
      )}
      <SignOut
        element={Button}
        variant="text"
        children={'Выйти из аккаунта'}
        sx={{ ...linkStyle }}
      />
    </Container>
  );
};
